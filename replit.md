# Career Quest - Job Search System

## Project Overview
A modern React + TypeScript application for searching programming jobs. The application integrates with external job APIs to provide an intelligent job search interface with filters and professional design.

## Current State
- **Status**: Successfully imported and configured for Replit
- **Frontend**: React 19 + TypeScript + Vite running on port 5000
- **Build System**: Vite with optimized configuration for Replit environment
- **State Management**: Zustand for job search state
- **API Integration**: Adzuna API for job data (requires credentials)

## Architecture
- **Frontend Server**: Vite dev server configured for Replit (0.0.0.0:5000, allowedHosts: true)
- **Components**: Modular React components for job listings, filters, and UI
- **Styling**: CSS modules with dark theme and professional design system
- **Data Flow**: Zustand store → API service → React components

## Recent Changes (Oct 1, 2025)
### Design Redesign - DevQuest AI Style
- Redesigned layout based on DevQuest AI website
- Changed color scheme from purple to green/cyan (#0CF2A0)
- Added "Powered by DevQuest AI" badge with sparkle icon
- Pure black background (#000000) with glass-morphism effects
- Updated typography using Inter font exclusively
- Hero section with green highlighted text
- Modern badge design with blur effects

### API Improvements
- Fixed search functionality using `what_or` parameter for OR logic
- Properly combines junior + estagiário searches (~1,915 results)
- Separate handling for job levels and technologies
- Uses `what_and` for technology filters

## API Integration
The application uses the Adzuna API for job search functionality:
- **Base search**: `what=desenvolvedor` (ensures tech jobs)
- **Levels**: `what_or=junior estagiário` (OR logic)
- **Tech**: `what_and=react python` (AND logic)
- **Credentials**: VITE_ADZUNA_APP_ID, VITE_ADZUNA_APP_KEY

## Deployment
- **Type**: Autoscale (stateless web application)
- **Build**: npm run build
- **Run**: npm run preview
- **Port**: 5000

## User Preferences
- DevQuest AI inspired design
- Portuguese language support
- Pure black theme with green/cyan accents (#0CF2A0)
- Inter font family
- Glass-morphism and blur effects
- Responsive design for all devices