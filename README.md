# 🛒 Cockleboat E-Shop

[中文文档](./README.zh-CN.md)

A modern, feature-rich e-commerce platform built with React 18, TypeScript, and a comprehensive tech stack. This project serves as a learning platform for mastering modern frontend development practices, from architecture to deployment.

> **轻舟商城** - A technology product stores modeled after e-commerce projects like the Apple Store and Google Store

## ✨ Features

### Core Functionality

- 📦 **Product Catalog** - Grid/list view of products with images, names, prices, ratings, and sales data
- 🔍 **Multi-Criteria Filtering** - Filter by category, price range, rating, and product attributes
- 🔄 **Flexible Sorting** - Sort by price, sales volume, rating, and listing date
- 📄 **Pagination** - Navigate through product pages with URL state synchronization

### UI/UX Features

- 🎨 **Theme Support** - Light/dark mode toggle with system preference detection
- 🌍 **Internationalization** - Full i18n support (Chinese & English)
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🎭 **Loading States** - Skeleton screens and smooth transitions
- 🔒 **Authentication** - Complete login/logout flow with mock backend

### Technical Highlights

- 🏗️ **Monorepo Architecture** - Organized with pnpm workspaces
- 🎯 **Type Safety** - Full TypeScript coverage
- 📚 **Standardized Development** - Adhere to the ESLint + Prettier + Commitlint development process
- 🧩 **Component Library** - Built with shadcn/ui (Radix UI + Tailwind CSS)
- 🔧 **State Management** - Zustand for global state
- 🌐 **API Layer** - RESTful API service with Express mock backend
- 📊 **Data Modeling** - Shared types between frontend and backend

## 🏗️ Architecture

### Project Structure

