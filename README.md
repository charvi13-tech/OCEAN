# The Deep — an immersive underwater portfolio

A cinematic, scroll-driven portfolio built with **React + Vite + Three.js**
(`@react-three/fiber`). Scrolling takes the visitor on a descent from the sunlit
ocean surface down into the pitch-black abyss, with each depth zone revealing a
section of the site. Inspired by scroll-experience portfolios, but its own world.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the build
```

## Make it yours

**All copy, projects, experience and links live in [`src/data.js`](src/data.js).**
Edit that one file — no need to touch the 3D code.

- `profile` — your name, role, tagline, monogram
- `about` — bio + the three headline stats
- `experience` — timeline entries
- `projects` — the glowing project cards in the Midnight zone
- `links` — the contact links in the Abyss
- `zones` / `MAX_DEPTH` — the depth-meter labels shown in the HUD

## The dive (structure)

| Depth | Section | What lives there |
|------|---------|------------------|
| 0 m — Surface | Hero | Name, role, god rays, rising bubbles |
| ~Sunlight | About | Bio + stats, drifting jellyfish |
| ~Twilight | Experience | Timeline of roles |
| ~Midnight | Work | Bioluminescent project cards |
| ~Abyss | Contact | Glowing anglerfish lure + links |

## How it works

- `src/App.jsx` — Canvas, `ScrollControls`, postprocessing (Bloom + Vignette), loader.
- `src/three/Scene.jsx` — assembles the world and the `Rig` that maps scroll → camera descent.
- `src/three/DepthColor.jsx` — lerps background/fog from turquoise to black by depth.
- `src/three/Particles.jsx` — rising bubbles + drifting marine snow.
- `src/three/Jellyfish.jsx`, `LightShafts.jsx` — the inhabitants and sunlight.
- `src/ui/Overlay.jsx` — the scroll-synced HTML content.
- `src/ui/HUD.jsx` — the fixed depth meter (reads scroll via a render-free store).

## Deploy to GitHub Pages

1. If deploying to a **project** page (`user.github.io/repo/`), set `base: '/repo/'`
   in `vite.config.js`. For a **user** page (`user.github.io/`), leave it `'/'`.
2. `npm run build`, then publish the `dist/` folder (e.g. with the `gh-pages`
   package or a GitHub Actions workflow).
