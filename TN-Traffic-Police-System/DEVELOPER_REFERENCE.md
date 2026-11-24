# Developer Reference Guide

## API Reference

### login.js Functions

#### `initializeAdminStatus()`
**Purpose:** Initialize admin account status on page load

**Syntax:**
```javascript
initializeAdminStatus()
```

**Details:**
- Called automatically on `window.onload`
- Checks if `adminAccountCreated` exists in localStorage
- Sets to `'false'` if not present
- No parameters
- No return value

**Example:**
```javascript
window.onload = function() {
    initializeAdminStatus();  // Initializes on load
    switchLoginType('master');
};
```

---

#### `isAdminAccountCreated()`
**Purpose:** Check if admin account has been created

**Syntax:**
```javascript
const result = isAdminAccountCreated()
```

**Returns:**
- `true` - Admin account is created
- `false` - Admin account is not created

**Example:**
```javascript
function handleLogin(event) {
    event.preventDefault();
    
    if (!isAdminAccountCreated()) {
        showAdminNotCreatedError();
        return;
    }
    // Proceed with login
}
```

---

#### `setAdminAccountCreated()`
**Purpose:** Mark admin account as created in system

**Syntax:**
```javascript
setAdminAccountCreated()
```

**Details:**
- Sets `adminAccountCreated` to `'true'` in localStorage
- Called after first user registration
- Persists across browser sessions
- No parameters
- No return value

**Example:**
```javascript
// In register.js
if (users.length === 1) {  // First registration
    setAdminAccountCreated();  // Mark admin as created
}
```

---

#### `showAdminNotCreatedError()`
**Purpose:** Display error modal when admin account not created

**Syntax:**
```javascript
showAdminNotCreatedError()
```

**Details:**
- Creates and inserts modal HTML into page
- Displays error message with instructions
- Shows instructions to run `TrafficPoliceApp.main()`
- Modal is removable by clicking "Close" button
- No parameters
- No return value

**Example:**
```javascript
function handleLogin(event) {
    event.preventDefault();
    
    if (!isAdminAccountCreated()) {
        showAdminNotCreatedError();  // Show error
        return;
    }
    // Continue with login
}
```

**Modal Contents:**
```
⚠️ Admin Account Not Created!

Login is not available until the admin account is created in the system.
An administrator must set up the master admin account first.

📋 To create admin account:
1. Run the backend Java application
2. Execute: TrafficPoliceApp.main()
3. Admin account will be initialized automatically
4. Return to this login page

Contact your system administrator if you need assistance.

[ Close ]
```

---

### register.js Functions

#### `setAdminAccountCreated()` (In register.js)
**Purpose:** Mark admin account as created (registration context)

**Syntax:**
```javascript
setAdminAccountCreated()
```

**Used in:**
```javascript
// In handleRegister()
if (users.length === 1) {
    setAdminAccountCreated();  // Called on first registration
}
```

---

#### `isAdminAccountCreated()` (In register.js)
**Purpose:** Check if admin account exists (registration context)

**Syntax:**
```javascript
const result = isAdminAccountCreated()
```

**Returns:**
- `true` - Admin account created
- `false` - Admin account not created

---

## localStorage API Usage

### Storage Key
```
Key: adminAccountCreated
```

### Valid Values
```
'true'   → Admin account created, login allowed
'false'  → Admin account not created, login blocked
undefined → Initial state, will be set to 'false'
```

### Read Operation
```javascript
const status = localStorage.getItem('adminAccountCreated');
```

### Write Operation
```javascript
// Mark as created
localStorage.setItem('adminAccountCreated', 'true');

// Mark as not created
localStorage.setItem('adminAccountCreated', 'false');
```

### Clear Operation
```javascript
// Remove specific key
localStorage.removeItem('adminAccountCreated');

// Clear all storage
localStorage.clear();
```

---

## Integration Points

### Login Flow Integration
```javascript
function handleLogin(event) {
    event.preventDefault();
    
    // ✅ Check admin status BEFORE anything else
    if (!isAdminAccountCreated()) {
        showAdminNotCreatedError();
        return;
    }
    
    // ✅ Then proceed with normal login logic
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // ... rest of login code
}
```

### Registration Flow Integration
```javascript
function handleRegister(event) {
    event.preventDefault();
    
    // ... validate and save user ...
    
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    // ✅ Mark admin account created on first registration
    if (users.length === 1) {
        setAdminAccountCreated();
        alert('Admin account has been created. You can now login.');
    }
    
    window.location.href = 'login.html';
}
```

---

## Error Handling

### Modal DOM Structure
```html
<div id="adminErrorModal" style="...">
    <div style="...">
        <div style="font-size: 60px;">⚠️</div>
        <h2>Admin Account Not Created!</h2>
        <p>Login is not available...</p>
        <div style="background: #f5f5f5; ...">
            <p>📋 To create admin account:</p>
            <ol>
                <li>Run the backend Java application</li>
                <li>Execute: TrafficPoliceApp.main()</li>
                <li>Admin account will be initialized automatically</li>
                <li>Return to this login page</li>
            </ol>
        </div>
        <button onclick="document.getElementById('adminErrorModal').remove()">
            Close
        </button>
    </div>
</div>
```

### Styling Applied
```javascript
// Modal container
position: fixed
top: 0, left: 0
width: 100%, height: 100%
background: rgba(0, 0, 0, 0.7)
z-index: 9999

// Modal box
border-radius: 15px
padding: 40px
max-width: 500px
background: white
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3)
animation: slideDown 0.3s ease-out

// Animation
@keyframes slideDown
  from: opacity 0, translateY(-30px)
  to: opacity 1, translateY(0)
```

