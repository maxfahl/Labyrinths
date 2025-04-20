# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Labyrinth Generator App

A web application that lets you generate, customise and export mazes / labyrinths. Built with React, TypeScript, Vite, Tailwind CSS v4 and ShadCN UI components. All mazes are rendered as scalable SVGs so they look crisp at any resolution and can be downloaded as PNG, SVG or PDF.

## Features

- Square maze generation (perfect and braided)
- Full control over width, height, wall thickness, colours, seed, start/end positions and solution path visibility
- Export current maze as **SVG**, **PNG**, **PDF** or send directly to the browser **Print** dialog
- Local‑storage backed history – save every maze with a name and preview image and restore it later
- Fully keyboard‑navigable, accessible UI with high‑contrast support
- Responsive – works great on desktops, tablets and phones
- Built with Test‑Driven Development: Jest unit/component tests & Playwright E2E tests keep the build green

## Tech Stack

| Area            | Tech                          |
| --------------- | ----------------------------- |
| Front‑end       | React 18 + Vite               |
| Language        | TypeScript                    |
| Styling         | Tailwind CSS v4               |
| UI Components   | [shadcn/ui](https://ui.shadcn.com) |
| Maze Algorithms | Custom DFS & Primʼs variants  |
| State / Storage | React hooks + localStorage    |
| Testing         | Jest + React Testing Library, Playwright |
| Build / Deploy  | Vercel / Netlify (static)     |

## Getting Started

Clone the repo and install dependencies:

```bash
npm install
```

### Development server

Run Vite in dev‑mode with hot‑module reload:

```bash
npm run dev
```

The app will be available at http://localhost:5173 (or the port printed in the terminal).

### Running the test‑suite

```bash
# Unit & component tests
npm test

# End‑to‑end tests
npm run test:e2e
```

All tests must pass before pushing.

### Building for production

```bash
npm run build
```

The static build is emitted into `dist/` and can be served by any static host or CDN.

## Deployment

The project is optimised for **Vercel** and **Netlify**. Both platforms detect the Vite build automatically.

| Platform | Settings                                           |
| -------- | --------------------------------------------------- |
| Vercel   | Framework preset: **Vite**<br>Build command: `npm run build`<br>Output Directory: `dist` |
| Netlify  | Build command: `npm run build`<br>Publish directory: `dist` |

Simply connect your GitHub repository and the platform will handle the rest.

## Project Structure

```
root
├── components/     # React UI components & controls
├── maze/           # Maze generation algorithms
├── lib/            # Helper utilities (localStorage, downloads…)
├── tests/          # Jest tests (unit / component)
├── e2e/            # Playwright test‑suite
└── .notes/         # PRD, progress notes etc.
```

## Local Storage Keys

- `labyrinth-history` – array of saved mazes (id, name, options, preview, timestamp)

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/<name>`
3. Follow TDD – write failing tests first
4. Commit your changes: `git commit -m "feat: awesome new thing"`
5. Push: `git push origin feature/<name>`
6. Open a Pull Request

All PRs must pass linting (`npm run lint`) and the complete Jest + Playwright suites.

## License

MIT © 2024
