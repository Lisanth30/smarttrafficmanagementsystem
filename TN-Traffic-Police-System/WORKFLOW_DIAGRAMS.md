# Admin Account Creation - Visual Workflow

## Complete System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                  APPLICATION START                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────┐
        │  Initialize Admin Status         │
        │  (window.onload)                 │
        │  Call: initializeAdminStatus()   │
        └──────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────┐
        │  Check localStorage:             │
        │  'adminAccountCreated'           │
        │                                  │
        │  If empty → Set to 'false'       │
        └──────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
    ┌─────────────────┐           ┌──────────────────────┐
    │  LOGIN PAGE     │           │  REGISTER PAGE       │
    │  (login.html)   │           │  (register.html)     │
    └────────┬────────┘           └──────────┬───────────┘
             │                               │
             │                               ▼
             │        ┌──────────────────────────────┐
             │        │ User fills registration form │
             │        │ Full Name, Officer ID, etc.  │
             │        └────────────┬─────────────────┘
             │                     │
             │                     ▼
             │        ┌──────────────────────────────┐
             │        │ Validate form data           │
             │        │ Check duplicates             │
             │        └────────────┬─────────────────┘
             │                     │
             │                     ▼
             │        ┌──────────────────────────────┐
             │        │ Create new user object       │
             │        │ Save to localStorage         │
             │        └────────────┬─────────────────┘
             │                     │
             │                     ▼
             │        ┌──────────────────────────────┐
             │        │ Is this FIRST registration?  │
             │        └────────────┬─────────────────┘
             │                     │
             │        ┌────────────┴──────────────┐
             │        │ YES              NO       │
             │        ▼                  ▼
             │    ┌────────────┐     ┌─────────────────┐
             │    │ Call:      │     │ Skip admin      │
             │    │ setAdminA  │     │ marking         │
             │    │ ccountCre  │     └─────────────────┘
             │    │ ated()     │
             │    │            │
             │    │ localStorage│
             │    │['admin...']│
             │    │= 'true'    │
             │    └─────┬──────┘
             │          │
             │          ▼
             │    ┌──────────────────────────────┐
             │    │ Show success message:        │
             │    │ "Admin account created"      │
             │    └────────────┬─────────────────┘
             │                 │
             └─────────────────┴────────────────────────┐
                               │                        │
                               ▼                        ▼
                    ┌──────────────────────┐
                    │  Redirect to login   │
                    │  (login.html)        │
                    └──────────┬───────────┘
                               │
                               ▼
             ┌─────────────────────────────────────────┐
             │  User enters credentials               │
             │  Selects Master or Normal login         │
             │  Clicks "Login" button                  │
             └──────────────────┬──────────────────────┘
                                │
                                ▼
             ┌─────────────────────────────────────────┐
             │  handleLogin() triggered                │
             │  Call: isAdminAccountCreated()          │
             └──────────────────┬──────────────────────┘
                                │
                ┌───────────────┴────────────────────┐
                │                                   │
                ▼ FALSE                        ▼ TRUE
    ┌──────────────────────────┐     ┌──────────────────────┐
    │ ADMIN NOT CREATED        │     │ ADMIN CREATED        │
    │                          │     │                      │
    │ Call:                    │     │ Validate credentials │
    │ showAdminNotCreated      │     │ Check username/pass  │
    │ Error()                  │     │ Check master key     │
    └──────────────┬───────────┘     └──────────┬───────────┘
                   │                            │
                   ▼                            ▼
    ┌──────────────────────────┐     ┌──────────────────────┐
    │ Display ERROR MODAL:     │     │ Credentials Valid?   │
    │                          │     └──────────┬───────────┘
    │ ⚠️ Admin Account Not     │                │
    │    Created!              │    ┌───────────┴──────────┐
    │                          │    │                      │
    │ "Login not available     │    ▼ YES            ▼ NO
    │  until admin account     │
    │  is created"             │  ┌──────────┐    ┌──────────┐
    │                          │  │ Set      │    │ Show     │
    │ 📋 Instructions:         │  │ session  │    │ error:   │
    │ 1. Register first        │  │ data     │    │ "Invalid │
    │ 2. Create admin ID       │  │ Store    │    │ cred."   │
    │ 3. Return to login       │  │ user     │    │          │
    │                          │  │ info     │    └──────────┘
    │ [ Close ]                │  │          │
    └──────────┬───────────────┘  └────┬─────┘
               │                       │
               │                       ▼
               │             ┌──────────────────┐
               │             │ Redirect to      │
               │             │ Dashboard        │
               │             │ (dashboard.html) │
               │             └──────────────────┘
               │                       │
               │                       ▼
               │             ┌──────────────────┐
               │             │ LOGIN SUCCESS ✅ │
               │             │ User is logged in│
               │             └──────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Modal remains visible    │
    │ User must close dialog   │
    │ or go to register        │
    │                          │
    │ User clicks "Close"      │
    │ or "Register Now"        │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Return to login page     │
    │ or go to register page   │
    │ (process loops)          │
    └──────────────────────────┘
