# 📱 Pages Overview - Module 1 Frontend

## 🎨 Design System

- **Primary Color**: `#1e40af` (Deep Blue)
- **Font**: Inter (Google Fonts)
- **Style**: Modern, Clean, Professional
- **Layout**: Two-column (desktop), Single-column (mobile)

---

## 1️⃣ Login Page (`/login`)

### URL
```
http://localhost:3000/login
```

### Features
- ✅ Email input with icon
- ✅ Password input with show/hide toggle
- ✅ Role selection (Buyer/Seller) with visual cards
- ✅ "Forgot Password" link
- ✅ Tab switcher (Login/Sign Up)
- ✅ Error message display
- ✅ Loading state on submit
- ✅ Link to register page
- ✅ Branding panel (left side on desktop)

### Layout
```
┌─────────────────────────────────────────────────┐
│  [Desktop View - Two Columns]                   │
├──────────────────────┬──────────────────────────┤
│                      │                          │
│  🚀 BizBhar          │   Welcome Back           │
│                      │   ┌──────┬──────┐        │
│  Empowering Global   │   │Login │SignUp│        │
│  Commerce            │   └──────┴──────┘        │
│                      │                          │
│  [Branding Content]  │   Select account type:   │
│  [Pattern Background]│   ┌──────┬──────┐        │
│                      │   │🛍️ Buyer│🏪 Seller│    │
│  50k+ Businesses     │   └──────┴──────┘        │
│                      │                          │
│                      │   📧 Email Address       │
│                      │   [input field]          │
│                      │                          │
│                      │   🔒 Password            │
│                      │   [input field] 👁️       │
│                      │                          │
│                      │   [Continue →]           │
│                      │                          │
│                      │   Don't have account?    │
│                      │   Sign up here           │
└──────────────────────┴──────────────────────────┘
```

### Mobile View
```
┌─────────────────────┐
│   Welcome Back      │
│   ┌──────┬──────┐   │
│   │Login │SignUp│   │
│   └──────┴──────┘   │
│                     │
│   Select type:      │
│   ┌──────┬──────┐   │
│   │Buyer │Seller│   │
│   └──────┴──────┘   │
│                     │
│   📧 Email          │
│   [input]           │
│                     │
│   🔒 Password       │
│   [input] 👁️        │
│                     │
│   [Continue →]      │
│                     │
│   Sign up here      │
└─────────────────────┘
```

---

## 2️⃣ Register Page (`/register`)

### URL
```
http://localhost:3000/register
```

### Features
- ✅ Email input with validation
- ✅ Password input with show/hide toggle
- ✅ Confirm password field
- ✅ Role selection (Buyer/Seller)
- ✅ Tab switcher (Login/Sign Up)
- ✅ Password strength validation
- ✅ Error message display
- ✅ Loading state on submit
- ✅ Link to login page
- ✅ Branding panel (left side on desktop)

### Layout
```
┌─────────────────────────────────────────────────┐
│  [Desktop View - Two Columns]                   │
├──────────────────────┬──────────────────────────┤
│                      │                          │
│  🚀 BizBhar          │   Create Account         │
│                      │   ┌──────┬──────┐        │
│  Join Our Growing    │   │Login │SignUp│        │
│  Community           │   └──────┴──────┘        │
│                      │                          │
│  [Branding Content]  │   Select account type:   │
│  [Pattern Background]│   ┌──────┬──────┐        │
│                      │   │🛍️ Buyer│🏪 Seller│    │
│  50k+ Businesses     │   └──────┴──────┘        │
│  Join them today     │                          │
│                      │   📧 Email Address       │
│                      │   [input field]          │
│                      │                          │
│                      │   🔒 Password            │
│                      │   [input field] 👁️       │
│                      │                          │
│                      │   🔒 Confirm Password    │
│                      │   [input field]          │
│                      │                          │
│                      │   [Create Account →]     │
│                      │                          │
│                      │   Already have account?  │
│                      │   Login here             │
└──────────────────────┴──────────────────────────┘
```

---

## 3️⃣ Profile Page (`/profile`)

### URL
```
http://localhost:3000/profile
```

### Features
- ✅ User avatar placeholder
- ✅ Email display
- ✅ Role badge (Buyer/Seller)
- ✅ Verified status badge
- ✅ Account information grid
- ✅ Quick action cards
- ✅ Success message
- ✅ Logout button
- ✅ Gradient header
- ✅ Protected route (requires login)

