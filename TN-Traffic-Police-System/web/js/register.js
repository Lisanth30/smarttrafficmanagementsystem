/**
 * Mark admin account as created in the system
 */
function setAdminAccountCreated() {
    localStorage.setItem('adminAccountCreated', 'true');
}

/**
 * Check if admin account has already been created
 */
function isAdminAccountCreated() {
    return localStorage.getItem('adminAccountCreated') === 'true';
}

function handleRegister(event) {
    event.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const officerId = document.getElementById('officerId').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const rank = document.getElementById('rank').value;
    const station = document.getElementById('station').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match! Please re-enter.');
        return;
    }
    
    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const usernameExists = users.some(u => u.username === username);
    const officerIdExists = users.some(u => u.officerId === officerId);
    
    if (usernameExists) {
        alert('Username already exists! Please choose a different username.');
        return;
    }
    
    if (officerIdExists) {
        alert('Officer ID already registered! Please contact administrator.');
        return;
    }
    
    // Create user object
    const newUser = {
        fullName,
        officerId,
        email,
        mobile,
        rank,
        station,
        username,
        password,
        registeredDate: new Date().toISOString()
    };
    
    // Add to users array and save to localStorage
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    // If this is the first user registration, mark admin account as created
    if (users.length === 1) {
        setAdminAccountCreated();
        alert('Registration Successful! Admin account has been created. You can now login with your credentials.');
    } else {
        alert('Registration Successful! You can now login with your credentials.');
    }
    
    // Redirect to login page
    window.location.href = 'login.html';
}
