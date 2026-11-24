# Tamil Nadu Traffic Police Management System

## சத்யமேவ ஜெயதே - Truth Alone Triumphs

A comprehensive Traffic Signal Management System designed specifically for the Tamil Nadu Traffic Police Department. This system features user authentication, interactive traffic signal simulation, and real-time vehicle movement visualization.

---

## 🌟 Features

### 1. **Login System**
- **Master Login**: For administrators with special master key access
- **Normal Login**: For registered traffic police officers
- **Registration**: New officers can register to access the system
- **Secure Authentication**: Password-protected access with session management

### 2. **Dashboard**
- Tamil Nadu map with major cities marked
- Interactive city markers showing traffic signal locations
- Quick statistics display
- Access to traffic signal simulator

### 3. **4-Way Traffic Signal Simulator**
- **Realistic 4-road intersection** with 8 lanes (2 lanes per road)
- **Animated vehicles**: 
  - Cars (rectangles)
  - Bikes (lines)
- **Working traffic signals** with Red, Yellow, and Green lights
- **Vehicle movement** following signal rules
- **Real-time statistics** tracking
- **Customizable settings**:
  - Green light duration
  - Yellow light duration
  - Vehicle spawn rate

### 4. **Tamil Nadu Police Branding**
- Official emblem
- Inspiring quotes: "Truth Alone Triumphs"
- Professional color scheme
- Emergency contact information

---

## 📁 Project Structure

```
TN-Traffic-Police-System/
│
├── web/                          # Frontend (HTML/CSS/JavaScript)
│   ├── login.html               # Login page with Master/Normal options
│   ├── register.html            # Officer registration page
│   ├── dashboard.html           # Main dashboard with TN map
│   ├── traffic-signal.html      # 4-way traffic signal simulator
│   │
│   ├── css/
│   │   ├── login.css           # Login page styles
│   │   ├── register.css        # Registration page styles
│   │   ├── dashboard.css       # Dashboard styles
│   │   └── traffic-signal.css  # Traffic signal simulator styles
│   │
│   ├── js/
│   │   ├── login.js            # Login functionality
│   │   ├── register.js         # Registration functionality
│   │   ├── dashboard.js        # Dashboard functionality
│   │   └── traffic-signal.js   # Traffic signal simulation logic
│   │
│   └── images/                  # Image resources (optional)
│
└── src/                         # Backend (Java)
    ├── User.java                # User model class
    ├── TrafficSignal.java       # Traffic signal model class
    ├── LoginService.java        # Authentication service
    ├── TrafficManagementService.java  # Traffic signal management
    └── TrafficPoliceApp.java    # Main application (Console version)
```

---

## 🚀 How to Run

### **Option 1: Web Version (Recommended)**

1. **Open the login page**:
   - Navigate to the project folder
   - Open `web/login.html` in any modern web browser (Chrome, Firefox, Edge, Safari)

2. **Login credentials**:
   
   **Master Login:**
   - Username: `admin`
   - Password: `admin123`
   - Master Key: `master2025`
   
   **Normal Login:**
   - Username: `officer`
   - Password: `officer123`
   
   OR register a new account!

3. **Explore the system**:
   - View the Tamil Nadu map dashboard
   - Click "Open Simulator" to see the 4-way traffic signal
   - Start the simulation to watch vehicles move according to signals

### **Option 2: Java Console Version**

1. **Compile the Java files**:
   ```powershell
   cd "TN-Traffic-Police-System\src"
   javac *.java
   ```

2. **Run the application**:
   ```powershell
   java TrafficPoliceApp
   ```

3. **Follow the console menu** to login, register, and manage traffic signals

---

## 🎮 Using the Traffic Signal Simulator

### **Controls**:
- **Start Simulation**: Begin the traffic flow animation
- **Pause**: Temporarily stop the simulation
- **Reset**: Clear all vehicles and reset to initial state

### **Settings (Adjustable)**:
- **Green Light Duration**: 3-15 seconds (default: 8s)
- **Yellow Light Duration**: 1-5 seconds (default: 2s)
- **Vehicle Spawn Rate**: 1-10 (default: 5)

### **Legend**:
- 🟩 **Rectangle** = Car
- 🟨 **Line** = Bike
- 🟢 **Green Signal** = Vehicles can go
- 🟡 **Yellow Signal** = Slow down
- 🔴 **Red Signal** = Stop