\`\`\`
E-Shop/
├── apps/
│ ├── shop-web/ # Frontend React application
│ │ ├── src/
│ │ │ ├── components/ # UI components
│ │ │ │ ├── ui/ # Reusable UI primitives
│ │ │ │ ├── layout/ # Layout components
│ │ │ │ ├── auth/ # Authentication components
│ │ │ │ └── product/ # Product-specific components
│ │ │ ├── pages/ # Route pages
│ │ │ ├── services/ # API services
│ │ │ ├── stores/ # Zustand stores
│ │ │ ├── hooks/ # Custom React hooks
│ │ │ ├── i18n/ # Internationalization
│ │ │ └── utils/ # Utility functions
│ │ └── vite.config.ts
│ └── shop-api/ # Backend Express API (Mock)
│ ├── src/
│ │ ├── models/ # Data models
│ │ ├── mocks/ # Mock data generators
│ │ └── app.ts # Express server
│ └── package.json
├── packages/
│ └── shared/ # Shared types and models
│ ├── src/
│ │ ├── models/ # TypeScript interfaces
│ │ └── common/ # Common types
│ └── package.json
└── docs/ # Documentation
\`\`\`

### Tech Stack

#### Frontend (`shop-web`)

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (Radix UI primitives + Tailwind CSS)
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Lucide React
- **Internationalization**: i18next
- **Testing**: Vitest + React Testing Library

#### Backend (`shop-api`)

- **Runtime**: Node.js with ES Modules
- **Framework**: Express
- **Language**: TypeScript
- **Mock Data**: Faker.js
- **HTTP Client**: Native fetch

#### Shared (`@e-shop/shared`)

- **Purpose**: Shared TypeScript interfaces and types
- **Models**: Product, User, Authentication
- **Utilities**: Common type definitions

#### Development Tools

- **Package Manager**: pnpm (with workspaces)
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Commit Conventions**: Commitlint (Conventional Commits)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/E-Shop.git
   cd E-Shop
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Start the development servers:
   \`\`\`bash
   pnpm dev
   \`\`\`

This will start:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Available Scripts

\`\`\`bash
pnpm dev # Start all development servers
pnpm build # Build all packages for production
pnpm test # Run tests across all packages
pnpm lint # Lint all packages
pnpm format # Format code with Prettier
\`\`\`

## 📖 Usage

### Test Accounts

The mock API provides test accounts for authentication:

\`\`\`
Email: admin@admin.com
Password: admin
\`\`\`

### Product Categories

- **PC** - Laptops with attributes like Type, CPU, RAM, GPU
- **Phone** - Smartphones with Brand, Series, Storage options
- **Tablet** - Tablets with Brand, Size, Connectivity
- **Audio** - Headphones with Type, Connectivity, Features
- **Accessories** - Various accessories with Type and Compatibility

### Filtering & Sorting

1. **Category Selection**: Click on a category to filter products
2. **Attribute Filters**: Select specific attributes within a category
3. **Price Range**: Set minimum and maximum price
4. **Rating Filter**: Filter by minimum star rating
5. **Tags**: Filter by New, Hot, or Sale tags
6. **Sorting**: Sort by price, sales, rating, or date

## 🔧 Development

### Code Organization

The project follows a clean architecture with clear separation of concerns:

- **Components**: Reusable UI components following atomic design principles
- **Pages**: Route-level components
- **Services**: API communication layer
- **Stores**: Global state management
- **Hooks**: Custom React hooks for reusable logic
- **Utils**: Pure utility functions

### Key Design Patterns

1. **URL State Management**: Filter and pagination state synchronized with URL using `useSearchParams`
2. **Outlet Context**: Layout-to-page communication via React Router's outlet context
3. **Composition**: UI primitives composed into domain-specific components
4. **Type Safety**: Shared types ensure consistency between frontend and backend'

### Styling Approach

- **Tailwind CSS**: Utility-first CSS framework
- **CSS Custom Properties**: Theme variables for colors and spacing
- **Dark Mode**: CSS custom variant for dark theme support
- **Responsive**: Mobile-first responsive design

### State Management Strategy

- **URL State**: Filters, sorting, pagination (via `useSearchParams`)
- **Zustand Store**: Authentication state, global UI state
- **Component State**: Local UI state with `useState`
- **Outlet Context**: Layout-level functions (e.g., `scrollToTop`)

## 🎨 Design System

### Theme

The application supports light and dark themes with customizable accent colors. Theme preferences are persisted to localStorage.

### Components

All UI components are built on top of Radix UI primitives and styled with Tailwind CSS:

- **Button**: Multiple variants (default, destructive, outline, ghost, link)
- **Input**: Text inputs with validation states
- **Select**: Dropdown selects
- **Dialog/Sheet**: Modal and drawer components
- **Card**: Container component for content
- **Avatar**: User profile display
- **Badge**: Labels and tags
- **Pagination**: Page navigation controls
- **Star Rating**: Interactive and read-only rating display

## 🌐 API

### Endpoints

\`\`\`
GET /products # Get paginated product list
GET /products/:id # Get product by ID
POST /auth/login # User login
GET /auth/me # Get current user
\`\`\`

### Query Parameters

Product list supports extensive filtering:

\`\`\`
?page=1 # Page number
?pageSize=12 # Items per page
?category=PC # Product category
?minPrice=100 # Minimum price
?maxPrice=5000 # Maximum price
?minRating=4 # Minimum rating
?tags=New,Hot # Product tags
?cpu=Intel i7 # Category-specific attributes
?sort=price_asc # Sorting option
\`\`\`

## 📝 Contributing

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

\`\`\`
<type>(<scope>): <subject>

<body>

<footer>
\`\`\`

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Development Workflow

1. Create a feature branch
2. Make your changes
3. Run linting and tests
4. Commit with conventional format
5. Push and create a pull request

## 📚 Documentation

- [开发记录](./docs/开发记录/) - Development logs (Chinese)
- [整体说明与要求](./docs/整体说明与要求.md) - Assignment Instructions (Chinese)
- [学习计划与工作说明](./docs/学习计划与工作说明.md) - Arrange development tasks in phases (Chinese)
- [开发规划](./docs/开发规划.md) - UI Design/Requirement Analysis (Chinese)

## 🎯 Roadmap

### Implemented ✅

- [x] Pagination Display
- [x] Multi-criteria filtering
- [x] Product listing with grid layout
- [x] Simple authentication system
- [x] Theme switching (light/dark)
- [x] Internationalization (i18n)
- [x] Responsive design
- [x] Monorepo architecture

### Planned 🚧

- [ ] Sorting function
- [ ] Shopping cart functionality
- [ ] User favorites/wishlist
- [ ] Company Homepage Brochure
- [ ] Product detail page
- [ ] Order management
- [ ] AI-powered recommendations
- [ ] Virtual scrolling for large lists
- [ ] Advanced animations
- [ ] PWA support
- [ ] ……

## 📄 License

This project is for educational purposes.

## 👤 Author

**SuperSASS**

## 🙏 Acknowledgments

- shadcn/ui for the excellent component library
- Radix UI for accessible primitives
- Tailwind CSS for utility-first styling
- The React and TypeScript communities
- ByteDance Engineering Bootcamp Program

---

Built with ❤️ as a learning project for mastering modern frontend development
