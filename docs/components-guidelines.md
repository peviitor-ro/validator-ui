# Component Guidelines

## Overview

This document outlines the standards, patterns, and best practices for creating and maintaining React components in the Validator-UI project.

## Component Structure

### File Organization

Components should be organized as follows:

```
ComponentName/
├── ComponentName.jsx          # Main component file
├── ComponentName.test.jsx     # Unit tests
├── ComponentName.stories.jsx  # Storybook stories
├── index.js                   # Barrel export
└── styles.module.css          # Component-specific styles (if needed)
```

For simple components, a single file is acceptable:
```
ComponentName.jsx
```

### Naming Conventions

1. **Component Files**: PascalCase (e.g., `Button.jsx`, `UserProfile.jsx`)
2. **Component Names**: Match file name (e.g., `export function Button()`)
3. **Utility/Helper Files**: camelCase (e.g., `formatDate.js`)
4. **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)
5. **Props**: camelCase (e.g., `onClick`, `isDisabled`)

## Component Patterns

### Functional Components

All components should be functional components using hooks:

```jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Brief description of the component.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title text
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} The rendered component
 */
export function MyComponent({ title, onClick }) {
    const [state, setState] = useState(null);
    
    useEffect(() => {
        // Effect logic
    }, []);
    
    return (
        <div onClick={onClick}>
            <h1>{title}</h1>
        </div>
    );
}

MyComponent.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

MyComponent.defaultProps = {
    onClick: () => {},
};
```

### Component Types

#### 1. Presentational Components

Pure components that receive data via props and render UI:

```jsx
export function Card({ title, description, image }) {
    return (
        <div className="card">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
```

**Characteristics:**
- No side effects
- No data fetching
- Purely presentational
- Reusable across the application

#### 2. Container Components

Handle business logic, data fetching, and state management:

```jsx
export function UserContainer() {
    const { data, isLoading } = useUserQuery();
    
    if (isLoading) return <Loading />;
    
    return <UserProfile data={data} />;
}
```

**Characteristics:**
- Handle data fetching
- Manage local state
- Contain business logic
- Pass data to presentational components

#### 3. Page Components

Top-level route components:

```jsx
export function Homepage() {
    const { data } = useCompaniesQuery();
    
    return (
        <Layout>
            <Header />
            <CompanyList companies={data} />
        </Layout>
    );
}
```

#### 4. Layout Components

Define page structure and common elements:

```jsx
export function AppLayout({ children }) {
    return (
        <div className="app-layout">
            <Header />
            <Sidebar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
```

## Component API Design

### Props

#### Prop Guidelines

1. **Be Explicit**: Use descriptive prop names
2. **Use TypeScript/PropTypes**: Always define prop types
3. **Provide Defaults**: Use defaultProps for optional props
4. **Avoid Prop Drilling**: Use context or state management for deeply nested data
5. **Destructure Props**: Destructure in function signature for clarity

```jsx
// ✅ Good
function Button({ label, onClick, isDisabled = false, variant = 'primary' }) {
    return (
        <button 
            onClick={onClick} 
            disabled={isDisabled}
            className={`btn btn-${variant}`}
        >
            {label}
        </button>
    );
}

// ❌ Bad
function Button(props) {
    return (
        <button onClick={props.onClick}>
            {props.label}
        </button>
    );
}
```

#### Prop Types

Always define PropTypes for components:

```jsx
import PropTypes from 'prop-types';

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    icon: PropTypes.node,
    children: PropTypes.node,
};

Button.defaultProps = {
    isDisabled: false,
    variant: 'primary',
    icon: null,
    children: null,
};
```

### Children Patterns

#### 1. Simple Children

```jsx
function Card({ children }) {
    return <div className="card">{children}</div>;
}
```

#### 2. Compound Components

```jsx
export function GenericPage({ children }) {
    return <div className="page">{children}</div>;
}

GenericPage.Symbol = ({ icon }) => (
    <div className="symbol">{icon}</div>
);

GenericPage.Title = ({ text }) => (
    <h1>{text}</h1>
);

// Usage
<GenericPage>
    <GenericPage.Symbol icon={<Icon />} />
    <GenericPage.Title text="Title" />
</GenericPage>
```

#### 3. Render Props

