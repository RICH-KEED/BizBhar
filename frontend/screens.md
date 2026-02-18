{
  "project": "BizBhar",
  "module": "Week 1 - User Authentication & Roles",
  "role": "Senior UI/UX Frontend Engineer",
  "tech_stack": {
    "frontend": "React 18",
    "styling": "Tailwind CSS",
    "routing": "React Router DOM",
    "http": "Axios"
  },
  "response_rule": {
    "allowed_responses": ["ok done", "error: <reason>"],
    "no_explanations": true
  },
  "design_system": {
    "font": "Inter",
    "colors": {
      "primary": "indigo-600",
      "primary_hover": "indigo-700",
      "background": "gray-100",
      "card": "white",
      "error": "red-500"
    },
    "styles": {
      "card": "max-w-md w-full bg-white shadow-lg rounded-xl p-6",
      "input": "w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500",
      "button": "w-full h-11 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition",
      "label": "text-sm text-gray-600",
      "heading": "text-2xl font-semibold"
    }
  },
  "file_structure": {
    "src": {
      "pages": ["Login.jsx", "Register.jsx", "Profile.jsx"],
      "components": ["Navbar.jsx", "ProtectedRoute.jsx"],
      "services": ["authService.js"],
      "root": ["App.jsx"]
    }
  },
  "screens": [
    {
      "name": "Login",
      "route": "/login",
      "layout": {
        "centered_card": true,
        "background": "gray-100"
      },
      "elements": [
        { "type": "logo", "text": "BizBhar" },
        { "type": "heading", "text": "Welcome Back" },
        { "type": "input", "label": "Email", "input_type": "email", "required": true },
        { "type": "input", "label": "Password", "input_type": "password", "required": true },
        { "type": "button", "text": "Login", "full_width": true },
        { "type": "link", "text": "Don’t have an account? Register", "redirect": "/register" }
      ],
      "validation": {
        "show_error_below_input": true,
        "disable_button_when_empty": true,
        "loading_spinner_inside_button": true
      }
    },
    {
      "name": "Register",
      "route": "/register",
      "layout": {
        "centered_card": true,
        "background": "gray-100"
      },
      "elements": [
        { "type": "logo", "text": "BizBhar" },
        { "type": "heading", "text": "Create Account" },
        { "type": "input", "label": "Email", "input_type": "email", "required": true },
        { "type": "input", "label": "Password", "input_type": "password", "required": true },
        { "type": "input", "label": "Confirm Password", "input_type": "password", "required": true },
        {
          "type": "select",
          "label": "Role",
          "options": ["BUYER", "SELLER"],
          "required": true
        },
        { "type": "button", "text": "Create Account", "full_width": true }
      ],
      "validation": {
        "password_mismatch_error": true,
        "required_field_errors": true,
        "disable_button_when_invalid": true
      }
    },
    {
      "name": "Profile",
      "route": "/profile",
      "protected": true,
      "layout": {
        "navbar": true,
        "user_info_card": true
      },
      "navbar": {
        "left": ["BizBhar"],
        "right": [
          { "type": "role_badge" },
          { "type": "button", "text": "Logout" }
        ]
      },
      "profile_card": {
        "fields": ["Email", "Role", "Member Since"]
      }
    }
  ],
  "auth_logic": {
    "store_jwt_in_localStorage": true,
    "axios_interceptor": "Authorization: Bearer <token>",
    "logout_removes_token": true,
    "redirect_after_logout": "/login"
  },
  "protected_route": {
    "component": "ProtectedRoute.jsx",
    "logic": "If no JWT in localStorage redirect to /login else render children"
  },
  "responsiveness": {
    "mobile_first": true,
    "card_padding": "p-6",
    "inputs_height": "h-11",
    "buttons_height": "h-11"
  },
  "restrictions": {
    "no_backend_code": true,
    "no_explanations": true,
    "only_generate_ui": true
  }
}