### **Road Layout**:
```
        NORTH (2 lanes)
             ↓↑
             ||
WEST ←← ==== ⊕ ==== →→ EAST
    (2 lanes)    (2 lanes)
             ||
             ↓↑
        SOUTH (2 lanes)
```

Each road has:
- **Lane 1**: Incoming traffic (approaches intersection)
- **Lane 2**: Outgoing traffic (leaves intersection)

---

## 🔐 Default Credentials

### Master Login:
- **Username**: admin
- **Password**: admin123
- **Master Key**: master2025

### Normal Login:
- **Username**: officer
- **Password**: officer123

### New Users:
Click "Register Now" on the login page to create a new account.

---

## 💻 Technical Details

### **Frontend Technologies**:
- HTML5
- CSS3 (with gradients, animations, and flexbox/grid)
- JavaScript (ES6+)
- Canvas API for traffic simulation

### **Backend Technologies**:
- Java (Object-Oriented Programming)
- Data structures (HashMap for user/signal storage)
- Timer for automatic signal cycling

### **Key Features Implementation**:
1. **Session Management**: Uses `sessionStorage` for maintaining login state
2. **Local Storage**: Stores registered users in `localStorage`
3. **Canvas Animation**: 60 FPS animation loop with `requestAnimationFrame`
4. **Vehicle AI**: Vehicles detect signals and stop/go accordingly
5. **Signal Cycling**: Automatic phase switching between directions

---

## 📊 Traffic Signal Logic

### **Signal Phases**:

**Phase 1** (10 seconds):
- East: 🟢 GREEN
- West: 🟢 GREEN
- North: 🔴 RED
- South: 🔴 RED

**Transition** (2 seconds):
- East: 🟡 YELLOW
- West: 🟡 YELLOW
- North: 🔴 RED
- South: 🔴 RED

**Phase 2** (10 seconds):
- North: 🟢 GREEN
- South: 🟢 GREEN
- East: 🔴 RED
- West: 🔴 RED

**Transition** (2 seconds):
- North: 🟡 YELLOW
- South: 🟡 YELLOW
- East: 🔴 RED
- West: 🔴 RED

*Then the cycle repeats...*

---

## 🎨 Design Elements

### **Color Scheme**:
- **Primary Blue**: `#1e3c72` (TN Police)
- **Secondary Blue**: `#2a5298`
- **Green (Success)**: `#10b981`
- **Orange (Warning)**: `#f59e0b`
- **Red (Alert)**: `#ef4444`
- **Gold (Emblem)**: `#FFD700`

### **Typography**:
- Font Family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Headings: Bold, 20-28px
- Body Text: Regular, 14-16px

---

## 📱 Browser Compatibility

Tested and working on:
- ✅ Google Chrome (Latest)
- ✅ Mozilla Firefox (Latest)
- ✅ Microsoft Edge (Latest)
- ✅ Safari (Latest)

---

## 🛠️ Future Enhancements

- [ ] Database integration for persistent storage
- [ ] Real-time traffic density sensors
- [ ] Mobile app version
- [ ] AI-based adaptive signal timing
- [ ] Emergency vehicle priority system
- [ ] Traffic violation detection and recording
- [ ] Integration with CCTV cameras
- [ ] SMS/Email alerts for system status

---

## 📞 Emergency Contacts

- **Emergency**: 📞 100
- **Traffic Helpline**: 📞 103

---

## 👥 User Roles

### **Master (Administrator)**:
- Full system access
- Can manage all traffic signals
- Update signal timings
- User management
- View all statistics

### **Normal (Officer)**:
- View traffic signals
- Monitor traffic flow
- View statistics
- Access simulator

---

## 📝 License

This project is developed for the Tamil Nadu Traffic Police Department.

---

## 🙏 Acknowledgments

Developed for the Tamil Nadu Traffic Police Department to help manage and visualize traffic signal operations across the state.

**Truth Alone Triumphs - சத்யமேவ ஜெயதே**

---

## 📧 Support

For support and queries, contact your system administrator or the IT department of Tamil Nadu Traffic Police.

---

**© 2025 Tamil Nadu Traffic Police Department**

**Serving with Dedication | Enforcing with Compassion**
