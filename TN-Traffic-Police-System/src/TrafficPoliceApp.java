package com.tnpolice.traffic;

import com.tnpolice.traffic.model.User;
import com.tnpolice.traffic.model.TrafficSignal;
import com.tnpolice.traffic.service.LoginService;
import com.tnpolice.traffic.service.TrafficManagementService;
import java.util.Scanner;

/**
 * Main application class for Tamil Nadu Traffic Police Management System
 */
public class TrafficPoliceApp {
    private static LoginService loginService;
    private static TrafficManagementService trafficService;
    private static Scanner scanner;
    private static User currentUser;
    
    public static void main(String[] args) {
        System.out.println("==============================================");
        System.out.println("  Tamil Nadu Traffic Police Management System");
        System.out.println("  Truth Alone Triumphs - சத்யமேவ ஜெயதே");
        System.out.println("==============================================\n");
        
        // Initialize services
        loginService = new LoginService();
        trafficService = new TrafficManagementService();
        scanner = new Scanner(System.in);
        
        // Start application
        showLoginMenu();
    }
    
    /**
     * Display login menu
     */
    private static void showLoginMenu() {
        while (true) {
            System.out.println("\n=== LOGIN MENU ===");
            System.out.println("1. Master Login");
            System.out.println("2. Normal Login");
            System.out.println("3. Register New Officer");
            System.out.println("4. Exit");
            System.out.print("Choose an option: ");
            
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline
            
            switch (choice) {
                case 1:
                    masterLogin();
                    break;
                case 2:
                    normalLogin();
                    break;
                case 3:
                    registerUser();
                    break;
                case 4:
                    System.out.println("Thank you for using TN Traffic Police System!");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalid option! Please try again.");
            }
        }
    }
    
    /**
     * Handle master login
     */
    private static void masterLogin() {
        System.out.println("\n=== MASTER LOGIN ===");
        System.out.print("Username: ");
        String username = scanner.nextLine();
        System.out.print("Password: ");
        String password = scanner.nextLine();
        System.out.print("Master Key: ");
        String masterKey = scanner.nextLine();
        
        currentUser = loginService.authenticateMaster(username, password, masterKey);
        
        if (currentUser != null) {
            System.out.println("\n✓ Master Login Successful!");
            System.out.println("Welcome, " + currentUser.getFullName());
            showDashboard();
        } else {
            System.out.println("\n✗ Login Failed! Invalid credentials.");
        }
    }
    
    /**
     * Handle normal login
     */
    private static void normalLogin() {
        System.out.println("\n=== NORMAL LOGIN ===");
        System.out.print("Username: ");
        String username = scanner.nextLine();
        System.out.print("Password: ");
        String password = scanner.nextLine();
        
        currentUser = loginService.authenticateNormal(username, password);
        
        if (currentUser != null) {
            System.out.println("\n✓ Login Successful!");
            System.out.println("Welcome, " + currentUser.getFullName());
            showDashboard();
        } else {
            System.out.println("\n✗ Login Failed! Invalid credentials.");
        }
    }
    
    /**
     * Handle user registration
     */
    private static void registerUser() {
        System.out.println("\n=== OFFICER REGISTRATION ===");
        
        User newUser = new User();
        
        System.out.print("Full Name: ");
        newUser.setFullName(scanner.nextLine());
        
        System.out.print("Officer ID: ");
        newUser.setOfficerId(scanner.nextLine());
        
        System.out.print("Email: ");
        newUser.setEmail(scanner.nextLine());
        
        System.out.print("Mobile: ");
        newUser.setMobile(scanner.nextLine());
        
        System.out.print("Rank: ");
        newUser.setRank(scanner.nextLine());
        
        System.out.print("Station: ");
        newUser.setStation(scanner.nextLine());
        
        System.out.print("Username: ");
        newUser.setUsername(scanner.nextLine());
        
        System.out.print("Password: ");
        newUser.setPassword(scanner.nextLine());
        
        newUser.setUserType("normal");
        
        if (loginService.registerUser(newUser)) {
            System.out.println("\n✓ Registration Successful! You can now login.");
        } else {
            System.out.println("\n✗ Registration Failed! Username already exists.");
        }
    }
    
