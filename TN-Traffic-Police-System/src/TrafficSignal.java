package com.tnpolice.traffic.model;

/**
 * TrafficSignal class representing a 4-way traffic intersection
 */
public class TrafficSignal {
    private String signalId;
    private String location;
    private String city;
    private SignalState northSignal;
    private SignalState southSignal;
    private SignalState eastSignal;
    private SignalState westSignal;
    private int greenDuration; // in seconds
    private int yellowDuration; // in seconds
    private int redDuration; // in seconds
    private boolean isOperational;
    private int vehicleCount;
    
    // Signal states enum
    public enum SignalState {
        RED, YELLOW, GREEN
    }
    
    // Constructors
    public TrafficSignal() {
        this.greenDuration = 30;
        this.yellowDuration = 5;
        this.redDuration = 35;
        this.isOperational = true;
        this.vehicleCount = 0;
        this.northSignal = SignalState.RED;
        this.southSignal = SignalState.RED;
        this.eastSignal = SignalState.GREEN;
        this.westSignal = SignalState.GREEN;
    }
    
    public TrafficSignal(String signalId, String location, String city) {
        this();
        this.signalId = signalId;
        this.location = location;
        this.city = city;
    }
    
    // Methods
    
    /**
     * Cycle the traffic signals through their phases
     */
    public void cycleSignals() {
        // Switch between East-West green and North-South green
        if (eastSignal == SignalState.GREEN && westSignal == SignalState.GREEN) {
            // Change to yellow
            eastSignal = SignalState.YELLOW;
            westSignal = SignalState.YELLOW;
        } else if (eastSignal == SignalState.YELLOW && westSignal == SignalState.YELLOW) {
            // Change to red, and make North-South green
            eastSignal = SignalState.RED;
            westSignal = SignalState.RED;
            northSignal = SignalState.GREEN;
            southSignal = SignalState.GREEN;
        } else if (northSignal == SignalState.GREEN && southSignal == SignalState.GREEN) {
            // Change to yellow
            northSignal = SignalState.YELLOW;
            southSignal = SignalState.YELLOW;
        } else {
            // Change to red, and make East-West green
            northSignal = SignalState.RED;
            southSignal = SignalState.RED;
            eastSignal = SignalState.GREEN;
            westSignal = SignalState.GREEN;
        }
    }
    
    /**
     * Check if a vehicle can pass from a specific direction
     */
    public boolean canVehiclePass(String direction) {
        if (!isOperational) {
            return false;
        }
        
        switch (direction.toLowerCase()) {
            case "north":
                return northSignal == SignalState.GREEN;
            case "south":
                return southSignal == SignalState.GREEN;
            case "east":
                return eastSignal == SignalState.GREEN;
            case "west":
                return westSignal == SignalState.GREEN;
            default:
                return false;
        }
    }
    
    /**
     * Record a vehicle passing through the intersection
     */
    public void recordVehicle() {
        this.vehicleCount++;
    }
    
    /**
     * Get current signal state for a direction
     */
    public SignalState getSignalState(String direction) {
        switch (direction.toLowerCase()) {
            case "north":
                return northSignal;
            case "south":
                return southSignal;
            case "east":
                return eastSignal;
            case "west":
                return westSignal;
            default:
                return SignalState.RED;
        }
    }
    
    // Getters and Setters
    public String getSignalId() {
        return signalId;
    }
    
    public void setSignalId(String signalId) {
        this.signalId = signalId;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public String getCity() {
        return city;
    }
    
    public void setCity(String city) {
        this.city = city;
    }
    
    public SignalState getNorthSignal() {
        return northSignal;
    }
    
    public void setNorthSignal(SignalState northSignal) {
        this.northSignal = northSignal;
    }
    
    public SignalState getSouthSignal() {
        return southSignal;
    }
    
    public void setSouthSignal(SignalState southSignal) {
        this.southSignal = southSignal;
    }
    
    public SignalState getEastSignal() {
        return eastSignal;
    }
    
    public void setEastSignal(SignalState eastSignal) {
        this.eastSignal = eastSignal;
    }
    
    public SignalState getWestSignal() {
        return westSignal;
    }
    
    public void setWestSignal(SignalState westSignal) {
        this.westSignal = westSignal;
    }
    
    public int getGreenDuration() {
        return greenDuration;
    }
    
    public void setGreenDuration(int greenDuration) {
        this.greenDuration = greenDuration;
    }
    
    public int getYellowDuration() {
        return yellowDuration;
    }
    
    public void setYellowDuration(int yellowDuration) {
        this.yellowDuration = yellowDuration;
    }
    
    public int getRedDuration() {
        return redDuration;
    }
    
    public void setRedDuration(int redDuration) {
        this.redDuration = redDuration;
    }
    
    public boolean isOperational() {
        return isOperational;
    }
    
    public void setOperational(boolean operational) {
        isOperational = operational;
    }
    
    public int getVehicleCount() {
        return vehicleCount;
    }
    
    public void setVehicleCount(int vehicleCount) {
        this.vehicleCount = vehicleCount;
    }
    
    @Override
    public String toString() {
        return "TrafficSignal{" +
                "signalId='" + signalId + '\'' +
                ", location='" + location + '\'' +
                ", city='" + city + '\'' +
                ", North=" + northSignal +
                ", South=" + southSignal +
                ", East=" + eastSignal +
                ", West=" + westSignal +
                ", greenDuration=" + greenDuration +
                ", yellowDuration=" + yellowDuration +
                ", isOperational=" + isOperational +
                ", vehicleCount=" + vehicleCount +
                '}';
    }
}