```jsx
function DataLoader({ url, render }) {
    const { data, isLoading } = useFetch(url);
    
    if (isLoading) return <Loading />;
    return render(data);
}

// Usage
<DataLoader 
    url="/api/users" 
    render={(data) => <UserList users={data} />} 
/>
```

## Hooks Usage

### Built-in Hooks

#### useState

For local component state:

```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}
```

#### useEffect

For side effects:

```jsx
function UserProfile({ userId }) {
    useEffect(() => {
        // Fetch user data
        fetchUser(userId);
        
        // Cleanup function
        return () => {
            cancelFetch();
        };
    }, [userId]); // Dependencies
}
```

#### useMemo

For expensive computations:

```jsx
function ExpensiveComponent({ data }) {
    const processedData = useMemo(() => {
        return expensiveOperation(data);
    }, [data]);
    
    return <div>{processedData}</div>;
}
```

#### useCallback

For memoized callbacks:

```jsx
function Parent() {
    const handleClick = useCallback(() => {
        console.log('Clicked');
    }, []);
    
    return <Child onClick={handleClick} />;
}
```

### Custom Hooks

Custom hooks should start with "use" and encapsulate reusable logic:

```jsx
/**
 * Custom hook for fetching data
 */
function useUserData(userId) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchUser(userId)
            .then(setUser)
            .finally(() => setLoading(false));
    }, [userId]);
    
    return { user, loading };
}

// Usage
function UserProfile({ userId }) {
    const { user, loading } = useUserData(userId);
    
    if (loading) return <Loading />;
    return <div>{user.name}</div>;
}
```

## Styling

### TailwindCSS

Use Tailwind utility classes for styling:

```jsx
function Button({ variant }) {
    const baseClasses = 'px-4 py-2 rounded font-medium';
    const variantClasses = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    };
    
    return (
        <button className={`${baseClasses} ${variantClasses[variant]}`}>
            Click me
        </button>
    );
}
```

### Class Utilities

Use `clsx` or `tailwind-merge` for conditional classes:

```jsx
import clsx from 'clsx';

function Alert({ type, message }) {
    return (
        <div className={clsx(
            'p-4 rounded',
            type === 'error' && 'bg-red-100 text-red-800',
            type === 'success' && 'bg-green-100 text-green-800'
        )}>
            {message}
        </div>
    );
}
```

## State Management

### Local State (useState)

For UI-only state:

```jsx
function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                Toggle
            </button>
            {isOpen && <Menu />}
        </div>
    );
}
```

### Form State (React Hook Form)

For form management:

```jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = (data) => {
        console.log(data);
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} />
            {errors.email && <span>{errors.email.message}</span>}
            
            <input type="password" {...register('password')} />
            {errors.password && <span>{errors.password.message}</span>}
            
            <button type="submit">Login</button>
        </form>
    );
}
```

### Server State (TanStack Query)

For API data:

```jsx
import { useQuery } from '@tanstack/react-query';

function UserList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
    
    if (isLoading) return <Loading />;
    if (error) return <Error message={error.message} />;
    
    return (
        <ul>
            {data.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

### Global State (Zustand)

For application-wide state:

```jsx
import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    login: (user, token) => set({ user, token }),
    logout: () => set({ user: null, token: null }),
}));

// Usage
function Header() {
    const { user, logout } = useAuthStore();
    
    return (
        <header>
            <span>{user?.name}</span>
            <button onClick={logout}>Logout</button>
        </header>
    );
}
```

## Error Handling

### Error Boundaries

Wrap components that might throw errors:

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
    return (
        <div role="alert">
            <h2>Something went wrong</h2>
            <pre>{error.message}</pre>
        </div>
    );
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
    <MyComponent />
</ErrorBoundary>
```

### API Error Handling

```jsx
function DataComponent() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['data'],
        queryFn: fetchData,
        retry: 3,
        onError: (error) => {
            console.error('Failed to fetch data:', error);
        },
    });
    
    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;
    
    return <DataDisplay data={data} />;
}
```

## Accessibility

### Semantic HTML

Use semantic HTML elements:

```jsx
// ✅ Good
<button onClick={handleClick}>Click me</button>
<nav>...</nav>
<header>...</header>
<main>...</main>

// ❌ Bad
<div onClick={handleClick}>Click me</div>
```

### ARIA Attributes

Add ARIA attributes for accessibility:

