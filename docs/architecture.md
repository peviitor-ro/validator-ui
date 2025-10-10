# Architecture Guide

## Overview

Validator-UI is a single-page application (SPA) built with React that provides a user interface for managing job scraper configurations. The application follows modern React patterns and best practices, utilizing a component-based architecture with centralized state management and API integration.

## Technology Stack

### Core Technologies
- **React 18.2**: Component-based UI library with hooks
- **Vite 5.0**: Fast build tool and development server
- **React Router DOM 6.21**: Client-side routing

### State Management
- **Zustand 4.5**: Lightweight state management for global app state (auth, user data)
- **TanStack Query 5.18**: Server state management, caching, and data fetching
- **React Context**: For provider-based state sharing (auth, theme)

### Styling & UI
- **TailwindCSS 3.4**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible component primitives
- **Framer Motion**: Animation library
- **Heroicons & Lucide React**: Icon libraries

### Forms & Validation
- **React Hook Form 7.50**: Form state management
- **Yup & Zod**: Schema validation libraries

### Developer Tools
- **Storybook 8.1**: Component documentation and development
- **Vitest**: Unit testing framework
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Project Structure

```
validator-ui/
├── .storybook/              # Storybook configuration
│   ├── main.js              # Storybook setup and addons
│   └── preview.js           # Global decorators and parameters
│
├── public/                  # Static assets served as-is
│   └── manifest.json        # PWA manifest
│
├── src/
│   ├── assets/              # Static assets (images, icons, SVGs)
│   │   ├── icons/           # PNG/JPG icons
│   │   └── svgs/            # SVG files
│   │
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Base UI components (shadcn-style)
│   │   ├── Alert.jsx
│   │   ├── AnimatedCard.jsx
│   │   ├── Button.jsx
│   │   ├── Form.jsx
│   │   ├── GenericPage.jsx
│   │   ├── InputField/
│   │   ├── Loading.jsx
│   │   ├── LoadingPage.jsx
│   │   ├── Modal.jsx
│   │   ├── NotFoundRoute/
│   │   ├── SelectField.jsx
│   │   └── Spinner.jsx
│   │
│   ├── contexts/            # React context providers
│   │   └── AuthContext.jsx  # Authentication context
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── infiniteScroll.js
│   │
│   ├── layouts/             # Layout components
│   │   └── AppLayout/       # Main application layout
│   │
│   ├── pages/               # Page-level components
│   │   ├── account/         # Account management
│   │   │   ├── scraper/     # Scraper management pages
│   │   │   ├── Account.jsx
│   │   │   └── CompanyAccess.jsx
│   │   ├── auth/            # Authentication pages
│   │   │   ├── Authorize.jsx
│   │   │   ├── EmailConfirmation.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Unautorized.jsx
│   │   └── home/            # Main application pages
│   │       ├── components/  # Page-specific components
│   │       ├── Filespage.jsx
│   │       ├── Homepage.jsx
│   │       ├── JobsPage.jsx
│   │       └── Scraperpage.jsx
│   │
│   ├── routes/              # Routing configuration
│   │   ├── AuthGuard.jsx    # Protected route wrapper
│   │   ├── CaptchaProvider.jsx
│   │   ├── Router.jsx       # Main router setup
│   │   └── routes.js        # Route constants
│   │
│   ├── services/            # API services
│   │   ├── Api.js           # Axios instance configuration
│   │   ├── AxiosInterceptors.jsx
│   │   ├── auth/            # Authentication services
│   │   └── landing/         # Landing/main services
│   │
│   ├── store/               # Zustand stores
│   │
│   ├── lib/                 # Utility functions
│   │
│   ├── App.jsx              # Root application component
│   ├── AuthProvider.jsx     # Auth provider wrapper
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
│
├── test/                    # Test setup and utilities
│   └── setupTest.js         # Test environment configuration
│
├── docs/                    # Project documentation
│
├── .env.example             # Environment variable template
├── .eslintrc.cjs            # ESLint configuration
├── .prettierrc.json         # Prettier configuration
├── components.json          # shadcn/ui configuration
├── index.html               # HTML entry point
├── netlify.toml             # Netlify deployment config
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.mjs          # Vite build configuration
```

## Application Architecture

### Data Flow

```
┌─────────────┐
│   User UI   │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│  React Component │
└──────┬───────────┘
       │
       ├─────────────────────────┐
       │                         │
       ▼                         ▼
┌──────────────┐         ┌───────────────┐
│  Local State │         │  Global State │
│  (useState,  │         │   (Zustand)   │
│   useForm)   │         └───────────────┘
└──────────────┘                 │
       │                         │
       ▼                         ▼
┌──────────────────────────────────────┐
│         TanStack Query               │
│    (Server State Management)         │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────┐
│  API Service     │
│  (Axios)         │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Backend API     │
└──────────────────┘
```

### Authentication Flow

