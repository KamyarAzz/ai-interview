# AI Interview Platform

An intelligent interview preparation platform powered by AI that helps users practice and improve their interview skills through interactive mock interviews.

## 🎯 Features

- **Interactive Mock Interviews**: Practice interviews with AI-powered questions tailored to your expertise and experience level
- **Customizable Interview Configuration**:
  - Set competencies and key skills to focus on
  - Specify years of experience
  - Define interview duration and time limits
- **Interview History**: Track and review your past interviews
- **User Authentication**: Secure login and signup with Firebase
- **Real-time Chat Interface**: Conversational interview experience with text-based interaction
- **Dark/Light Theme**: Toggle between dark and light themes for better user experience
- **Subscription Management**: Manage your subscription plans and features
- **User Dashboard**: Centralized dashboard to manage your interview sessions and settings

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Next-generation build tool for fast development
- **React Router 7** - Client-side routing and navigation
- **Zustand** - Lightweight state management library
- **TailwindCSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built with Radix UI
- **Radix UI** - Accessible UI component primitives

### Backend & Services

- **Firebase** - Authentication, Firestore database, and cloud services
- **Google Generative AI** (@google/genai) - AI-powered interview questions and responses

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher (or npm/yarn)
- A **Firebase project** with authentication and Firestore enabled
- **Google Cloud API credentials** for Generative AI access

## 🚀 Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-interview
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env` or `.env.local` file in the root directory with your Firebase and Google AI credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_AI_API_KEY=your_google_ai_key
```

### Development Server

Start the development server:

```bash
pnpm run dev
```

The application will be available at `http://127.0.0.1:5173/`

### Build

Build the project for production:

```bash
pnpm run build
```

### Preview

Preview the production build:

```bash
pnpm run preview
```

### Linting

Check code quality and style:

```bash
pnpm run lint
```

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── layout/             # Layout components (Navbar, Sidebar, etc.)
│   └── ui/                 # Basic UI components (Button, Input, etc.)
├── features/               # Feature-specific code
│   ├── auth/              # Authentication pages and components
│   ├── dashboard/         # Dashboard feature
│   ├── interview/         # Interview configuration and chat
│   ├── interview-history/ # Interview history
│   ├── settings/          # User settings
│   ├── subscriptions/     # Subscription management
│   └── theme/             # Theme-related components
├── lib/                    # Utility functions and services
│   ├── aiService.ts       # Google Generative AI integration
│   ├── firebase.ts        # Firebase configuration
│   └── utils.ts           # General utilities
├── stores/                 # Zustand state management
│   ├── authStore.ts       # Authentication state
│   ├── interviewContextStore.ts # Interview state
│   └── themeStore.ts      # Theme state
├── types/                  # TypeScript type definitions
│   ├── interview.ts       # Interview-related types
│   └── user.ts            # User-related types
├── app/
│   └── router.tsx         # React Router configuration
└── main.tsx               # Application entry point
```

## 🔄 State Management

The application uses **Zustand** for state management:

- **authStore**: Manages user authentication state
- **interviewContextStore**: Manages interview configuration and data
- **themeStore**: Manages dark/light theme preferences

## 🎨 Styling

- **TailwindCSS**: Utility-first CSS with custom configuration in `tailwind.config.ts`
- **Component Variants**: Using CVA for flexible and maintainable component styling
- **Dark Mode**: Built-in dark mode support with theme toggle

## 📝 Available Scripts

| Script             | Description                      |
| ------------------ | -------------------------------- |
| `pnpm run dev`     | Start development server         |
| `pnpm run build`   | Build for production             |
| `pnpm run lint`    | Run ESLint to check code quality |
| `pnpm run preview` | Preview production build         |

## 🔐 Authentication

The application uses Firebase Authentication with support for:

- Email/Password login and signup
- Session management
- Protected routes with `PrivateRoute` component

## 🤖 AI Integration

Interview questions and responses are powered by the Google Generative AI API, configured through:

- `lib/aiService.ts` - Service for AI interactions
- Interview context stored in Zustand for session management

## 🎯 Future Enhancements

- Video interview support
- Interview analytics and performance metrics
- Interview templates and best practices
- Peer review system
- Mobile app version

## 📄 License

This project is private and confidential. All rights reserved.

## 💬 Support

For issues, questions, or suggestions, please reach out to the development team.
