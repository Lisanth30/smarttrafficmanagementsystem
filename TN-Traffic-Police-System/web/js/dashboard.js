// Check if user is logged in
window.onload = function() {
    const username = sessionStorage.getItem('username');
    const userType = sessionStorage.getItem('userType');
    const fullName = sessionStorage.getItem('fullName');
    
    if (!username) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return;
    }
    
    // Display user information
    document.getElementById('userName').textContent = fullName || username;
    document.getElementById('userType').textContent = userType === 'master' ? 'ADMIN' : 'OFFICER';
};

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

function showSignalDetail(cityName) {
    alert(`📍 ${cityName} Traffic Signals\n\nClick "Open Simulator" to view the 4-way traffic signal simulation.`);
}

function openSignalSimulator() {
    window.location.href = 'traffic-signal.html';
}
