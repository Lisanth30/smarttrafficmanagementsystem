# Quick Start: Admin Account Creation & Login Setup

## 🚀 Quick Setup (5 minutes)

### What Changed?
The login system now requires an **admin account to be created first** before anyone can login. If you try to login before creating an admin account, you'll see an error message.

### First Time Users: Follow These Steps

#### Step 1: Register Admin Account
1. Open the app and go to **"Register Now"** button on login page
2. Fill in the registration form:
   ```
   Full Name: System Administrator
   Officer ID: ADMIN001
   Email: admin@tnpolice.gov.in
   Mobile: 9876543210
   Rank: Inspector (or any rank)
   Station: Headquarters
   Username: admin
   Password: admin123 (or your preferred password)
   ```
3. Click **"Register"**
4. You'll see: ✅ "Admin account has been created"

#### Step 2: Login
1. Go to login page
2. Enter your credentials:
   - **Username:** admin (or your chosen username)
   - **Password:** admin123 (or your chosen password)
3. Click **"Login"** → You're in! ✅

---

## ⚠️ If You See This Error:

```
Admin Account Not Created!

Login is not available until the admin account is created in the system.
```

### Solution:
1. Click **"Register Now"** 
2. Complete the registration form
3. That's it! You can now login

---

## 🔑 Test Credentials After Admin Setup

### Master Login (for administrators)
- **Login Type:** Master Login
- **Username:** admin
- **Password:** admin123
- **Master Key:** master2025

### Normal Login (for officers)
- **Login Type:** Normal Login  
- **Username:** officer (or any registered username)
- **Password:** officer123 (or registered password)

---

## 🛠️ For Developers: Reset for Testing

To test the "Admin Account Not Created" error again:

**Open Browser Console (F12) and run:**
```javascript
localStorage.setItem('adminAccountCreated', 'false');
location.reload();
```

To enable login again:
```javascript
localStorage.setItem('adminAccountCreated', 'true');
```

---

## 📋 Files Updated

- ✅ `web/js/login.js` - Added admin account validation
- ✅ `web/js/register.js` - Auto-sets admin status on first registration
- ✅ `ADMIN_ACCOUNT_SETUP.md` - Detailed documentation (this file)

---

## ❓ Frequently Asked Questions

**Q: Do I need to run Java backend first?**
A: For browser-based testing, no. This uses local storage. For production with backend, yes.

**Q: Can I reset the admin account?**
A: Yes, clear browser storage (DevTools → Application → Local Storage → Clear).

**Q: What if I forgot my admin password?**
A: Reset with: `localStorage.setItem('adminAccountCreated', 'false')` then re-register.

**Q: Does this work offline?**
A: Yes, everything uses browser's localStorage.

---

For detailed documentation, see: **ADMIN_ACCOUNT_SETUP.md**
