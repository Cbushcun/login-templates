# 🔐 Login Templates

A production-ready authentication system built with **Next.js 16**, featuring secure user registration, login, session management, and profile functionality. This project demonstrates modern full-stack development practices with a focus on security, clean architecture, and scalable design patterns.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Security Considerations](#-security-considerations)
- [Key Concepts Demonstrated](#-key-concepts-demonstrated)

---

## 🎯 Overview

This repository provides a complete authentication solution that can be used as a foundation for web applications requiring user management. It showcases industry-standard practices for handling user authentication, including secure password hashing, JWT-based session management, and a clean separation of concerns between the frontend and backend.

**Why This Project Stands Out:**
- Implements secure authentication patterns used in production applications
- Demonstrates proficiency in modern React and Next.js development
- Shows understanding of database design and MongoDB integration
- Follows clean code principles with modular, maintainable architecture

---

## ✨ Features

### 🔑 User Authentication
- **User Registration** — Secure account creation with username, email, and password validation
- **User Login** — Email/password authentication with secure credential verification
- **Session Management** — JWT-based access and refresh token system for persistent sessions

### 👤 User Profile Management
- **Profile View** — Display user information including name, title, and bio
- **Profile Editing** — Toggle-based edit mode for updating user details
- **Password Management** — Secure password change functionality

### 🛡️ Security Features
- **Password Hashing** — bcrypt encryption with salt rounds for secure password storage
- **HTTP-Only Cookies** — Secure token storage preventing XSS attacks
- **JWT Token System** — Short-lived access tokens (15 min) with long-lived refresh tokens (7 days)
- **Session Tracking** — IP address and user agent logging for security auditing

### 🎨 UI Components
- **Reusable Component Library** — Custom UI components built with Radix UI primitives
- **Responsive Design** — Mobile-friendly layouts using Tailwind CSS
- **Dark Mode Support** — CSS variables configured for light and dark themes
- **Form Components** — Accessible form fields with labels, inputs, and validation states

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) with App Router |
| **Language** | JavaScript (React 19) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/) |
| **Authentication** | [JWT](https://jwt.io/) (jsonwebtoken) |
| **Password Security** | [bcrypt](https://github.com/kelektiv/node.bcrypt.js) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Linting** | ESLint 9 |

---

## 🏗️ Architecture

The application follows a clean, layered architecture that separates concerns and promotes maintainability:

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│        (React Components, Pages, UI Components)              │
├─────────────────────────────────────────────────────────────┤
│                      API Layer                               │
│           (Next.js API Routes - /api/auth/*)                 │
├─────────────────────────────────────────────────────────────┤
│                    Business Logic                            │
│        (Authentication, Token Management, Cookies)           │
├─────────────────────────────────────────────────────────────┤
│                     Data Layer                               │
│             (MongoDB, Mongoose Models)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js      # Login endpoint
│   │   │   ├── register/route.js   # Registration endpoint
│   │   │   └── me/route.js         # Current user info endpoint
│   │   └── user/
│   │       └── update/route.js     # User profile update endpoint
│   ├── login/
│   │   ├── page.jsx                # Login page
│   │   └── login-form.jsx          # Login form component
│   ├── register/
│   │   ├── page.jsx                # Registration page
│   │   └── signup-form.jsx         # Registration form component
│   ├── profile/
│   │   ├── page.jsx                # Profile page
│   │   └── profile-page.jsx        # Profile management component
│   ├── globals.css                 # Global styles & CSS variables
│   ├── layout.jsx                  # Root layout
│   └── page.jsx                    # Home page
├── components/
│   └── ui/                         # Reusable UI components
│       ├── avatar.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── field.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── separator.jsx
│       ├── switch.jsx
│       └── tabs.jsx
├── lib/
│   ├── authenticate.js             # JWT validation utilities
│   ├── cookies.js                  # Cookie configuration
│   ├── db.js                       # Database connection & operations
│   ├── tokens.js                   # Token creation & management
│   └── utils.js                    # Utility functions
└── models/
    ├── Sessions.js                 # Session schema
    └── Users.js                    # User schema
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Cbushcun/login-templates.git
   cd login-templates
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 📡 API Reference

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.

**Request Body (FormData):**
| Field | Type | Required |
|-------|------|----------|
| `username` | string | Yes |
| `email` | string | Yes |
| `password` | string | Yes |

**Response:** Redirects to `/login` on success

---

#### POST `/api/auth/login`
Authenticate a user and create a session.

**Request Body (FormData):**
| Field | Type | Required |
|-------|------|----------|
| `email` | string | Yes |
| `password` | string | Yes |

**Response:** Sets `accessToken` and `refreshToken` cookies, redirects to `/profile`

---

#### GET `/api/auth/me`
Get current authenticated user information.

**Headers:** Requires `accessToken` cookie

**Response:**
```json
{
  "user": {
    "_id": "...",
    "username": "...",
    "email": "...",
    "name": "...",
    "title": "...",
    "bio": "...",
    "role": "user",
    "active": false
  }
}
```

---

## 🔒 Security Considerations

This project implements several security best practices:

| Practice | Implementation |
|----------|----------------|
| **Password Hashing** | bcrypt with 12 salt rounds |
| **Token Security** | HTTP-only, secure, SameSite=Strict cookies |
| **Token Expiry** | Access tokens expire in 15 minutes |
| **Session Tracking** | IP address and user agent stored per session |
| **Input Validation** | Server-side validation on all endpoints |
| **Environment Variables** | Sensitive data stored in `.env` files |

---

## 💡 Key Concepts Demonstrated

### Full-Stack Development
- **Server Components** — Leveraging Next.js App Router for server-side rendering
- **API Routes** — RESTful API design with Next.js route handlers
- **Database Integration** — MongoDB with Mongoose for data persistence

### React Best Practices
- **Component Composition** — Reusable, composable UI components
- **Controlled Components** — State management for form inputs
- **Conditional Rendering** — Toggle-based edit modes in profile

### Authentication Patterns
- **JWT Token Flow** — Access and refresh token architecture
- **Session Management** — Database-backed session tracking
- **Secure Cookie Handling** — Production-ready cookie configuration

### Modern CSS
- **Tailwind CSS** — Utility-first styling approach
- **CSS Variables** — Theme customization with design tokens
- **Responsive Design** — Mobile-first responsive layouts

### Code Quality
- **Modular Architecture** — Separation of concerns across layers
- **Utility Functions** — Reusable helper functions (e.g., `cn()` for class merging)
- **Consistent Styling** — shadcn/ui component patterns

---

## 📄 License

This project is open source and available for educational and portfolio purposes.

---

<p align="center">
  Built with ❤️ using Next.js, MongoDB, and modern web technologies
</p>
