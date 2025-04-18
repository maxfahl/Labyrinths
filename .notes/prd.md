# Product Requirements Document (PRD)

## Project: Labyrinth Generator App

### Overview
A web app that allows users to generate, customize, and export labyrinths/mazes suitable for all ages. Users can control the appearance, complexity, and type of maze, and save/view previous generations.

---

## Features & Controls

### Maze Generation Controls
- **Type**: Select maze style
  - Square
  - Round
  - Squiggly
  - Spaghetti
- **Size**: Width and height in pixels
- **Complexity**: 1–100 (higher = more complex, smaller corridors)
- **Line Color**: Color picker (if theme is custom)
- **Background Color**: Color picker (if theme is custom)
- **Seed**: Text/number input for reproducible randomization
- **Start/End Position**: Choose entrance and exit (corners, sides, random, or custom)
- **Wall Thickness**: Slider or input (px)
- **Maze Theme**:
  - Custom (user picks colors)
  - Print (black & white)
  - Predefined themes (set line/background colors)
- **Export/Download**: Download maze as PNG, SVG, or PDF

### Additional Features
- **Solution Path Toggle**: Show/hide the solution
- **Grid Overlay**: Toggle grid overlay
- **Animated Generation**: Option to animate maze creation
- **Accessibility Options**: High-contrast mode, font size
- **Custom Images**: Upload image for start/end marker
- **Print Mode**: Optimized for printing

### History & Persistence
- **Previous Generations**: Save all generated mazes with their settings, seed, and a preview image (JPG) in local storage
- **View/Restore**: List of previous mazes with preview, ability to restore settings and regenerate

---

## Implementation Checklist

### UI/UX
- [x] Design main layout and controls panel
- [x] Implement maze preview area
- [ ] Add controls for all maze parameters
- [ ] Add color pickers and theme selector
- [ ] Add export/download buttons
- [x] Add history panel for previous generations
- [ ] Add preview thumbnails for saved mazes

### Maze Generation
- [ ] Implement square maze generation
- [ ] Implement round maze generation
- [ ] Implement squiggly maze generation
- [ ] Implement spaghetti maze generation
- [ ] Add complexity, size, wall thickness, and seed support
- [ ] Add start/end position logic
- [ ] Add solution path toggle
- [ ] Add grid overlay option
- [ ] Add animated generation option

### Theming & Export
- [ ] Implement theme system (custom, print, predefined)
- [ ] Apply line/background color logic
- [ ] Implement export to PNG, SVG, PDF
- [ ] Implement print mode

### Persistence
- [ ] Save generated mazes (settings, seed, preview image) to local storage
- [ ] Display history with preview images
- [ ] Allow restoring previous mazes from history

### Hosting & Deployment
- [ ] Prepare for deployment (Vercel/Netlify)
- [ ] Add README with usage instructions

---

## Hosting Recommendation
- Use **Vercel** or **Netlify** for simple, free, and fast static React app hosting.

---

## Notes
- Use React (plain or with Vite/CRA for bundling)
- Render maze as SVG (for easy export and scaling)
- Use local storage for persistence
- Prioritize accessibility and mobile responsiveness
- Use ShadCN UI components for all form controls and UI elements for a modern, accessible, and consistent design

---

## Implementation Notes
- Use **Vercel** or **Netlify** for simple, free, and fast static React app hosting.
- Use **ShadCN UI components** for all form controls and UI elements for a modern, accessible, and consistent design.
- Render maze as SVG (for easy export and scaling)
- Use local storage for persistence
- Prioritize accessibility and mobile responsiveness 