```jsx
function Modal({ isOpen, onClose, title, children }) {
    return (
        <div 
            role="dialog" 
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <h2 id="modal-title">{title}</h2>
            {children}
            <button onClick={onClose} aria-label="Close modal">
                ×
            </button>
        </div>
    );
}
```

### Keyboard Navigation

Ensure keyboard accessibility:

```jsx
function MenuItem({ label, onClick }) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick();
                }
            }}
        >
            {label}
        </div>
    );
}
```

## Documentation

### JSDoc Comments

Document all components with JSDoc:

```jsx
/**
 * A button component with multiple variants.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Button label text
 * @param {Function} props.onClick - Click handler function
 * @param {'primary' | 'secondary' | 'danger'} props.variant - Button style variant
 * @param {boolean} [props.isDisabled=false] - Whether the button is disabled
 * @param {React.ReactNode} [props.icon] - Optional icon element
 * @returns {JSX.Element} The rendered button component
 *
 * @example
 * <Button 
 *   label="Save" 
 *   onClick={handleSave} 
 *   variant="primary"
 *   icon={<SaveIcon />}
 * />
 */
export function Button({ label, onClick, variant, isDisabled, icon }) {
    // Implementation
}
```

### Storybook Stories

Create stories for all reusable components:

```jsx
import { Button } from './Button';

export default {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
};

export const Primary = {
    args: {
        label: 'Primary Button',
        variant: 'primary',
        onClick: () => alert('Clicked'),
    },
};

export const Secondary = {
    args: {
        label: 'Secondary Button',
        variant: 'secondary',
    },
};

export const WithIcon = {
    args: {
        label: 'With Icon',
        icon: <Icon />,
    },
};
```

## Testing

### Component Tests

Test component behavior:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    it('renders with label', () => {
        render(<Button label="Click me" onClick={() => {}} />);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
    
    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<Button label="Click" onClick={handleClick} />);
        
        fireEvent.click(screen.getByText('Click'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    it('is disabled when isDisabled is true', () => {
        render(<Button label="Click" onClick={() => {}} isDisabled />);
        expect(screen.getByText('Click')).toBeDisabled();
    });
});
```

## Performance

### Optimization Techniques

1. **React.memo**: Prevent unnecessary re-renders
```jsx
export const ExpensiveComponent = React.memo(({ data }) => {
    return <div>{data}</div>;
});
```

2. **useMemo**: Memoize expensive computations
3. **useCallback**: Memoize callback functions
4. **Code Splitting**: Lazy load components
```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```

## Common Patterns

### Loading States

```jsx
function DataComponent() {
    const { data, isLoading } = useQuery(['data'], fetchData);
    
    if (isLoading) return <LoadingSpinner />;
    return <DataDisplay data={data} />;
}
```

### Empty States

```jsx
function List({ items }) {
    if (items.length === 0) {
        return <EmptyState message="No items found" />;
    }
    
    return items.map(item => <Item key={item.id} {...item} />);
}
```

### Conditional Rendering

```jsx
function UserProfile({ user }) {
    return (
        <div>
            {user?.avatar && <Avatar src={user.avatar} />}
            <h2>{user.name}</h2>
            {user.isVerified && <VerifiedBadge />}
        </div>
    );
}
```

## Best Practices

1. ✅ **Keep components small and focused**
2. ✅ **Use meaningful names**
3. ✅ **Extract reusable logic into custom hooks**
4. ✅ **Avoid prop drilling - use context or state management**
5. ✅ **Test critical functionality**
6. ✅ **Document complex components**
7. ✅ **Use TypeScript or PropTypes**
8. ✅ **Follow project styling conventions**
9. ✅ **Make components accessible**
10. ✅ **Optimize performance when necessary**

## Anti-patterns to Avoid

1. ❌ **Massive components** - Break them down
2. ❌ **Prop drilling through many levels**
3. ❌ **Mutating state directly**
4. ❌ **Missing key props in lists**
5. ❌ **Inline function definitions in render**
6. ❌ **Not handling loading/error states**
7. ❌ **Over-optimization** - Optimize when needed
8. ❌ **Mixing business logic with presentation**
9. ❌ **Not using semantic HTML**
10. ❌ **Ignoring accessibility**

## Resources

- [React Documentation](https://react.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [TailwindCSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [React Testing Library](https://testing-library.com/react)
