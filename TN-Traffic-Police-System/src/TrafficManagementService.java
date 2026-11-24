package com.tnpolice.traffic.service;

import com.tnpolice.traffic.model.TrafficSignal;
import com.tnpolice.traffic.model.TrafficSignal.SignalState;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

/**
 * TrafficManagementService class to manage traffic signals
 */
public class TrafficManagementService {
    private Map<String, TrafficSignal> signals;
    private Timer signalTimer;
    
    public TrafficManagementService() {
        this.signals = new HashMap<>();
        initializeDefaultSignals();
    }
    
    /**
     * Initialize default traffic signals for major Tamil Nadu cities
     */
    private void initializeDefaultSignals() {
        // Chennai signals
        signals.put("CHN001", new TrafficSignal("CHN001", "Anna Salai Junction", "Chennai"));
        signals.put("CHN002", new TrafficSignal("CHN002", "T Nagar Junction", "Chennai"));
        signals.put("CHN003", new TrafficSignal("CHN003", "Mount Road Junction", "Chennai"));
        
        // Coimbatore signals
        signals.put("CBE001", new TrafficSignal("CBE001", "Gandhipuram Junction", "Coimbatore"));
        signals.put("CBE002", new TrafficSignal("CBE002", "RS Puram Junction", "Coimbatore"));
        
        // Madurai signals
        signals.put("MDU001", new TrafficSignal("MDU001", "Tallakulam Junction", "Madurai"));
        signals.put("MDU002", new TrafficSignal("MDU002", "Goripalayam Junction", "Madurai"));
        
        System.out.println("Initialized " + signals.size() + " traffic signals");
    }
    
    /**
     * Start automatic signal cycling for all signals
     */
    public void startAutomaticSignalControl() {
        if (signalTimer != null) {
            signalTimer.cancel();
        }
        
        signalTimer = new Timer();
        signalTimer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                for (TrafficSignal signal : signals.values()) {
                    if (signal.isOperational()) {
                        signal.cycleSignals();
                    }
                }
                System.out.println("Signals cycled automatically");
            }
        }, 0, 10000); // Cycle every 10 seconds
        
        System.out.println("Automatic signal control started");
    }
    
    /**
     * Stop automatic signal cycling
     */
    public void stopAutomaticSignalControl() {
        if (signalTimer != null) {
            signalTimer.cancel();
            signalTimer = null;
            System.out.println("Automatic signal control stopped");
        }
    }
    
    /**
     * Add a new traffic signal
     */
    public boolean addSignal(TrafficSignal signal) {
        if (signals.containsKey(signal.getSignalId())) {
            System.out.println("Signal already exists: " + signal.getSignalId());
            return false;
        }
        
        signals.put(signal.getSignalId(), signal);
        System.out.println("Signal added: " + signal.getSignalId());
        return true;
    }
    
    /**
     * Get a traffic signal by ID
     */
    public TrafficSignal getSignal(String signalId) {
        return signals.get(signalId);
    }
    
    /**
     * Get all signals in a city
     */
    public Map<String, TrafficSignal> getSignalsByCity(String city) {
        Map<String, TrafficSignal> citySignals = new HashMap<>();
        for (Map.Entry<String, TrafficSignal> entry : signals.entrySet()) {
            if (entry.getValue().getCity().equalsIgnoreCase(city)) {
                citySignals.put(entry.getKey(), entry.getValue());
            }
        }
        return citySignals;
    }
    
    /**
     * Update signal timing
     */
    public boolean updateSignalTiming(String signalId, int greenDuration, int yellowDuration) {
        TrafficSignal signal = signals.get(signalId);
        if (signal != null) {
            signal.setGreenDuration(greenDuration);
            signal.setYellowDuration(yellowDuration);
            signal.setRedDuration(greenDuration + yellowDuration);
            System.out.println("Signal timing updated for: " + signalId);
            return true;
        }
        return false;
    }
    
    /**
     * Set signal operational status
     */
    public boolean setSignalStatus(String signalId, boolean operational) {
        TrafficSignal signal = signals.get(signalId);
        if (signal != null) {
            signal.setOperational(operational);
            System.out.println("Signal " + signalId + " set to " + 
                             (operational ? "operational" : "non-operational"));
            return true;
        }
        return false;
    }
    
    /**
     * Get total vehicle count across all signals
     */
    public int getTotalVehicleCount() {
        return signals.values().stream()
                     .mapToInt(TrafficSignal::getVehicleCount)
                     .sum();
    }
    
    /**
     * Get number of operational signals
     */
    public int getOperationalSignalsCount() {
        return (int) signals.values().stream()
                           .filter(TrafficSignal::isOperational)
                           .count();
    }
    
    /**
     * Get all signals
     */
    public Map<String, TrafficSignal> getAllSignals() {
        return new HashMap<>(signals);
    }
    
    /**
     * Print signal status
     */
    public void printSignalStatus(String signalId) {
        TrafficSignal signal = signals.get(signalId);
        if (signal != null) {
            System.out.println(signal);
        } else {
            System.out.println("Signal not found: " + signalId);
        }
    }
}
