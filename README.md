# ew-dashboard

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![CRA](https://img.shields.io/badge/Create_React_App-09D3AC?style=flat-square&logo=createreactapp&logoColor=white)

A React analytics dashboard — charts, metrics, and a responsive layout built on
**Create React App**, with [Recharts](https://recharts.org/) for the visualisations,
**Tailwind CSS** for styling, and [lucide-react](https://lucide.dev/) icons.

## Stack

| Concern | Choice |
|---------|--------|
| UI | React 19 |
| Charts | Recharts |
| Styling | Tailwind CSS (+ PostCSS / Autoprefixer) |
| Icons | lucide-react |
| Tooling | Create React App (`react-scripts`) |
| Tests | React Testing Library + jest-dom |

## Quick start

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production bundle in ./build
npm test         # interactive test runner
```

## Project layout

```
src/        components, charts, and dashboard views
public/      static shell and assets
tailwind.config.js · postcss.config.js
```
