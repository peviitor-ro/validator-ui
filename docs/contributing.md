# Contributing Guide

Thank you for your interest in contributing to Validator-UI! This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Requirements](#documentation-requirements)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Review Process](#review-process)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone. We expect all contributors to:

- Be respectful and considerate
- Use welcoming and inclusive language
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory comments
- Personal or political attacks
- Publishing others' private information
- Any conduct that could be considered inappropriate

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- Git
- A GitHub account
- Basic knowledge of React, JavaScript, and Git

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/validator-ui.git
   cd validator-ui/validator-ui
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/peviitor-ro/validator-ui.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Verify everything works**
   ```bash
   npm run lint
   npm test
   ```

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow the project's coding standards
- Add tests for new functionality
- Update documentation as needed
- Keep commits focused and atomic

### 3. Test Your Changes

Before submitting:

```bash
# Run linting
npm run lint

# Run tests
npm test

# Build to ensure no build errors
npm run build

# Test in Storybook (for component changes)
npm run storybook
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

See [Commit Message Guidelines](#commit-message-guidelines) for details.

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Fill out the PR template (see below)
4. Link any related issues
5. Request reviews from maintainers

## Pull Request Process

### PR Template

When creating a pull request, include:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Related Issues
Closes #123
Relates to #456

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
Add screenshots for UI changes

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed
- [ ] Storybook stories added/updated

## Documentation
- [ ] Code comments added/updated
- [ ] README updated (if needed)
- [ ] Documentation in docs/ updated (if needed)
- [ ] Storybook documentation updated (if needed)

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged
```

### PR Requirements

Before your PR can be merged:

1. ✅ All tests must pass
2. ✅ Code must be linted without errors
3. ✅ At least one approval from a maintainer
4. ✅ All review comments addressed
5. ✅ Documentation updated (if applicable)
6. ✅ No merge conflicts with main branch

### Review Process

1. **Initial Review** (1-3 days): Maintainers will review your PR
2. **Feedback**: Address any requested changes
3. **Re-review**: Request re-review after making changes
4. **Approval**: Once approved, maintainer will merge
5. **Merge**: Your contribution is now part of the project!

## Coding Standards

### General Guidelines

1. **Code Style**
   - Use ESLint and Prettier configurations
   - Run `npm run lint` before committing
   - Use meaningful variable and function names
   - Keep functions small and focused

2. **JavaScript/React Best Practices**
   - Use functional components with hooks
   - Destructure props in function signature
   - Use PropTypes for type checking
   - Follow React best practices and patterns

3. **File Organization**
   - Keep related files together
   - Use index.js for barrel exports
   - Follow the existing project structure

### Code Examples

#### ✅ Good Example

```jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Button component with multiple variants.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Button text
 * @param {Function} props.onClick - Click handler
 * @param {'primary' | 'secondary'} props.variant - Button style
 */
export function Button({ label, onClick, variant = 'primary' }) {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClick = async () => {
        setIsLoading(true);
        try {
            await onClick();
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <button 
            onClick={handleClick}
            disabled={isLoading}
            className={`btn btn-${variant}`}
        >
            {isLoading ? 'Loading...' : label}
        </button>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary']),
};
```

#### ❌ Bad Example

```jsx
// No imports, no PropTypes, unclear naming, no documentation
export function btn(props) {
    const [x, setX] = useState(false);
    return (
        <button onClick={() => {
            setX(true);
            props.onClick();
            setX(false);
        }}>
            {props.label}
        </button>
    );
}
```

### CSS/Styling

- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Use existing design tokens and colors
- Keep custom CSS to a minimum

```jsx
// ✅ Good - Tailwind utilities
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me
</button>

// ❌ Bad - Inline styles
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
    Click me
</button>
```

## Testing Guidelines

### Test Coverage

Aim for good test coverage, especially for:
- Critical user flows (authentication, data submission)
- Reusable components
- Utility functions
- Custom hooks

### Writing Tests

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    it('renders with correct label', () => {
        render(<Button label="Click me" onClick={() => {}} />);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
    
    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<Button label="Click" onClick={handleClick} />);
        
        fireEvent.click(screen.getByText('Click'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    it('shows loading state during async operation', async () => {
        const handleClick = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
        render(<Button label="Click" onClick={handleClick} />);
        
        fireEvent.click(screen.getByText('Click'));
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Documentation Requirements

### Code Documentation

1. **JSDoc Comments**: Add JSDoc comments to all components and functions
2. **Inline Comments**: Explain complex logic
3. **README Updates**: Update README if adding new features
4. **API Documentation**: Update docs/api.md for API changes

### Component Documentation

For new components, create a Storybook story:

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
    },
};

export const Secondary = {
    args: {
        label: 'Secondary Button',
        variant: 'secondary',
    },
};
```

### Documentation Files

Update these files as needed:
- `README.md` - Project overview and setup
- `docs/architecture.md` - Architecture changes
- `docs/components-guidelines.md` - Component patterns
- `docs/api.md` - API endpoints
- `docs/contributing.md` - This file

## Commit Message Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
# Feature
git commit -m "feat(auth): add password reset functionality"

# Bug fix
git commit -m "fix(jobs): correct date formatting in job list"

# Documentation
git commit -m "docs: update API documentation for new endpoints"

# Refactoring
git commit -m "refactor(components): simplify Button component logic"

# Breaking change
git commit -m "feat(api): migrate to new authentication API

BREAKING CHANGE: Old auth endpoints removed, update to new endpoints"
```

### Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor" not "moves cursor")
- Keep the subject line under 50 characters
- Separate subject from body with a blank line
- Wrap body at 72 characters
- Explain what and why, not how

## Review Process

### What Reviewers Look For

1. **Code Quality**
   - Follows coding standards
   - Well-structured and readable
   - Appropriate abstractions

2. **Functionality**
   - Solves the problem correctly
   - Handles edge cases
   - No breaking changes (unless intentional)

3. **Testing**
   - Adequate test coverage
   - Tests are meaningful
   - All tests pass

4. **Documentation**
   - Code is well-commented
   - Documentation updated
   - Clear commit messages

5. **Performance**
   - No unnecessary re-renders
   - Efficient algorithms
   - Proper memoization

### Responding to Review Comments

- Address all comments
- Ask questions if unclear
- Mark conversations as resolved when done
- Request re-review when ready

### Review Etiquette

**For Contributors:**
- Be patient with review feedback
- Don't take criticism personally
- Ask for clarification if needed
- Thank reviewers for their time

**For Reviewers:**
- Be constructive and respectful
- Explain the "why" behind suggestions
- Acknowledge good work
- Be timely with reviews

## Common Pitfalls

### Things to Avoid

1. ❌ **Large Pull Requests**
   - Keep PRs focused and small
   - Break large features into smaller PRs

2. ❌ **Mixing Concerns**
   - Don't mix refactoring with feature additions
   - One PR should have one purpose

3. ❌ **Ignoring Tests**
   - Always add tests for new features
   - Update tests for changed functionality

4. ❌ **Poor Commit Messages**
   - Avoid vague messages like "fix bug" or "update code"
   - Be specific and descriptive

5. ❌ **Skipping Documentation**
   - Update documentation with your changes
   - Add comments for complex logic

## Community

### Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and discussions
- **Pull Request Comments**: For PR-specific questions

### Reporting Bugs

When reporting bugs, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, Node version
6. **Screenshots**: If applicable

### Suggesting Features

When suggesting features:

1. **Use Case**: Explain the problem it solves
2. **Proposed Solution**: Your idea for implementation
3. **Alternatives**: Other solutions considered
4. **Impact**: Who benefits from this feature

## Recognition

Contributors who make significant contributions will be:
- Listed in the project's contributors
- Mentioned in release notes
- Acknowledged in the README

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Questions?

If you have questions not covered in this guide:
- Check existing issues and discussions
- Ask in a new discussion
- Reach out to maintainers

## Thank You!

Thank you for contributing to Validator-UI! Your efforts help make this project better for everyone.

---

**Remember**: Every contribution matters, no matter how small. Whether it's fixing a typo, reporting a bug, or adding a major feature, we appreciate your help!
