# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Build and Development:**
- `npm start` - Start development server on http://localhost:3000
- `npm run build` - Build production bundle
- `npm test` - Run tests in interactive watch mode

**No additional linting or type checking commands are configured** - the project uses Create React App's built-in ESLint configuration.

## Architecture Overview

This is a **React TypeScript banking UI application** built with Create React App. The codebase follows a **component-based architecture** with clear separation of concerns.

### Key Architecture Patterns

**Styling System:**
- Uses `Tailwind CSS` for utility-first styling
- Custom design tokens configured in `tailwind.config.js` (brand colors, shadows, spacing)
- Responsive design with mobile-first approach using Tailwind breakpoints
- Component variants implemented through utility class composition

**Component Organization:**
- **UI Components** (`src/components/ui/`): Reusable design system components (Button, Card, Icon, Avatar)
- **Feature Components** (`src/components/dashboard/`): Business logic components (Dashboard, CreditCard, TransactionList, etc.)
- **Layout Components** (`src/components/layout/`): App structure (Layout, Header, Sidebar)
- **Auth Components** (`src/components/auth/`): Authentication forms with react-hook-form + yup validation

**Data Layer:**
- **API Integration**: Connected to Spring Boot user-service running on `http://localhost:8081`
- **Authentication**: JWT-based auth with token stored in localStorage
- **API Services**: `src/services/authService.ts` and `src/services/userService.ts`
- **State Management**: React Context (`AuthContext`) for user authentication state
- **Mock Data**: Dashboard still uses mock data from `src/data/mockData.ts` (to be replaced with real banking APIs)

**State Management:**
- **Authentication State**: React Context (`AuthContext`) for user auth and profile data
- **Local State**: Uses React's built-in state management (useState) for component state
- **Form State**: Managed by react-hook-form with yup validation
- **API State**: No global state management library - API calls managed through services

**Layout System:**
- Responsive design with mobile-first approach
- Sidebar collapses to overlay on mobile/tablet
- Grid-based dashboard layout that stacks on smaller screens
- Uses CSS Grid and Flexbox for layouts

### Key Dependencies

**Core:**
- React 19.1.0 with TypeScript
- Tailwind CSS for styling
- react-router-dom for routing (configured but not actively used in current implementation)

**Forms & Validation:**
- react-hook-form for form management
- yup for schema validation
- @hookform/resolvers for yup integration

**Charts & Data Visualization:**
- chart.js + react-chartjs-2 for the balance chart

**Utilities:**
- date-fns for date formatting
- react-icons for icon system

### Current Limitations

- **No routing implemented** - single page application showing only dashboard
- **Partial API integration** - user authentication works, but dashboard still uses mock data
- **No state persistence** - auth token persists in localStorage, but other state is lost on refresh
- **Missing APIs** - needs integration with account, transaction, and banking service APIs

### Development Notes

**Component Patterns:**
- All components use TypeScript interfaces for props
- Utility-first approach with Tailwind CSS classes
- Component variants implemented through class composition functions
- Responsive design using Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- Custom brand colors available as `primary-brand`, `primary-brandDark`, `primary-brandLight`

**File Structure:**
- Each feature folder has an `index.ts` for clean imports
- Components are organized by feature/domain
- Types are centralized but could be co-located as the app grows

**API Integration:**
- **Base URL**: User service runs on `http://localhost:8081`
- **Authentication**: JWT tokens with automatic retry/refresh on 401 errors
- **Error Handling**: Centralized error handling in `src/config/api.ts`
- **Token Storage**: localStorage with automatic cleanup on logout/expiry

**Testing:**
- Testing setup exists but minimal tests written
- Uses @testing-library/react for component testing

**Development Workflow:**
- Start user-service backend on port 8081 before running frontend
- UI automatically redirects to login if not authenticated
- User profile data from API displayed in header after login