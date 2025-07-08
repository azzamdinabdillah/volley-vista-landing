# Thunder Volleyball Team Website

## Overview

This is a modern, dynamic volleyball team landing page built as a static website using HTML, TailwindCSS, and Vite. The site showcases an elite volleyball team with a focus on international appeal and professional presentation. The project follows a mobile-first responsive design approach with emphasis on visual impact and team branding.

## System Architecture

### Frontend Architecture
- **Static Site Generation**: Pure HTML/CSS/JavaScript without frameworks
- **Build Tool**: Vite for development server and build optimization
- **Styling**: TailwindCSS for utility-first CSS framework
- **Icons**: Feather Icons for consistent iconography
- **Fonts**: Google Fonts (Inter, Poppins, Montserrat) for typography hierarchy

### Technology Stack
- **HTML5**: Semantic markup with accessibility considerations
- **TailwindCSS v4.1.11**: Utility-first CSS framework with custom configuration
- **Vite v6.3.5**: Build tool and development server
- **Vanilla JavaScript**: Client-side interactions and animations
- **CSS Animations**: Custom keyframe animations for enhanced UX

## Key Components

### Design System
- **Color Palette**: 
  - Primary: Deep Navy Blue (#1e3a8a)
  - Accent: Vibrant Orange (#f97316)
  - Supporting: Light Blue, Warm Gray, Success Green
- **Typography Hierarchy**:
  - Headings: Poppins font family
  - Body: Inter font family
  - Accent: Montserrat font family

### Page Sections
1. **Hero Section**: Full-screen impact with team branding and CTAs
2. **About Team**: Team story, mission, and achievements timeline
3. **Players Showcase**: Grid layout of player profiles with interactive cards
4. **Achievements & Trophies**: Visual trophy showcase and championships
5. **Navigation**: Responsive navbar with scroll effects and active link highlighting

### Interactive Features
- **Smooth Scrolling**: Enhanced navigation between sections
- **Parallax Effects**: Dynamic background movements
- **Counter Animations**: Animated statistics for achievements
- **Mobile Menu**: Responsive navigation for mobile devices
- **Form Validation**: Contact form with client-side validation
- **Hover Effects**: Interactive player cards and UI elements

## Data Flow

### Static Content Flow
1. HTML content is structured semantically with section-based layout
2. TailwindCSS utilities provide styling through class-based approach
3. JavaScript modules handle interactive behavior and animations
4. Vite processes and optimizes assets during build

### Client-Side Interactions
1. **Navigation**: Scroll-based navbar styling and active link updates
2. **Animations**: Intersection Observer API for scroll-triggered animations
3. **Mobile Experience**: Touch-friendly interactions and responsive behavior

## External Dependencies

### CDN Resources
- **TailwindCSS**: Delivered via CDN for rapid prototyping
- **Feather Icons**: Icon library loaded from unpkg CDN
- **Google Fonts**: Web fonts for typography (Inter, Poppins, Montserrat)

### Development Dependencies
- **Vite**: Local development server and build tooling
- **TailwindCSS**: CSS framework (also available locally)

### Asset Management
- Favicon and team assets stored in `/src/assets/`
- Images and media assets referenced through relative paths
- Build process optimizes and bundles all assets

## Deployment Strategy

### Build Configuration
- **Output Directory**: `dist/` for production builds
- **Assets Directory**: `assets/` for static resources
- **Source Maps**: Enabled for debugging in production
- **Host Configuration**: Configured for `0.0.0.0:5000` for development

### Hosting Requirements
- **Static Hosting**: Compatible with any static hosting service
- **No Server-Side Requirements**: Pure client-side application
- **CDN Friendly**: Optimized for content delivery networks

### Performance Considerations
- Optimized asset bundling through Vite
- Font preloading for improved loading times
- Responsive images and lazy loading potential
- Minified CSS and JavaScript in production builds

## Changelog

- July 08, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.