---

## Testing Guide

### Unit Tests

#### Test 1: Admin Status Initialization
```javascript
// Scenario: First page load
localStorage.clear();
initializeAdminStatus();
assert(localStorage.getItem('adminAccountCreated') === 'false');
```

#### Test 2: Admin Check When Not Created
```javascript
// Scenario: Admin not created
localStorage.setItem('adminAccountCreated', 'false');
assert(isAdminAccountCreated() === false);
```

#### Test 3: Admin Check When Created
```javascript
// Scenario: Admin created
localStorage.setItem('adminAccountCreated', 'true');
assert(isAdminAccountCreated() === true);
```

#### Test 4: Set Admin Account
```javascript
// Scenario: Mark admin as created
localStorage.clear();
setAdminAccountCreated();
assert(localStorage.getItem('adminAccountCreated') === 'true');
```

### Integration Tests

#### Test 5: Login Blocked When Admin Not Created
```javascript
// Scenario: User tries to login before admin creation
localStorage.setItem('adminAccountCreated', 'false');

// Simulate form submission
const event = new Event('submit');
handleLogin(event);

// Verify error modal is created
assert(document.getElementById('adminErrorModal') !== null);
```

#### Test 6: Login Allowed When Admin Created
```javascript
// Scenario: User tries to login after admin creation
localStorage.setItem('adminAccountCreated', 'true');

// Simulate valid login
const event = new Event('submit');
// Mock form fields
document.getElementById('username').value = 'admin';
document.getElementById('password').value = 'admin123';
document.getElementById('masterKey').value = 'master2025';

handleLogin(event);
// Should proceed without error modal
assert(document.getElementById('adminErrorModal') === null);
```

#### Test 7: Admin Created on First Registration
```javascript
// Scenario: First user registers
localStorage.clear();
localStorage.setItem('registeredUsers', '[]');

// Simulate registration
const users = [];
users.push({
    fullName: 'Test User',
    username: 'testuser',
    password: 'test123',
    // ... other fields
});

localStorage.setItem('registeredUsers', JSON.stringify(users));

// Trigger admin marking
if (users.length === 1) {
    setAdminAccountCreated();
}

// Verify
assert(localStorage.getItem('adminAccountCreated') === 'true');
```

---

## Browser Console Commands

### Quick Status Check
```javascript
// Check current status
console.log('Admin Account Created:', localStorage.getItem('adminAccountCreated'));
```

### Enable Login
```javascript
localStorage.setItem('adminAccountCreated', 'true');
location.reload();
```

### Disable Login (for testing error)
```javascript
localStorage.setItem('adminAccountCreated', 'false');
location.reload();
```

### Full Reset
```javascript
localStorage.clear();
console.log('All data cleared');
location.reload();
```

### View All Storage
```javascript
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(key, ':', value);
}
```

### View Registered Users
```javascript
const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
console.table(users);
```

---

## Debugging Tips

### Enable Debug Logging
Add this to login.js:
```javascript
const DEBUG = true;

function log(message, data) {
    if (DEBUG) {
        console.log(`[LOGIN] ${message}`, data || '');
    }
}
```

### Add to Functions
```javascript
function handleLogin(event) {
    event.preventDefault();
    log('handleLogin called');
    
    if (!isAdminAccountCreated()) {
        log('Admin not created, showing error');
        showAdminNotCreatedError();
        return;
    }
    
    log('Admin created, proceeding with login');
    // ... rest of code
}
```

### Check for Errors
```javascript
function showAdminNotCreatedError() {
    try {
        const errorHTML = `...`;
        document.body.insertAdjacentHTML('beforeend', errorHTML);
        log('Error modal displayed');
    } catch (e) {
        console.error('Error displaying modal:', e);
    }
}
```

---

## Performance Considerations

### Storage Access
- `localStorage.getItem()` - O(1) time complexity
- Called multiple times per login attempt (3-4 times)
- Negligible performance impact

### DOM Operations
- Error modal creation uses `insertAdjacentHTML`
- Single DOM insertion per error
- Animation is smooth (0.3s)

### Recommended Optimizations
```javascript
// Cache admin status
let adminStatusCache = null;

function isAdminAccountCreated() {
    if (adminStatusCache === null) {
        adminStatusCache = localStorage.getItem('adminAccountCreated') === 'true';
    }
    return adminStatusCache;
}

// Invalidate cache on update
function setAdminAccountCreated() {
    localStorage.setItem('adminAccountCreated', 'true');
    adminStatusCache = true;
}
```

---

## Security Considerations

### Current Implementation
- ✅ Client-side only
- ✅ No sensitive data exposed
- ✅ localStorage used for user preference state
- ⚠️ Not suitable for production

### Production Recommendations
```javascript
// DO NOT DO THIS IN PRODUCTION:
// 1. Store sensitive data in localStorage
// 2. Trust client-side validation alone
// 3. Skip server-side verification

// INSTEAD DO THIS:
// 1. Use server-side session validation
// 2. Implement OAuth 2.0 or JWT
// 3. Hash passwords with bcrypt
// 4. Use HTTPS only
// 5. Implement CSRF protection
// 6. Add rate limiting
// 7. Log all authentication attempts
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-17 | Initial implementation |
| | | • Admin status tracking |
| | | • Login validation |
| | | • First registration detection |
| | | • Error modal display |

---

**Last Updated:** November 17, 2025
**Maintained By:** Development Team
