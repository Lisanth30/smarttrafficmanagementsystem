package com.tnpolice.traffic.model;

/**
 * User class representing a Tamil Nadu Traffic Police officer
 */
public class User {
    private String userId;
    private String username;
    private String password;
    private String fullName;
    private String officerId;
    private String email;
    private String mobile;
    private String rank;
    private String station;
    private String userType; // "master" or "normal"
    private boolean isActive;
    
    // Constructors
    public User() {
        this.isActive = true;
    }
    
    public User(String username, String password, String userType) {
        this.username = username;
        this.password = password;
        this.userType = userType;
        this.isActive = true;
    }
    
    public User(String userId, String username, String password, String fullName, 
                String officerId, String email, String mobile, String rank, 
                String station, String userType) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.officerId = officerId;
        this.email = email;
        this.mobile = mobile;
        this.rank = rank;
        this.station = station;
        this.userType = userType;
        this.isActive = true;
    }
    
    // Getters and Setters
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getOfficerId() {
        return officerId;
    }
    
    public void setOfficerId(String officerId) {
        this.officerId = officerId;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getMobile() {
        return mobile;
    }
    
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    
    public String getRank() {
        return rank;
    }
    
    public void setRank(String rank) {
        this.rank = rank;
    }
    
    public String getStation() {
        return station;
    }
    
    public void setStation(String station) {
        this.station = station;
    }
    
    public String getUserType() {
        return userType;
    }
    
    public void setUserType(String userType) {
        this.userType = userType;
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void setActive(boolean active) {
        isActive = active;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", username='" + username + '\'' +
                ", fullName='" + fullName + '\'' +
                ", officerId='" + officerId + '\'' +
                ", email='" + email + '\'' +
                ", rank='" + rank + '\'' +
                ", station='" + station + '\'' +
                ", userType='" + userType + '\'' +
                ", isActive=" + isActive +
                '}';
    }
}