    /**
     * Show main dashboard
     */
    private static void showDashboard() {
        while (true) {
            System.out.println("\n=== DASHBOARD ===");
            System.out.println("User: " + currentUser.getFullName() + 
                             " (" + currentUser.getUserType().toUpperCase() + ")");
            System.out.println("\n1. View Traffic Signals");
            System.out.println("2. View Signal by City");
            System.out.println("3. Traffic Statistics");
            System.out.println("4. Start Auto Signal Control");
            System.out.println("5. Stop Auto Signal Control");
            if ("master".equals(currentUser.getUserType())) {
                System.out.println("6. Update Signal Timing");
                System.out.println("7. User Management");
            }
            System.out.println("0. Logout");
            System.out.print("Choose an option: ");
            
            int choice = scanner.nextInt();
            scanner.nextLine();
            
            switch (choice) {
                case 1:
                    viewAllSignals();
                    break;
                case 2:
                    viewSignalsByCity();
                    break;
                case 3:
                    showStatistics();
                    break;
                case 4:
                    trafficService.startAutomaticSignalControl();
                    break;
                case 5:
                    trafficService.stopAutomaticSignalControl();
                    break;
                case 6:
                    if ("master".equals(currentUser.getUserType())) {
                        updateSignalTiming();
                    }
                    break;
                case 7:
                    if ("master".equals(currentUser.getUserType())) {
                        userManagement();
                    }
                    break;
                case 0:
                    currentUser = null;
                    System.out.println("Logged out successfully!");
                    return;
                default:
                    System.out.println("Invalid option!");
            }
        }
    }
    
    /**
     * View all traffic signals
     */
    private static void viewAllSignals() {
        System.out.println("\n=== ALL TRAFFIC SIGNALS ===");
        trafficService.getAllSignals().forEach((id, signal) -> {
            System.out.println("\n" + signal);
        });
    }
    
    /**
     * View signals by city
     */
    private static void viewSignalsByCity() {
        System.out.print("Enter city name: ");
        String city = scanner.nextLine();
        
        System.out.println("\n=== SIGNALS IN " + city.toUpperCase() + " ===");
        trafficService.getSignalsByCity(city).forEach((id, signal) -> {
            System.out.println("\n" + signal);
        });
    }
    
    /**
     * Show traffic statistics
     */
    private static void showStatistics() {
        System.out.println("\n=== TRAFFIC STATISTICS ===");
        System.out.println("Total Signals: " + trafficService.getAllSignals().size());
        System.out.println("Operational Signals: " + trafficService.getOperationalSignalsCount());
        System.out.println("Total Vehicle Count: " + trafficService.getTotalVehicleCount());
        System.out.println("Registered Users: " + loginService.getTotalUsers());
        System.out.println("Active Users: " + loginService.getActiveUsers());
    }
    
    /**
     * Update signal timing (Master only)
     */
    private static void updateSignalTiming() {
        System.out.print("Enter Signal ID: ");
        String signalId = scanner.nextLine();
        System.out.print("Green Duration (seconds): ");
        int green = scanner.nextInt();
        System.out.print("Yellow Duration (seconds): ");
        int yellow = scanner.nextInt();
        scanner.nextLine();
        
        if (trafficService.updateSignalTiming(signalId, green, yellow)) {
            System.out.println("✓ Signal timing updated successfully!");
        } else {
            System.out.println("✗ Signal not found!");
        }
    }
    
    /**
     * User management (Master only)
     */
    private static void userManagement() {
        System.out.println("\n=== USER MANAGEMENT ===");
        System.out.println("Total Users: " + loginService.getTotalUsers());
        System.out.println("Active Users: " + loginService.getActiveUsers());
    }
}
