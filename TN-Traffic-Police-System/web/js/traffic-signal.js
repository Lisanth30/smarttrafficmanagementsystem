// Canvas setup
const canvas = document.getElementById('trafficCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 800;

// Simulation state
let isRunning = false;
let animationId = null;

// Settings
let greenDuration = 8000; // milliseconds
let yellowDuration = 2000;
let redDuration = 10000; // Red light duration
let spawnRate = 5;

// Statistics
let vehiclesPassed = 0;
let currentVehiclesCount = 0;
let waitingVehiclesCount = 0;

// Traffic signal states: 'red', 'yellow', 'green'
const signals = {
    north: 'red',
    south: 'red',
    east: 'green',
    west: 'green'
};

let signalTimer = 0;
let currentPhase = 0; // 0: East-West green, 1: North-South green
let phaseStartTime = 0;

// Vehicle arrays for each direction
const vehicles = {
    north: [],
    south: [],
    east: [],
    west: []
};

// Vehicle class
class Vehicle {
    constructor(type, direction, lane) {
        this.type = type; // 'car' or 'bike'
        this.direction = direction;
        this.lane = lane; // 0 for incoming, 1 for outgoing
        this.speed = type === 'car' ? 2 : 3;
        this.stopped = false;
        
        // Set initial position based on direction and lane
        this.setInitialPosition();
        
        // Colors
        this.color = type === 'car' ? this.getRandomCarColor() : '#f59e0b';
    }
    
    getRandomCarColor() {
        const colors = ['#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#ec4899'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    setInitialPosition() {
        const laneWidth = 40;
        const roadWidth = 120;
        const center = 400;
        
        switch(this.direction) {
            case 'north':
                this.x = this.lane === 0 ? center - roadWidth/2 + 20 : center + roadWidth/2 - 20;
                this.y = this.lane === 0 ? canvas.height : 0;
                this.width = 20;
                this.height = this.type === 'car' ? 35 : 25;
                break;
            case 'south':
                this.x = this.lane === 0 ? center + roadWidth/2 - 20 : center - roadWidth/2 + 20;
                this.y = this.lane === 0 ? 0 : canvas.height;
                this.width = 20;
                this.height = this.type === 'car' ? 35 : 25;
                break;
            case 'east':
                this.x = this.lane === 0 ? 0 : canvas.width;
                this.y = this.lane === 0 ? center - roadWidth/2 + 20 : center + roadWidth/2 - 20;
                this.width = this.type === 'car' ? 35 : 25;
                this.height = 20;
                break;
            case 'west':
                this.x = this.lane === 0 ? canvas.width : 0;
                this.y = this.lane === 0 ? center + roadWidth/2 - 20 : center - roadWidth/2 + 20;
                this.width = this.type === 'car' ? 35 : 25;
                this.height = 20;
                break;
        }
    }
    
    update() {
        const stopLine = 280; // Distance from center where vehicles stop
        const center = 400;
        const safeDistance = 50; // Minimum distance between vehicles
        
        // Check if should stop at signal
        let shouldStop = false;
        const signal = signals[this.direction];
        
        if (this.lane === 0) { // Only incoming vehicles check signals
            // Stop at RED or YELLOW lights
            if (signal === 'red' || signal === 'yellow') {
                // Check if approaching intersection
                switch(this.direction) {
                    case 'north':
                        if (this.y > center - stopLine - 60 && this.y <= center - stopLine + 10) {
                            shouldStop = true;
                        }
                        break;
                    case 'south':
                        if (this.y < center + stopLine + 60 && this.y >= center + stopLine - 10) {
                            shouldStop = true;
                        }
                        break;
                    case 'east':
                        if (this.x < center + stopLine + 60 && this.x >= center + stopLine - 10) {
                            shouldStop = true;
                        }
                        break;
                    case 'west':
                        if (this.x > center - stopLine - 60 && this.x <= center - stopLine + 10) {
                            shouldStop = true;
                        }
                        break;
                }
            }
            
            // Check for collision with vehicle ahead
            const vehiclesInMyLane = vehicles[this.direction].filter(v => 
                v.lane === this.lane && v !== this
            );
            
            for (let otherVehicle of vehiclesInMyLane) {
                let distance = 0;
                switch(this.direction) {
                    case 'north':
                        distance = this.y - otherVehicle.y;
                        if (distance > 0 && distance < safeDistance) {
                            shouldStop = true;
                        }
                        break;
                    case 'south':
                        distance = otherVehicle.y - this.y;
                        if (distance > 0 && distance < safeDistance) {
                            shouldStop = true;
                        }
                        break;
                    case 'east':
                        distance = otherVehicle.x - this.x;
                        if (distance > 0 && distance < safeDistance) {
                            shouldStop = true;
                        }
                        break;
                    case 'west':
                        distance = this.x - otherVehicle.x;
                        if (distance > 0 && distance < safeDistance) {
                            shouldStop = true;
                        }
                        break;
                }
            }
        }
        
        this.stopped = shouldStop;
        
        // Move vehicle if not stopped
        if (!this.stopped) {
            switch(this.direction) {
                case 'north':
                    this.y -= this.speed;
                    break;
                case 'south':
                    this.y += this.speed;
                    break;
                case 'east':
                    this.x += this.speed;
                    break;
                case 'west':
                    this.x -= this.speed;
                    break;
            }
        }
    }
    
    draw() {
        ctx.save();
        
        if (this.type === 'car') {
            // Draw car as rectangle
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
            ctx.strokeStyle = '#1f2937';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
            
            // Draw windows
            ctx.fillStyle = '#60a5fa';
            if (this.direction === 'north' || this.direction === 'south') {
                ctx.fillRect(this.x - this.width/2 + 3, this.y - this.height/2 + 5, this.width - 6, 10);
            } else {
                ctx.fillRect(this.x - this.width/2 + 5, this.y - this.height/2 + 3, 10, this.height - 6);
            }
        } else {
            // Draw bike as thick line
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 4;
            ctx.beginPath();
            if (this.direction === 'north' || this.direction === 'south') {
                ctx.moveTo(this.x, this.y - this.height/2);
                ctx.lineTo(this.x, this.y + this.height/2);
            } else {
                ctx.moveTo(this.x - this.width/2, this.y);
                ctx.lineTo(this.x + this.width/2, this.y);
            }
            ctx.stroke();
            
            // Draw rider as small circle
            ctx.fillStyle = '#1f2937';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
    
    isOffScreen() {
        return this.x < -50 || this.x > canvas.width + 50 || 
               this.y < -50 || this.y > canvas.height + 50;
    }
}

// Draw road infrastructure
function drawRoads() {
    const center = 400;
    const roadWidth = 120;
    
    // Road background
    ctx.fillStyle = '#374151';
    
    // Vertical road (North-South)
    ctx.fillRect(center - roadWidth/2, 0, roadWidth, canvas.height);
    
    // Horizontal road (East-West)
    ctx.fillRect(0, center - roadWidth/2, canvas.width, roadWidth);
    
    // Intersection
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(center - roadWidth/2, center - roadWidth/2, roadWidth, roadWidth);
    
    // Lane markings
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.setLineDash([15, 10]);
    
    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(center, 0);
    ctx.lineTo(center, center - roadWidth/2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(center, center + roadWidth/2);
    ctx.lineTo(center, canvas.height);
    ctx.stroke();
    
    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(0, center);
    ctx.lineTo(center - roadWidth/2, center);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(center + roadWidth/2, center);
    ctx.lineTo(canvas.width, center);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Stop lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    
    const stopLine = 50;
    
    // North stop line
    ctx.beginPath();
    ctx.moveTo(center - roadWidth/2, center - roadWidth/2 - stopLine);
    ctx.lineTo(center, center - roadWidth/2 - stopLine);
    ctx.stroke();
    
    // South stop line
    ctx.beginPath();
    ctx.moveTo(center, center + roadWidth/2 + stopLine);
    ctx.lineTo(center + roadWidth/2, center + roadWidth/2 + stopLine);
    ctx.stroke();
    
    // East stop line
    ctx.beginPath();
    ctx.moveTo(center + roadWidth/2 + stopLine, center);
    ctx.lineTo(center + roadWidth/2 + stopLine, center + roadWidth/2);
    ctx.stroke();
    
    // West stop line
    ctx.beginPath();
    ctx.moveTo(center - roadWidth/2 - stopLine, center - roadWidth/2);
    ctx.lineTo(center - roadWidth/2 - stopLine, center);
    ctx.stroke();
}

// Draw traffic signals
function drawSignals() {
    const center = 400;
    const signalSize = 30;
    const offset = 80;
    
    // Signal positions
    const positions = {
        north: {x: center - offset, y: center - offset - 80},
        south: {x: center + offset, y: center + offset + 80},
        east: {x: center + offset + 80, y: center + offset},
        west: {x: center - offset - 80, y: center - offset}
    };
    
    // Draw each signal
    Object.keys(positions).forEach(direction => {
        const pos = positions[direction];
        
        // Signal box
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(pos.x - signalSize/2, pos.y - signalSize * 1.5, signalSize, signalSize * 3);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.strokeRect(pos.x - signalSize/2, pos.y - signalSize * 1.5, signalSize, signalSize * 3);
        
        // Lights
        const state = signals[direction];
        
        // Red light
        ctx.fillStyle = state === 'red' ? '#ef4444' : '#7f1d1d';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y - signalSize, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Yellow light
        ctx.fillStyle = state === 'yellow' ? '#eab308' : '#713f12';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Green light
        ctx.fillStyle = state === 'green' ? '#22c55e' : '#14532d';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y + signalSize, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Direction label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(direction.toUpperCase(), pos.x, pos.y + signalSize * 2);
    });
}

// Spawn vehicles
function spawnVehicles() {
    const directions = ['north', 'south', 'east', 'west'];
    
    directions.forEach(direction => {
        // Spawn incoming vehicles (lane 0) - check if there's space
        if (Math.random() < spawnRate / 150) { // Reduced spawn rate for better spacing
            const hasRecentVehicle = vehicles[direction].some(v => {
                if (v.lane !== 0) return false;
                
                switch(direction) {
                    case 'north':
                        return v.y > canvas.height - 80;
                    case 'south':
                        return v.y < 80;
                    case 'east':
                        return v.x < 80;
                    case 'west':
                        return v.x > canvas.width - 80;
                    default:
                        return false;
                }
            });
            
            if (!hasRecentVehicle) {
                const type = Math.random() < 0.7 ? 'car' : 'bike';
                vehicles[direction].push(new Vehicle(type, direction, 0));
            }
        }
        
        // Occasionally spawn outgoing vehicles (lane 1)
        if (Math.random() < spawnRate / 300) {
            const type = Math.random() < 0.7 ? 'car' : 'bike';
            vehicles[direction].push(new Vehicle(type, direction, 1));
        }
    });
}

// Update signal lights
function updateSignals() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - phaseStartTime;
    
    if (currentPhase === 0) { // East-West green, North-South red
        if (elapsedTime < greenDuration) {
            // Green phase for East-West
            signals.east = 'green';
            signals.west = 'green';
            signals.north = 'red';
            signals.south = 'red';
        } else if (elapsedTime < greenDuration + yellowDuration) {
            // Yellow phase for East-West
            signals.east = 'yellow';
            signals.west = 'yellow';
            signals.north = 'red';
            signals.south = 'red';
        } else {
            // Switch to next phase
            currentPhase = 1;
            phaseStartTime = currentTime;
            signals.east = 'red';
            signals.west = 'red';
            signals.north = 'green';
            signals.south = 'green';
        }
    } else { // North-South green, East-West red
        if (elapsedTime < greenDuration) {
            // Green phase for North-South
            signals.north = 'green';
            signals.south = 'green';
            signals.east = 'red';
            signals.west = 'red';
        } else if (elapsedTime < greenDuration + yellowDuration) {
            // Yellow phase for North-South
            signals.north = 'yellow';
            signals.south = 'yellow';
            signals.east = 'red';
            signals.west = 'red';
        } else {
            // Switch to next phase
            currentPhase = 0;
            phaseStartTime = currentTime;
            signals.north = 'red';
            signals.south = 'red';
            signals.east = 'green';
            signals.west = 'green';
        }
    }
}

// Update statistics
function updateStats() {
    currentVehiclesCount = Object.values(vehicles).reduce((sum, arr) => sum + arr.length, 0);
    waitingVehiclesCount = Object.values(vehicles).reduce((sum, arr) => 
        sum + arr.filter(v => v.stopped).length, 0);
    
    document.getElementById('vehiclesPassed').textContent = vehiclesPassed;
    document.getElementById('currentVehicles').textContent = currentVehiclesCount;
    document.getElementById('waitingVehicles').textContent = waitingVehiclesCount;
}

// Main animation loop
function animate() {
    if (!isRunning) return;
    
    // Clear canvas
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw infrastructure
    drawRoads();
    drawSignals();
    
    // Update signals
    updateSignals();
    
    // Spawn new vehicles
    spawnVehicles();
    
    // Update and draw vehicles
    Object.keys(vehicles).forEach(direction => {
        vehicles[direction] = vehicles[direction].filter(vehicle => {
            vehicle.update();
            vehicle.draw();
            
            if (vehicle.isOffScreen()) {
                vehiclesPassed++;
                return false;
            }
            return true;
        });
    });
    
    // Update statistics
    updateStats();
    
    animationId = requestAnimationFrame(animate);
}

// Control functions
function startSimulation() {
    isRunning = true;
    phaseStartTime = Date.now(); // Initialize phase timer
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('simulationStatus').innerHTML = '🟢 Running';
    animate();
}

function pauseSimulation() {
    isRunning = false;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('simulationStatus').innerHTML = '🟡 Paused';
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

function resetSimulation() {
    isRunning = false;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('simulationStatus').innerHTML = '⚫ Stopped';
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Reset all data
    Object.keys(vehicles).forEach(dir => vehicles[dir] = []);
    vehiclesPassed = 0;
    signalTimer = 0;
    currentPhase = 0;
    phaseStartTime = 0;
    
    // Reset signals to initial state
    signals.east = 'green';
    signals.west = 'green';
    signals.north = 'red';
    signals.south = 'red';
    
    // Redraw static scene
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawRoads();
    drawSignals();
    updateStats();
}

function updateSettings() {
    greenDuration = parseInt(document.getElementById('greenDuration').value) * 1000;
    yellowDuration = parseInt(document.getElementById('yellowDuration').value) * 1000;
    spawnRate = parseInt(document.getElementById('spawnRate').value);
    
    document.getElementById('greenValue').textContent = greenDuration/1000 + 's';
    document.getElementById('yellowValue').textContent = yellowDuration/1000 + 's';
    document.getElementById('spawnValue').textContent = spawnRate;
}

function goBack() {
    if (isRunning) {
        if (confirm('Simulation is running. Are you sure you want to go back?')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        window.location.href = 'dashboard.html';
    }
}

// Initialize
window.onload = function() {
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawRoads();
    drawSignals();
    updateSettings();
};
