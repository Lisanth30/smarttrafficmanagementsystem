package com.tnpolice.traffic.service;

import com.tnpolice.traffic.model.User;
import java.util.HashMap;
import java.util.Map;

/**
 * LoginService class to handle user authentication
 */
public class LoginService {
    private Map<String, User> users;
    private static final String MASTER_KEY = "master2025";
    
    public LoginService() {
        this.users = new HashMap<>();
        initializeDefaultUsers();
    }
    
    /**
     * Initialize default users for testing
     */
    private void initializeDefaultUsers() {
        // Master admin user
        User admin = new User("admin", "admin123", "master");
        admin.setFullName("System Administrator");
        admin.setOfficerId("ADMIN001");
        admin.setEmail("admin@tnpolice.gov.in");
        admin.setRank("Administrator");
        admin.setStation("Headquarters");
        users.put("admin", admin);
        
        // Normal officer user
        User officer = new User("officer", "officer123", "normal");
        officer.setFullName("Officer Demo");
        officer.setOfficerId("OFF12345");
        officer.setEmail("officer@tnpolice.gov.in");
        officer.setRank("Inspector");
        officer.setStation("Chennai Traffic Police");
        users.put("officer", officer);
    }
    
    /**
     * Authenticate master login
     */
    public User authenticateMaster(String username, String password, String masterKey) {
        if (!MASTER_KEY.equals(masterKey)) {
            System.out.println("Invalid master key");
            return null;
        }
        
        User user = users.get(username);
        if (user != null && user.getPassword().equals(password) && 
            "master".equals(user.getUserType()) && user.isActive()) {
            System.out.println("Master login successful for: " + username);
            return user;
        }
        
        System.out.println("Master login failed for: " + username);
        return null;
    }
    
    /**
     * Authenticate normal login
     */
    public User authenticateNormal(String username, String password) {
        User user = users.get(username);
        if (user != null && user.getPassword().equals(password) && user.isActive()) {
            System.out.println("Normal login successful for: " + username);
            return user;
        }
        
        System.out.println("Normal login failed for: " + username);
        return null;
    }
    
    /**
     * Register a new user
     */
    public boolean registerUser(User user) {
        if (users.containsKey(user.getUsername())) {
            System.out.println("Username already exists: " + user.getUsername());
            return false;
        }
        
        users.put(user.getUsername(), user);
        System.out.println("User registered successfully: " + user.getUsername());
        return true;
    }
    
    /**
     * Check if username is available
     */
    public boolean isUsernameAvailable(String username) {
        return !users.containsKey(username);
    }
    
    /**
     * Get user by username
     */
    public User getUser(String username) {
        return users.get(username);
    }
    
    /**
     * Update user information
     */
    public boolean updateUser(User user) {
        if (!users.containsKey(user.getUsername())) {
            System.out.println("User not found: " + user.getUsername());
            return false;
        }
        
        users.put(user.getUsername(), user);
        System.out.println("User updated successfully: " + user.getUsername());
        return true;
    }
    
    /**
     * Deactivate user
     */
    public boolean deactivateUser(String username) {
        User user = users.get(username);
        if (user != null) {
            user.setActive(false);
            System.out.println("User deactivated: " + username);
            return true;
        }
        return false;
    }
    
    /**
     * Get total number of registered users
     */
    public int getTotalUsers() {
        return users.size();
    }
    
    /**
     * Get number of active users
     */
    public int getActiveUsers() {
        return (int) users.values().stream().filter(User::isActive).count();
    }
}
