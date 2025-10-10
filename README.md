# Validator-UI

[![Netlify Status](https://api.netlify.com/api/v1/badges/90a58bce-c449-4957-b91b-fde435b1fe9b/deploy-status)](https://app.netlify.com/sites/adminpeviitor/deploys)

A React-based web application for managing and validating job scraper configurations. Built with modern web technologies including React, Vite, TailwindCSS, and Storybook.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Development](#development)
  - [Available Scripts](#available-scripts)
  - [Project Structure](#project-structure)
  - [Code Quality](#code-quality)
- [Documentation](#documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Scraper Management**: Create, update, and delete job scraper configurations
- **Company Management**: Manage company profiles and job listings
- **Job Validation**: Validate and publish job postings
- **Authentication**: Secure user authentication and authorization
- **Component Library**: Reusable UI components documented with Storybook
- **Responsive Design**: Mobile-first responsive interface built with TailwindCSS

## 🛠 Tech Stack

- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: TailwindCSS 3.4 with custom animations
- **State Management**: Zustand 4.5 + TanStack Query 5.18
- **Routing**: React Router DOM 6.21
- **Form Management**: React Hook Form 7.50 with Yup/Zod validation
- **UI Components**: Radix UI, Heroicons, Lucide React
- **Documentation**: Storybook 8.1
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/peviitor-ro/validator-ui.git
cd validator-ui/validator-ui
```

2. Install dependencies:
```bash
npm install
```

### Environment Variables

Create a `.env` file in the `validator-ui` directory based on `.env.example`:

```env
VITE_BASE_URL=your_api_base_url
VITE_RECAPTCHA_KEY=your_recaptcha_key
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code linting
- `npm test` - Run tests with Vitest
- `npm run storybook` - Start Storybook documentation server on port 6006
- `npm run build-storybook` - Build static Storybook documentation
- `npm run chromatic` - Deploy Storybook to Chromatic

### Project Structure

```
validator-ui/
├── .storybook/          # Storybook configuration
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, SVGs
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   │   ├── account/     # Account management pages
│   │   ├── auth/        # Authentication pages
│   │   └── home/        # Main application pages
│   ├── routes/          # Routing configuration
│   ├── services/        # API services and queries
│   └── store/           # State management
├── test/                # Test utilities and setup
└── docs/                # Project documentation
```

For detailed architecture information, see [docs/architecture.md](docs/architecture.md)

### Code Quality

This project uses ESLint and Prettier for code quality and formatting. Before committing:

1. Run linting: `npm run lint`
2. Fix formatting issues automatically where possible
3. Ensure all tests pass: `npm test`

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Architecture Guide](docs/architecture.md) - Project structure and data flow
- [Component Guidelines](docs/components-guidelines.md) - Component standards and patterns
- [API Documentation](docs/api.md) - Backend endpoints and data contracts
- [Contributing Guide](docs/contributing.md) - How to contribute to the project

### Component Documentation

Component documentation is available via Storybook:
```bash
npm run storybook
```

Visit `http://localhost:6006` to browse interactive component documentation.

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Tests are written using Vitest and React Testing Library. Test files are located alongside their corresponding components with the `.test.jsx` extension.

## 🚢 Deployment

The application is automatically deployed to Netlify on every push to the main branch. 

Build for production:
```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/contributing.md) for details on:

- Code of conduct
- Development workflow
- Pull request process
- Coding standards
- Documentation requirements

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🔗 Links

- [Live Application](https://adminpeviitor.netlify.app/)
- [Storybook Documentation](https://www.chromatic.com/library?appId=<app-id>)
- [Issue Tracker](https://github.com/peviitor-ro/validator-ui/issues)

---

For questions or support, please open an issue in the GitHub repository.