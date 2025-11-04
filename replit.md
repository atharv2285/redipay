# Ashok Redi Billing App

## Overview

This is a Point of Sale (POS) billing application designed for Ashok Redi, a food and beverage establishment. The system enables fast item search, bill management, and transaction processing through a streamlined single-page interface. The application prioritizes speed and minimal cognitive load, following Material Design principles adapted for POS efficiency.

The tech stack includes React with TypeScript on the frontend, Express.js for the backend API, and uses Drizzle ORM with PostgreSQL for data persistence (currently using in-memory storage with plans for database integration).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling:**
- React 18 with TypeScript for type safety and component composition
- Vite as the build tool for fast development and optimized production builds
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching

**UI Component System:**
- Shadcn/ui component library based on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Design system follows "New York" style variant with neutral base colors
- Custom CSS variables for theming (light/dark mode support)
- Typography uses Manrope font (with Proxima Nova as preferred) for clarity

**State Management:**
- Local component state (useState) for UI interactions
- React Query for server data caching and synchronization
- No global state management library - keeping complexity minimal

**Key Design Decisions:**
- Single-page application (SPA) architecture for instant interactions
- Auto-focused search bar as the primary interaction point
- Keyboard navigation support for efficiency (arrow keys, enter, escape)
- Real-time autocomplete with debounced search queries
- Toast notifications for user feedback on actions

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for type-safe API development
- ESM module system for modern JavaScript features
- Custom middleware for request logging and JSON parsing

**API Structure:**
- RESTful endpoints under `/api` prefix
- GET `/api/menu-items` - Fetch all menu items
- GET `/api/menu-items/search?q=<query>` - Search menu items with query parameter
- Stateless API design with no session management currently

**Data Layer:**
- Storage abstraction through `IStorage` interface allowing swappable implementations
- Current implementation uses in-memory storage (`MemStorage`) with pre-seeded menu data
- Prices stored as integers (cents) to avoid floating-point arithmetic issues
- Menu items include: id (UUID), name (string), price (integer in cents)

**Development vs Production:**
- Development: Vite dev server with HMR for React components
- Production: Express serves static built files from `dist/public`
- Vite middleware integration in development for seamless full-stack experience

### Database Design

**Schema (Drizzle ORM):**
```typescript
menuItems table:
  - id: varchar (UUID primary key)
  - name: text (not null)
  - price: integer (not null, stored in cents)
```

**Design Rationale:**
- PostgreSQL dialect configured but currently using in-memory storage
- Prices as integers avoid JavaScript floating-point precision issues
- Simple schema optimized for read-heavy operations (POS use case)
- UUID identifiers for distributed system compatibility
- Drizzle-Zod integration for runtime type validation

**Migration Strategy:**
- Drizzle Kit configured for schema migrations
- Migration files stored in `/migrations` directory
- Database connection via `DATABASE_URL` environment variable
- Push-based migrations with `db:push` command

### External Dependencies

**UI Component Libraries:**
- Radix UI primitives (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, tooltip)
- Lucide React for consistent iconography
- class-variance-authority (CVA) for component variant management
- CMDK for command palette functionality
- Embla Carousel for carousel components

**Database & ORM:**
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for PostgreSQL connection (Neon Database provider)
- connect-pg-simple for PostgreSQL session store (future session management)

**Form Handling:**
- React Hook Form for form state management
- @hookform/resolvers for validation integration
- Zod for schema validation (via drizzle-zod)

**Utilities:**
- date-fns for date manipulation
- clsx and tailwind-merge for className management
- nanoid for unique ID generation

**Development Tools:**
- Replit-specific plugins for error overlays, cartographer, and dev banner
- TypeScript for static type checking
- PostCSS with Autoprefixer for CSS processing

**Third-Party Services:**
- Neon Database (PostgreSQL) for production database hosting
- Currently using environment variable `DATABASE_URL` for connection string

**Build & Runtime:**
- esbuild for server-side bundling in production
- tsx for TypeScript execution in development
- Node.js HTTP server for production deployment