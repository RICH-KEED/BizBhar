# BizBhar Frontend - Module 1: Authentication System

This is the React frontend for the BizBhar Multi-Vendor Marketplace, implementing Module 1 (User Authentication & Roles).

## Features Implemented ✅

- **Login Page** (`/login`)
  - Email and password authentication
  - Role selection (Buyer/Seller)
  - JWT token storage in localStorage
  - Beautiful, modern UI with Tailwind CSS
  - Password visibility toggle
  - Error handling

- **Register Page** (`/register`)
  - User registration with email and password
  - Password confirmation validation
  - Role selection (Buyer/Seller)
  - Automatic login after registration
  - JWT token storage

- **Profile Page** (`/profile`)
  - Protected route (requires authentication)
  - Display user information
  - Account details
  - Logout functionality

- **Protected Routes**
  - ProtectedRoute component
  - Automatic redirect to login if not authenticated
  - JWT token validation

## Tech Stack

- **React 19** - UI Framework
- **React Router DOM** - Routing
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling
- **localStorage** - JWT Token Storage

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.js      # Route protection component
│   ├── pages/
│   │   ├── Login.js               # Login page
│   │   ├── Register.js            # Registration page
│   │   └── Profile.js             # User profile page
│   ├── services/
│   │   └── api.js                 # API service with axios
│   ├── utils/
│   │   └── auth.js                # Authentication utilities
│   ├── App.js                     # Main app with routes
│   ├── index.js                   # Entry point
│   └── index.css                  # Global styles with Tailwind
├── public/
│   └── stitch/                    # Static HTML designs
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`

3. **Make sure Backend is Running**
   The backend should be running on `http://localhost:8080`

## API Integration

The frontend connects to the following backend endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/profile` - Get user profile (protected)

### API Configuration

The API base URL is configured in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### JWT Token Handling

- Token is stored in `localStorage` after successful login/registration
- Token is automatically attached to all API requests via axios interceptor
- Token is removed on logout

## Authentication Flow

1. **Registration**
   - User fills registration form
   - Frontend sends POST request to `/api/auth/register`
   - Backend returns JWT token
   - Token stored in localStorage
   - User redirected to profile page

2. **Login**
   - User fills login form
   - Frontend sends POST request to `/api/auth/login`
   - Backend validates credentials and returns JWT token
   - Token stored in localStorage
   - User redirected to profile page

3. **Protected Routes**
   - ProtectedRoute component checks for token in localStorage
   - If no token, redirect to login page
   - If token exists, render protected component

4. **Logout**
   - Remove token from localStorage
   - Redirect to login page

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Testing the Application

### Manual Testing Steps

1. **Test Registration**
   - Go to `http://localhost:3000/register`
   - Fill in email, password, and select role
   - Click "Create Account"
   - Should redirect to profile page

2. **Test Login**
   - Go to `http://localhost:3000/login`
   - Enter registered email and password
   - Select role
   - Click "Continue"
   - Should redirect to profile page

3. **Test Protected Route**
   - Try accessing `http://localhost:3000/profile` without logging in
   - Should redirect to login page
   - Login and try again
   - Should show profile page

4. **Test Logout**
   - Click "Logout" button on profile page
   - Should redirect to login page
   - Try accessing profile page again
   - Should redirect to login page

## Environment Variables

No environment variables required for Module 1. The API URL is hardcoded in the api.js file.

For production, you may want to use environment variables:

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Next Steps (Future Modules)

- Module 2: Seller Onboarding & Dashboard
- Module 3: Product Management
- Module 4: Shopping Cart
- Module 5: Stripe Checkout
- Module 6: Order Management
- Module 7: Admin Dashboard
- Module 8: Reviews & Ratings

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure the backend has CORS configured properly for `http://localhost:3000`

### Backend Not Running
Make sure the Spring Boot backend is running on port 8080

### Token Not Persisting
Check browser's localStorage in DevTools > Application > Local Storage

## Design System

The UI uses a consistent design system:

- **Primary Color**: `#1e40af` (Deep Blue)
- **Font**: Inter (Google Fonts)
- **Border Radius**: Rounded corners (0.5rem)
- **Shadows**: Subtle shadows for depth
- **Responsive**: Mobile-first design

## License

Part of the BizBhar Multi-Vendor Marketplace project.