1. User submits credentials via Login page
2. Credentials sent to backend API via `PUBLIC_API`
3. Backend returns access token
4. Token stored in localStorage and Zustand store
5. `PRIVATE_API` automatically adds token to subsequent requests via interceptor
6. AuthGuard protects routes requiring authentication
7. Token validated on each protected route access

### Component Hierarchy

```
App
├── AuthProvider
│   └── Router
│       ├── Public Routes
│       │   ├── Login
│       │   ├── Authorize
│       │   └── EmailConfirmation
│       │
│       └── Protected Routes (AuthGuard)
│           └── AppLayout
│               ├── Header
│               ├── Navigation
│               └── Page Content
│                   ├── Homepage (Company List)
│                   ├── JobsPage
│                   ├── Scraperpage
│                   ├── Filespage
│                   └── Account
```

## Key Patterns and Conventions

### Component Patterns

1. **Functional Components with Hooks**: All components use functional syntax with React hooks
2. **Composition over Inheritance**: Components use composition pattern (e.g., GenericPage)
3. **Component Co-location**: Related files kept together (components with stories, tests)
4. **Props Validation**: PropTypes used for runtime type checking

### State Management Patterns

1. **Server State**: Managed by TanStack Query for API data
2. **Global Client State**: Managed by Zustand for auth, user preferences
3. **Local Component State**: Managed by useState for UI-only state
4. **Form State**: Managed by React Hook Form

### API Service Pattern

- **Two Axios Instances**:
  - `PUBLIC_API`: For unauthenticated requests (login, email confirmation)
  - `PRIVATE_API`: For authenticated requests (automatically adds auth token)
- **Interceptors**: Handle token injection and error responses
- **TanStack Query Hooks**: Abstract API calls (`useQuery`, `useMutation`)

### Routing Pattern

- Route paths defined as constants in `routes.js`
- Protected routes wrapped with `AuthGuard`
- Lazy loading for code splitting (if implemented)
- Navigation state preserved with React Router

## Design Patterns

### Container/Presentational Pattern

While not strictly separated, pages often follow this pattern:
- **Pages**: Handle data fetching, state, and business logic
- **Components**: Pure presentational components with props

### Custom Hooks Pattern

Custom hooks encapsulate reusable logic:
- `useInfiniteScroll`: Infinite scrolling implementation
- Query hooks: Abstraction over TanStack Query

### Render Props / Compound Components

Components like `GenericPage` use compound component pattern:
```jsx
<GenericPage>
  <GenericPage.Symbol icon={<Icon />} />
  <GenericPage.Title text="Title" />
  <GenericPage.Description text="Description" />
</GenericPage>
```

## Build and Deployment

### Build Process

1. **Development**: Vite dev server with HMR
2. **Production Build**: 
   - Vite bundles and optimizes code
   - TailwindCSS purges unused styles
   - Assets optimized and fingerprinted
3. **Output**: Static files in `dist/` directory

### Deployment Pipeline

```
Code Push → GitHub
     ↓
Netlify Build Trigger
     ↓
npm install
     ↓
npm run build
     ↓
Deploy to CDN
     ↓
Live Site
```

### Environment Configuration

- Development: Uses `.env` for local configuration
- Production: Environment variables set in Netlify dashboard

## Performance Considerations

### Optimization Techniques

1. **Code Splitting**: Route-based splitting with React Router
2. **Lazy Loading**: Components loaded on-demand
3. **Memoization**: React.memo, useMemo, useCallback for expensive operations
4. **Query Caching**: TanStack Query caches API responses
5. **Image Optimization**: Optimized assets in build process
6. **Bundle Optimization**: Vite tree-shaking and minification

### Performance Monitoring

- React DevTools Profiler
- Network tab for API call monitoring
- Lighthouse scores for production builds

## Security Considerations

1. **Authentication**: JWT token-based authentication
2. **Token Storage**: localStorage (consider httpOnly cookies for production)
3. **API Security**: CORS, rate limiting handled by backend
4. **Input Validation**: Client-side validation with Yup/Zod
5. **XSS Prevention**: React's built-in XSS protection
6. **reCAPTCHA**: Bot protection on forms

## Testing Strategy

### Test Types

1. **Unit Tests**: Individual component and hook testing
2. **Integration Tests**: Component interaction testing
3. **E2E Tests**: (To be implemented) Full user flow testing

### Testing Tools

- **Vitest**: Test runner
- **React Testing Library**: Component testing
- **Jest DOM**: Additional matchers

### Test Coverage

Focus areas:
- Critical user flows (auth, data submission)
- Reusable components
- Custom hooks
- Utility functions

## Future Considerations

### Planned Improvements

1. **TypeScript Migration**: Gradual migration to TypeScript
2. **E2E Testing**: Implement Playwright/Cypress tests
3. **Performance Monitoring**: Add analytics and error tracking
4. **PWA Features**: Offline support, service workers
5. **Accessibility**: WCAG 2.1 AA compliance
6. **Internationalization**: Multi-language support

### Scalability

- Component library extraction
- Micro-frontend architecture consideration
- GraphQL migration possibility
- Server-side rendering (SSR) evaluation

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
