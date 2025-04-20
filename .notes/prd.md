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
- **Seed**: Slider (0–99999) for reproducible randomization
- **Line Color**: Color picker (if theme is custom)
- **Background Color**: Color picker (if theme is custom)
- **Start/End Position**: Choose entrance and exit (corners, sides, random, or custom)
- **Wall Thickness**: Slider or input (px)
- **Maze Theme**:
  - Custom (user picks colors)
  - Print (black & white)
  - Predefined themes (set line/background colors)
- **Export/Download**: Download maze as PNG, SVG, or PDF

### Additional Features
- **Solution Path Toggle**: Show/hide the solution
- **Custom Images**: Upload image for start/end marker
- **Print Mode**: Optimized for printing

### History & Persistence
- **Previous Generations**: Save all generated mazes with their settings, seed, and a preview image (JPG) in local storage
- **View/Restore**: List of previous mazes with preview, ability to restore settings and regenerate

---

## Implementation Phases

### Phase 1: Project Setup & Core Layout
- [x] Scaffold project with Vite + React + Tailwind + ShadCN UI
- [x] Set up folder structure and import aliases
- [x] Implement main layout (header, controls panel, preview area)
- [x] Add initial ShadCN-based controls for type, size, and complexity
- [x] Responsive flexbox layout for full width/height
- [x] Set up Jest and Playwright for testing
- [x] Add initial smoke test (app loads, controls render)

### Phase 2: Core Maze Controls
- [x] Add controls for line color, background color, wall thickness
- [x] Add seed input
- [x] Add start/end position selector
- [x] Add maze theme selector (custom, print, predefined)
- [x] Add solution path toggle, grid overlay, animated generation
- [x] Add accessibility options (high-contrast, font size)
- [x] Add/expand Jest tests for new controls

### Phase 3: Maze Generation Logic
- [x] Implement square maze generation

### Phase 4: Theming, Export, and Print
- [x] Hide theme selector
- [x] Implement export to PNG, SVG, PDF
- [x] Implement print mode
- [x] Add Jest/Playwright tests for export/print

### Phase 5: History & Persistence
- [x] Save generated mazes with a name (settings, seed, preview image) to local storage
- [x] Display history with preview images
- [x] Allow restoring previous mazes from history
- [x] Add Jest/Playwright tests for history/persistence

### Phase 6: Final Polish & Deployment
- [ ] Polish UI/UX, accessibility
- [ ] Add README and usage instructions
- [ ] Prepare and deploy to Vercel/Netlify

### Phase 7: Additional Maze Types
- [ ] Implement round maze generation
  - [ ] Add/expand controls for round maze (Maze Type selector and round maze logic must NOT be added before Phase 7)
  - [ ] Add Jest unit tests for round maze
  - [ ] Add E2E tests for round maze
- [ ] Implement squiggly maze generation
  - [ ] Add/expand controls for squiggly maze
  - [ ] Add Jest unit tests for squiggly maze
  - [ ] Add E2E tests for squiggly maze
- [ ] Implement spaghetti maze generation
  - [ ] Add/expand controls for spaghetti maze
  - [ ] Add Jest unit tests for spaghetti maze
  - [ ] Add E2E tests for spaghetti maze

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
- **Testing:** Use Jest for unit/component tests and Playwright for E2E tests. Add and run tests at each major implementation step.
- **Development Methodology:** Follow Test-Driven Development (TDD) at every step—write tests before writing implementation code.
- **Continuous Testing:** Run `npm test` and `npm run test:e2e` after each code change to ensure tests pass and maintain a green build.

---

## Implementation Notes
- Use **Vercel** or **Netlify** for simple, free, and fast static React app hosting.
- Use **ShadCN UI components** for all form controls and UI elements for a modern, accessible, and consistent design.
- Render maze as SVG (for easy export and scaling)
- Use local storage for persistence
- Prioritize accessibility and mobile responsiveness 
- **Testing:**
  - Set up Jest and Playwright early in the project.
  - Add smoke/component tests after each major UI/logic milestone.
  - Add E2E tests for user flows after implementing core features. 

## Progress Notes
- Line color, background color, and wall thickness controls implemented in ControlsPanel.jsx and tested (Jest, Playwright E2E).
- Implemented square maze generation logic with unit and E2E tests passing. Phase 3 square generation complete; starting round maze generation.
- Do NOT add Maze Type selector or any additional maze types until Phase 7 begins, per implementation plan.
- Removed: complexity slider, details slider, high contrast, show grid, animate generation, font size controls. Only width, height, and seed (slider) control the maze.
- Theme selector hidden; unit tests updated and passing.
- Export buttons (SVG, PNG, PDF, Print) implemented; dependencies added; dev server runs without errors. 