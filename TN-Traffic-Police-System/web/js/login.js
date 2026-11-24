let currentLoginType = 'master';

/**
 * Initialize admin account creation status
 * Admin must be created before any login is allowed
 */
function initializeAdminStatus() {
    const adminCreated = localStorage.getItem('adminAccountCreated');
    if (!adminCreated) {
        localStorage.setItem('adminAccountCreated', 'false');
    }
}

/**
 * Check if admin account has been created
 */
function isAdminAccountCreated() {
    return localStorage.getItem('adminAccountCreated') === 'true';
}

/**
 * Set admin account as created
 */
function setAdminAccountCreated() {
    localStorage.setItem('adminAccountCreated', 'true');
}

/**
 * Display error modal for admin account not created
 */
function showAdminNotCreatedError() {
    const errorHTML = `
        <div id="adminErrorModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        ">
            <div style="
                background: white;
                border-radius: 15px;
                padding: 40px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                animation: slideDown 0.3s ease-out;
            ">
                <div style="font-size: 60px; margin-bottom: 20px;">⚠️</div>
                <h2 style="color: #d32f2f; margin-bottom: 15px; font-size: 24px;">Admin Account Not Created!</h2>
                <p style="color: #555; margin-bottom: 20px; line-height: 1.6;">
                    Login is not available until the admin account is created in the system. 
                    An administrator must set up the master admin account first.
                </p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: left;">
                    <p style="color: #333; font-weight: bold; margin-bottom: 10px;">📋 To create admin account:</p>
                    <ol style="color: #555; margin-left: 20px;">
                        <li>Run the backend Java application</li>
                        <li>Execute: <code>TrafficPoliceApp.main()</code></li>
                        <li>Admin account will be initialized automatically</li>
                        <li>Return to this login page</li>
                    </ol>
                </div>
                <p style="color: #999; font-size: 12px; margin-bottom: 20px;">
                    Contact your system administrator if you need assistance.
                </p>
                <button onclick="document.getElementById('adminErrorModal').remove()" style="
                    background: #1e3c72;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                ">
                    Close
                </button>
            </div>
        </div>
        <style>
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    `;
    document.body.insertAdjacentHTML('beforeend', errorHTML);
}

function switchLoginType(type) {
    currentLoginType = type;
    
    const masterBtn = document.getElementById('masterBtn');
    const normalBtn = document.getElementById('normalBtn');
    const masterKeyGroup = document.getElementById('masterKeyGroup');
    const userLabel = document.getElementById('userLabel');
    
    if (type === 'master') {
        masterBtn.classList.add('active');
        normalBtn.classList.remove('active');
        masterKeyGroup.style.display = 'block';
        userLabel.textContent = 'Master Username / Admin ID';
        document.getElementById('masterKey').required = true;
    } else {
        normalBtn.classList.add('active');
        masterBtn.classList.remove('active');
        masterKeyGroup.style.display = 'none';
        userLabel.textContent = 'Username / Officer ID';
        document.getElementById('masterKey').required = false;
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    // Check if admin account has been created before allowing login
    if (!isAdminAccountCreated()) {
        showAdminNotCreatedError();
        return;
    }
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const masterKey = document.getElementById('masterKey').value;
    
    // Simple validation
    if (currentLoginType === 'master') {
        // Master login validation - Check both hardcoded and registered users
        if (username === 'admin' && password === 'admin123' && masterKey === 'master2025') {
            alert('Master Login Successful! Welcome Administrator.');
            sessionStorage.setItem('userType', 'master');
            sessionStorage.setItem('username', username);
            window.location.href = 'dashboard.html';
        } else {
            // Also check registered users for master access
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user && masterKey === 'master2025') {
                alert('Master Login Successful! Welcome ' + user.fullName + '.');
                sessionStorage.setItem('userType', 'master');
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('fullName', user.fullName);
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid Master Credentials! Please check your username, password, and master key.');
            }
        }
    } else {
        // Normal login validation
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            alert('Login Successful! Welcome ' + user.fullName + '.');
            sessionStorage.setItem('userType', 'normal');
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('fullName', user.fullName);
            window.location.href = 'dashboard.html';
        } else {
            // Demo credentials
            if (username === 'officer' && password === 'officer123') {
                alert('Login Successful! Welcome Officer.');
                sessionStorage.setItem('userType', 'normal');
                sessionStorage.setItem('username', username);
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid Credentials! Please check your username and password or register first.');
            }
        }
    }
}

// Initialize with master login selected
window.onload = function() {
    initializeAdminStatus();
    switchLoginType('master');
};
