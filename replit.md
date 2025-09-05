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

## Recent Changes (Sept 5, 2025)
- Installed all project dependencies via npm
- Configured Vite for Replit environment (host: 0.0.0.0, port: 5000, allowedHosts: true)
- Set up workflow for frontend development server
- Configured deployment settings for production (autoscale)
- Application running successfully with API credential error (expected)

## API Integration
The application uses the Adzuna API for job search functionality. Requires:
- VITE_ADZUNA_APP_ID
- VITE_ADZUNA_APP_KEY

## Deployment
- **Type**: Autoscale (stateless web application)
- **Build**: npm run build
- **Run**: npm run preview
- **Port**: 5000

## User Preferences
- Professional, modern interface
- Portuguese language support
- Dark theme with purple accent colors
- Responsive design for all devices