```

---

## State Diagram

```
                    ┌─────────────────────────────┐
                    │   APPLICATION STARTS        │
                    └────────────┬────────────────┘
                                 │
                    ┌────────────▼─────────────┐
                    │   Admin Status: FALSE    │◄────────────┐
                    │   (Default State)        │             │
                    └────────┬────────────────┘             │
                             │                              │
                    ┌────────▼─────────┐      ┌──────────┐  │
                    │ LOGIN BLOCKED    │  OR  │ REGISTER │  │
                    │ (Error Modal)    │      │          │  │
                    └────────┬─────────┘      └────┬─────┘  │
                             │                     │        │
                             └─────────────────────┼────────┘
                                                   │
                           ┌───────────────────────▼──────────┐
                           │ First Registration Complete      │
                           │ Set: adminAccountCreated='true'  │
                           └───────────────────────┬──────────┘
                                                   │
                    ┌──────────────────────────────▼─────────┐
                    │  Admin Status: TRUE                    │
                    │  (Active State)                        │
                    └──────────────────────────────┬─────────┘
                                                   │
                    ┌──────────────────────────────▼──────────┐
                    │ LOGIN ALLOWED                          │
                    │ Normal authentication flow             │
                    └────────────────────────────────────────┘
```

---

## Decision Tree: Can User Login?

```
                    START: User attempts login
                            │
                            ▼
                ┌─────────────────────────────┐
                │ Check admin status in       │
                │ localStorage['admin...']    │
                └─────────┬─────────┬─────────┘
                          │         │
                      (undefined) │   ('false')
                          │         │
                    ┌─────▼─────────▼────┐
                    │ Admin NOT created  │
                    │ Set flag to false  │
                    │ Show ERROR modal   │
                    │ BLOCK LOGIN ❌     │
                    └────────────────────┘
                          │
                ┌─────────┴──────────────┐
                │ Admin Status = 'true'  │
                │ Check if set already   │
                │                        │
                └──────────┬─────────────┘
                           │
                    ┌──────▼──────┐
                    │ Proceed with│
                    │ normal      │
                    │ auth flow   │
                    │ ALLOW LOGIN │
                    │ (if creds   │
                    │  are valid) │
                    │ ✅          │
                    └─────────────┘
```

---

## Code Execution Flow

```
login.html loads
    │
    ▼
window.onload executes
    │
    ├─► initializeAdminStatus()
    │   └─► localStorage check
    │       └─► Set 'false' if not found
    │
    └─► switchLoginType('master')
        └─► Setup master login UI

User clicks Login
    │
    ▼
handleLogin() triggered
    │
    ├─► isAdminAccountCreated()
    │   └─► Check localStorage['adminAccountCreated']
    │       │
    │       ├─ If 'false' → showAdminNotCreatedError()
    │       │              └─► Create modal DOM
    │       │              └─► Insert into page
    │       │              └─► Return (STOP)
    │       │
    │       └─ If 'true' → Continue
    │
    ├─► Validate credentials
    ├─► Create session data
    └─► Redirect to dashboard
```

---

## Registration Flow

```
register.html form submitted
    │
    ▼
handleRegister() triggered
    │
    ├─► Validate form inputs
    ├─► Check for duplicates
    │
    ├─► Create user object
    ├─► Get existing users from localStorage
    ├─► Push new user to array
    ├─► Save updated array to localStorage
    │
    ├─► Check: Is users.length === 1?
    │
    ├─ YES (First Registration)
    │  └─► setAdminAccountCreated()
    │      └─► localStorage['adminAccountCreated'] = 'true'
    │      └─► Show: "Admin account created"
    │
    ├─ NO (Subsequent Registration)
    │  └─► Show: "Registration successful"
    │
    └─► Redirect to login.html
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│ Browser Storage (localStorage)                      │
│                                                     │
│ adminAccountCreated: 'false' or 'true'             │
│ registeredUsers: [                                  │
│   {                                                │
│     fullName: "...",                               │
│     officerId: "...",                              │
│     email: "...",                                  │
│     username: "...",                               │
│     password: "...",                               │
│     rank: "...",                                   │
│     station: "...",                                │
│     registeredDate: "ISO string"                   │
│   }                                                │
│ ]                                                  │
└────────────┬──────────────────────┬────────────────┘
             │                      │
             │                      │
    ┌────────▼────────┐  ┌──────────▼─────────┐
    │ login.js        │  │ register.js        │
    │ Reads/Writes:   │  │ Reads/Writes:      │
    │ • admin...      │  │ • admin...         │
    │ • regular auth  │  │ • users list       │
    └────────────────┘  │ • marked admin on  │
                        │   first register   │
                        └────────────────────┘
```

---

## Testing Scenarios

### Scenario 1: First-Time User Experience
```
1. User opens login.html
2. Try to login ─► ERROR: Admin not created
3. Click Register ─► Go to register.html
4. Fill form ─► Submit
5. First registration detected ─► Admin = TRUE
6. Redirect to login ─► Can now login ✅
```

### Scenario 2: Second User
```
1. User opens login.html
2. Try to login ─► Check localStorage
3. Admin = TRUE ─► Proceed to auth
4. Check credentials ─► Login success ✅
```

### Scenario 3: Testing Reset
```
1. Open DevTools (F12)
2. Console: localStorage.setItem('adminAccountCreated', 'false')
3. Reload page
4. Try to login ─► ERROR: Admin not created ✅
```

---

This diagram provides a complete visual representation of the admin account creation and validation system flow.