### Layout
```
┌─────────────────────────────────────────────────┐
│  Header                                         │
│  🚀 BizBhar                        [Logout 🚪]  │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│  [Gradient Blue Background]                     │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│                                                 │
│     👤                                          │
│   [Avatar]                                      │
│                                                 │
│   user@example.com                              │
│   [🛍️ BUYER] [✅ Verified]                      │
│                                                 │
│   Account Information                           │
│   ┌──────────────┬──────────────┐              │
│   │ 📧 Email     │ 👤 Account   │              │
│   │ user@ex.com  │ BUYER        │              │
│   └──────────────┴──────────────┘              │
│   ┌──────────────┬──────────────┐              │
│   │ ✅ Status    │ 📅 Member    │              │
│   │ Active       │ Feb 17, 2026 │              │
│   └──────────────┴──────────────┘              │
│                                                 │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│  ✅ Authentication Successful!                  │
│  You have successfully logged in to your        │
│  BizBhar account. Your JWT token is securely    │
│  stored in localStorage.                        │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│  Quick Actions                                  │
│  ┌──────────┬──────────┬──────────┐            │
│  │ 👤 Edit  │ 🔒 Security│ ⚙️ Settings│         │
│  │ Profile  │ Change pwd│ Preferences│         │
│  └──────────┴──────────┴──────────┘            │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Color Palette

```
Primary Blue:     #1e40af  ███████
Primary Light:    #eff6ff  ███████
Background:       #f0f4f8  ███████
Success Green:    #10b981  ███████
Error Red:        #ef4444  ███████
Text Dark:        #1e293b  ███████
Text Light:       #64748b  ███████
```

---

## 🔄 User Flow

```
Start
  │
  ├─→ Visit Site (/)
  │     │
  │     └─→ Redirect to /login
  │
  ├─→ New User?
  │     │
  │     ├─→ Click "Sign Up" tab
  │     ├─→ Fill registration form
  │     ├─→ Select role (Buyer/Seller)
  │     ├─→ Submit
  │     └─→ Auto-redirect to /profile ✅
  │
  ├─→ Existing User?
  │     │
  │     ├─→ Fill login form
  │     ├─→ Select role
  │     ├─→ Submit
  │     └─→ Redirect to /profile ✅
  │
  └─→ View Profile
        │
        ├─→ See user info
        ├─→ JWT stored in localStorage
        └─→ Click logout → back to /login
```

---

## 🔐 Authentication Flow

```
User Action          Frontend              Backend
───────────         ──────────            ──────────
Register            
  │                 
  ├─→ Fill form     
  │                 
  ├─→ Submit ───────→ POST /api/auth/register
  │                                        │
  │                                        ├─→ Validate
  │                                        ├─→ Hash password
  │                                        ├─→ Save to DB
  │                                        └─→ Generate JWT
  │                 
  ←─────────────────── { token, email, role }
  │                 
  ├─→ Store token in localStorage
  ├─→ Store user data
  └─→ Redirect to /profile ✅

Login
  │
  ├─→ Fill form
  │
  ├─→ Submit ───────→ POST /api/auth/login
  │                                        │
  │                                        ├─→ Find user
  │                                        ├─→ Verify password
  │                                        └─→ Generate JWT
  │
  ←─────────────────── { token, email, role }
  │
  ├─→ Store token in localStorage
  ├─→ Store user data
  └─→ Redirect to /profile ✅

Access Protected Route
  │
  ├─→ Try /profile
  │
  ├─→ Check localStorage for token
  │     │
  │     ├─→ Token exists? → Show profile ✅
  │     └─→ No token? → Redirect to /login ❌
```

---

## 📱 Responsive Breakpoints

```
Mobile:     < 768px   (Single column)
Tablet:     768-1024px (Optimized layout)
Desktop:    > 1024px   (Two columns with branding)
```

---

## ✨ Interactive Elements

### Buttons
- **Primary**: Blue background, white text, shadow
- **Secondary**: White background, border, gray text
- **Hover**: Darker shade, slight scale
- **Loading**: Disabled state with spinner

### Inputs
- **Default**: Gray border, rounded corners
- **Focus**: Blue ring, blue border
- **Error**: Red border, red text below
- **With Icon**: Left padding for icon

### Cards
- **Default**: White background, subtle shadow
- **Hover**: Lift effect (translateY)
- **Selected**: Blue border, blue background

---

## 🎯 Accessibility Features

- ✅ Semantic HTML elements
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ High contrast ratios
- ✅ Responsive font sizes

---

**All pages are production-ready and fully functional! 🚀**
