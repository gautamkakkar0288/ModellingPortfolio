# Gargi's Fashion Model Portfolio — Full Project Reference

> A comprehensive description of every feature, section, animation, colour, component, and content detail in this project. Use this doc to brief other agents or developers accurately.

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (JSX) |
| Build Tool | Vite 4 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| Lightbox | fslightbox-react 1.6.6 |
| Icons | react-icons 4 (Feather + Font Awesome) |
| Runtime | Node 20, npm |
| Dev Port | 5000 (`0.0.0.0`, `allowedHosts: true`) |

---

## 2. Colour Scheme

The entire site is **dark/monochrome with a single pink accent**.

| Role | Value | Where Used |
|---|---|---|
| Page background | `#000` / `bg-black` | App root, most sections |
| Surface (glass) | `rgba(30,30,30,0.5)` | All `.glass` cards |
| Primary text | `#fff` / `text-white` | Headings, body |
| Secondary text | Tailwind `text-gray-200` / `text-gray-400` | Sub-text, stat labels |
| Accent (pink) | `#ec4899` / `text-pink-400` | Nav active link, underline, name hover glow, "Back to Top" hover shadow |
| Hero gradient | `white → gray-300 → gray-500` | Main "Gargi" heading text gradient |
| Overlay (page load) | `radial-gradient(ellipse, #18181b 60%, #000 100%)` | Full-screen entry overlay |
| Nav background (scrolled) | `bg-black/60` + `backdrop-blur` | Sticky nav bar |
| Nav background (top) | `transparent` | Hero nav bar |
| Scrollbar track | `#222` | Custom webkit scrollbar |
| Scrollbar thumb | `#444`, `border-radius: 8px` | Custom webkit scrollbar |
| Particle / connection lines | `#fff` | Canvas particles across all sections |

### `.glass` Utility Class (defined in `index.css`)
```css
background: rgba(30, 30, 30, 0.5);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
backdrop-filter: blur(8px);
border-radius: 16px;
border: 1px solid rgba(255, 255, 255, 0.18);
color: #fff;
transition: background 0.3s, color 0.3s;
```
Used on: About card, Body Measurements card, every stat tile, Timeline cards, Contact card, Gallery image wrappers, "View Portfolio" button, Footer.

---

## 3. Global Layout & Config

- **`src/main.jsx`** — Entry point; renders `<App />` inside `React.StrictMode`.
- **`src/App.jsx`** — Root component. `bg-black text-white min-h-screen font-sans relative`.
  - On mount, displays a full-screen **entry overlay** (`position: fixed, z-50`) that animates out after ~1.1 s (`opacity: 1→0`, `y: 0→-40`, `scale: 1→1.04`, easing `[0.4,0,0.2,1]`).
  - Section order: `Hero → About → Gallery → Timeline → Contact → Footer`.
- **`src/index.css`** — `scroll-behavior: smooth` on `html`; `.glass` class; custom scrollbar.
- **`tailwind.config.js`** — Standard config, content targeting all `src/**` files.
- **`vite.config.js`** — `server: { host:'0.0.0.0', port:5000, allowedHosts:true }`.

---

## 4. Components

### 4.1 `Hero.jsx`

**Section ID:** `#hero`  
**Purpose:** Full-screen landing / splash section.

#### Layout
- `min-h-screen`, `flex items-center justify-center`, `overflow-hidden`.
- **Video background** — `<video src="/hero.mp4" autoPlay loop muted playsInline>`, covers full section (`object-cover`), moves vertically via parallax (`objectPosition: center ${offset}px`, speed `0.3`).
- Black overlay `bg-black/60` sits above the video (z-0).
- Central content is `z-10`, flex column, centered.

#### Navbar
- `position: fixed`, full width, `z-30`.
- **At top of page:** `bg-transparent`, large text (`text-lg md:text-2xl`).
- **After scrolling 40 px:** adds `backdrop-blur bg-black/60 shadow-lg`, smaller text (`text-base md:text-lg`). Transition: `all 0.3s`.
- **Links:** ABOUT → `#about`, GALLERY → `#gallery`, CONTACT → `#contact`, HOME → scrolls to top then reloads.
- **Active link highlight:** `text-pink-400 font-bold`. Logic: whichever section's top edge is within 120 px of viewport top.
- **Underline effect per link:** `<span>` with `bg-pink-400`, `scale-x-0 → scale-x-100` on hover/focus, `origin-left`, `duration-300`.
- **"Gargi" brand in nav:** slides in from left (`x:-60→0`) with spring animation (`stiffness:300, damping:30`) only after scrolling past 70% of viewport height. On hover: `scale: 1.15`, `color: #ec4899`, `textShadow: 0 0 16px #ec4899`.

#### Hero Content
- **Typewriter effect** on the name "Gargi": reveals one character every **180 ms** using `setInterval`. After fully typed, `gargiLanded = true`.
- **Heading `h1`:** `text-6xl md:text-8xl font-extrabold tracking-tight`. Text is a transparent gradient clip (`from-white via-gray-300 to-gray-500`). Framer Motion: `scale: 0.8 → 1`, duration `1.2 s`. Once landed: `hover:scale-110 hover:text-pink-400 hover:drop-shadow-[0_0_16px_rgba(236,72,153,0.7)]`.
- **Tagline:** `"Fashion Model | Modern. Bold. Timeless."` — `text-xl md:text-2xl font-light text-gray-200`, fades in with `opacity: 0→1`, delay `1 s`, duration `1 s`.
- **"View Portfolio" button:** links to `#gallery`. Styled `.glass` + `border-white/30` + `rounded-full`. Framer: `whileHover: { scale: 1.08 }`.
- Entire content block: `opacity:0,y:40 → opacity:1,y:0`, duration `1 s`.

---

### 4.2 `About.jsx`

Two back-to-back sections rendered from this single component.

#### About Me Section (`#about`)
- Background: `bg-gradient-to-b from-black via-gray-900/60 to-black`.
- Parallax background div, speed `0.15`.
- **Particles overlay:** 24 white particles, size 8, repulse strength 3.5.
- **Layout:** `flex-col md:flex-row`, `max-w-5xl`, `gap-12`.
- **Image (`/gallery8.png`):** left side on desktop. Framer: `opacity:0,x:-40 → opacity:1,x:0`, duration `1s`, `whileInView` (once).
- **Text card (`.glass p-10 rounded-2xl`):** right side. Framer: `opacity:0,y:40 → opacity:1,y:0`, duration `1s`, `whileInView` (once).
  - **Heading:** `✨ About Me` (`text-3xl md:text-4xl font-bold text-white`).
  - **4 paragraphs of bio text** (see Content section below).

#### Body Measurements Section (`#body-measurements`)
- Background: `bg-gradient-to-b from-black via-gray-900/60 to-black`.
- Parallax background div, speed `0.12`.
- **Particles overlay:** 24 white particles.
- **Layout:** `flex-col md:flex-row`, `max-w-5xl`, reversed order (card left, image right).
- **Stats card (`.glass p-10 rounded-2xl`):** Framer: `opacity:0,y:40 → opacity:1,y:0`.
  - Heading: `Body Measurements` (`text-3xl md:text-4xl font-bold`).
  - **2-column grid** of 8 stat tiles, each `.glass rounded-xl p-4`:
    - Left column: Height, Bust, Waist, Hips — animate `x:-20→0`, staggered 0.1 s delays.
    - Right column: Shoes, Dress, Hair, Eyes — animate `x:+20→0`, staggered 0.1 s delays.
- **Image (`/gallery4.png`):** right side. Framer: `opacity:0,x:+40 → opacity:1,x:0`, duration `1s`.

**Stats Data:**
| Stat | Value |
|---|---|
| Height | 5'5" (165 cm) |
| Bust | 36 |
| Waist | 29 in (74 cm) |
| Hips | 34 in (86 cm) |
| Shoes | US 7 |
| Dress | US 4 |
| Hair | Black |
| Eyes | Black |

---

### 4.3 `Gallery.jsx`

**Section ID:** `#gallery`  
- Background: `bg-black/90`.
- Parallax background div, speed `0.12`.
- **Particles overlay:** 32 white particles, size 10.
- **Heading:** `Photo Gallery`, `text-3xl md:text-4xl font-bold text-center`. Framer: `opacity:0→1`, duration `0.7s`, `whileInView`.
- **Grid:** `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8`, `max-w-6xl`.
- **9 images:** `/gallery1.png` through `/gallery9.png`.
- **Each image card:**
  - `.glass rounded-2xl shadow-lg cursor-pointer` wrapper.
  - Framer: `opacity:0,y:40 → opacity:1,y:0`, delay `i * 0.08 s`, duration `0.6 s`.
  - `whileHover: { scale:1.07, boxShadow:'0 8px 32px 0 rgba(255,255,255,0.18)' }`.
  - Image: `h-80 object-cover`. On hover: CSS `group-hover:scale-110`, `duration-300`.
  - Overlay on hover: `bg-black/40 opacity-0→100`, shows `"View"` text (`text-white text-xl font-semibold tracking-widest`).
- **Lightbox:** `fslightbox-react` — clicking any image opens a full-screen overlay at that slide index.

---

### 4.4 `Timeline.jsx`

**Section ID:** `#timeline`  
- Background: `bg-gradient-to-b from-black via-gray-900/60 to-black`.
- Parallax background div, speed `0.1`.
- **Particles overlay:** 20 white particles, size 8.
- **Heading:** `Past Work Timeline`, `text-3xl md:text-4xl font-bold text-center`. Framer: `opacity:0→1`.
- **Vertical line:** `border-l-2 border-gray-700 ml-6`.
- **3 timeline entries**, alternating left/right layout (`flex-row` / `flex-row-reverse`):
  - Framer: odd items `x:-80→0`, even items `x:+80→0`, delay `i*0.2s`, duration `0.7s`, `whileInView` (once).
  - `whileHover: { scale:1.04, boxShadow:'0 8px 32px 0 rgba(255,255,255,0.18)' }`.
  - **Thumbnail image:** `w-32 h-32 object-cover rounded-xl border-4 border-gray-800`. Hover: `shadow-2xl`.
  - **Info card (`.glass p-6 rounded-2xl`):** year (gray-400, text-sm), title (white, text-xl font-bold), description (gray-200). Hover: `translate-y: -8px`, `shadow-2xl`.

**Timeline Entries:**
| Year | Title | Description | Image |
|---|---|---|---|
| 2025 | Pretrators | Street Modelling | `/timeline1.png` |
| 2025 | Upgradables | Fashion Shoot | `/timeline2.png` |
| 2024 | Recnstrct | Fashion Work | `/timeline3.png` |

---

### 4.5 `Contact.jsx`

**Section ID:** `#contact`  
- Background: `bg-black/95`.
- Parallax background div, speed `0.08`.
- **Particles overlay:** 16 white particles.
- **Card (`.glass p-10 rounded-2xl`):** centered, `flex-col items-center`. Framer: `opacity:0,y:40 → opacity:1,y:0`, duration `1s`.
- **Heading:** `Contact`, `text-3xl md:text-4xl font-bold`. Framer: `opacity:0→1`, delay `0.2s`.
- **Phone:** `FiPhone` icon (Feather, `text-2xl`) + `+91 70567-09119`.
- **Email:** `FiMail` icon (Feather, `text-2xl`) + `gaarrgiii@gmail.com`.

---

### 4.6 `Footer.jsx`

- Background: `bg-black/80 glass py-8`.
- **Social links (3 icons, `text-2xl`):**
  - Instagram → `https://www.instagram.com/gxrgii/` — hover: `text-pink-400`, `scale-125`.
  - LinkedIn → `https://linkedin.com` — hover: `text-blue-400`, `scale-125`.
  - Twitter → `https://twitter.com` — hover: `text-sky-400`, `scale-125`.
- **Copyright:** `© {year} Gargi. All rights reserved.` (`text-gray-400 text-sm`).
- **"Back to Top" button:**
  - `position: fixed, bottom-8, right-8`, `z-50`.
  - Only visible (`display:block`) after scrolling more than 300 px.
  - Styled: `bg-white/20 rounded-full backdrop-blur-lg border border-white/30`.
  - Framer: animates `opacity` and `y` via `useAnimation`. On hover: `scale:1.15`, `boxShadow: '0 0 16px 2px #f472b6'`.
  - Clicks: `window.scrollTo({ top:0, behavior:'smooth' })`.

---

### 4.7 `Particles.jsx`

Interactive canvas background rendered in every section.

**Props:** `count` (number of particles), `color`, `size`, `repulseStrength` (not all used in current canvas code — canvas always draws white).

**Behaviour:**
- Canvas fills the full section (`absolute inset-0 w-full h-full`, `pointer-events-none`, `z-0`).
- Each particle has an **original home position** (`ox`, `oy`) and drifts back to it.
- **Mouse repulsion:** within 80 px radius, particles are pushed away with `force = (80-dist)/80 * 6`, applied as velocity (`dx/dy`). Velocity decays by `* 0.92` per frame.
- **Connection lines:** pairs of particles within 90 px draw a white line with `globalAlpha = 0.08 * (1 - dist/90)`.
- **Particle dot:** radius `3–5 px`, white fill (`#fff`), `shadowColor: #fff`, `shadowBlur: 16`, `globalAlpha: 0.85`.
- Resizes with window via `resize` event listener.
- Uses `requestAnimationFrame` loop.

**Usage per section:**
| Section | count | size |
|---|---|---|
| About Me | 24 | 8 |
| Body Measurements | 24 | 8 |
| Gallery | 32 | 10 |
| Timeline | 20 | 8 |
| Contact | 16 | 8 |

---

### 4.8 `useParallax.js`

Custom hook. Listens to `window.scroll` and returns `scrollY * speed`. Applied as `transform: translateY(${offset}px)` on background gradient divs.

**Speeds used per section:**
| Section | Speed |
|---|---|
| Hero (video) | 0.3 |
| About Me | 0.15 |
| Body Measurements | 0.12 |
| Gallery | 0.12 |
| Timeline | 0.1 |
| Contact | 0.08 |

---

## 5. All Animations — Master Reference

### Page Load
- Full-screen radial-gradient overlay fades + rises + scales out over **1.1 s** (`ease [0.4,0,0.2,1]`).

### Hero Section
| Element | Animation | Details |
|---|---|---|
| Section content wrapper | fade in + slide up | `opacity:0,y:40→1,0`, `1s` |
| "Gargi" heading | typewriter + scale in | 180 ms/char, `scale:0.8→1` over `1.2s` |
| "Gargi" heading (after typed) | hover glow | `scale:1.1`, pink drop-shadow |
| Tagline | fade in | `opacity:0→1`, delay `1s`, `1s` duration |
| "View Portfolio" button | hover scale | `scale:1.08` (Framer) |
| Sticky "Gargi" brand | slide from left | spring `stiffness:300,damping:30` after 70% scroll |
| Sticky "Gargi" brand hover | scale + pink glow | `scale:1.15`, `color:#ec4899` |
| Nav links | underline on hover | pink bar, `scale-x:0→1`, `origin-left`, `300ms` |
| Video | parallax | moves `scrollY * 0.3` px vertically |

### About Sections
| Element | Animation |
|---|---|
| About image | `opacity:0,x:-40 → 1,0`, `1s`, on scroll into view |
| About text card | `opacity:0,y:40 → 1,0`, `1s`, on scroll into view |
| Body Measurements card | `opacity:0,y:40 → 1,0`, `1s` |
| Each stat tile (left col) | `opacity:0,x:-20 → 1,0`, staggered `0.1s` delays |
| Each stat tile (right col) | `opacity:0,x:+20 → 1,0`, staggered `0.1s` delays |
| Body Measurements image | `opacity:0,x:+40 → 1,0`, `1s` |

### Gallery
| Element | Animation |
|---|---|
| Heading | `opacity:0→1`, `0.7s` |
| Each image card | `opacity:0,y:40 → 1,0`, delay `i*0.08s`, `0.6s` |
| Image card (hover) | `scale:1.07`, white box-shadow |
| Image (CSS, hover) | `scale:1.1`, `duration:300ms` |
| Overlay (CSS, hover) | `opacity:0→1`, `duration:300ms` |

### Timeline
| Element | Animation |
|---|---|
| Heading | `opacity:0→1`, `0.7s` |
| Odd items | `opacity:0,x:-80 → 1,0`, delay `i*0.2s`, `0.7s` |
| Even items | `opacity:0,x:+80 → 1,0`, delay `i*0.2s`, `0.7s` |
| Each entry (hover) | `scale:1.04`, white box-shadow |
| Info card (CSS, hover) | `-translate-y-2`, `shadow-2xl` |
| Thumbnail (CSS, hover) | `shadow-2xl` |

### Contact & Footer
| Element | Animation |
|---|---|
| Contact card | `opacity:0,y:40 → 1,0`, `1s` |
| Contact heading | `opacity:0→1`, delay `0.2s`, `0.7s` |
| Social icons (CSS, hover) | `scale:1.25`, colour shift |
| "Back to Top" button | `opacity:0,y:40 → 1,0` when scrollY > 300px, spring |
| "Back to Top" (hover) | `scale:1.15`, pink glow shadow |

### Particles (all sections)
- White dots float and drift back to origin; repel on mouse proximity (radius 80 px); white connection lines appear between dots within 90 px.

---

## 6. Content / Copy

### Model Info
- **Name:** Gargi
- **Instagram:** [@gxrgii](https://www.instagram.com/gxrgii/)
- **Email:** gaarrgiii@gmail.com
- **Phone:** +91 70567-09119

### Hero Tagline
> Fashion Model | Modern. Bold. Timeless.

### About Me Bio (4 paragraphs)
1. *"Hi, I'm Gargi, a dreamer, a doer, and a storyteller—using fashion as my language and the lens as my stage. Modeling is not just a passion for me; it's a canvas where confidence, creativity, and self-expression come to life."*
2. *"From elegant editorials to bold runway walks, I bring energy, grace, and authenticity to every frame I step into. With a deep love for the art of transformation, I thrive in front of the camera, embodying characters, moods, and styles that go beyond the surface."*
3. *"I believe beauty is not just seen—it's felt. It's in the attitude, the emotion, the pose, and the presence. Whether it's high fashion, commercial shoots, or creative collaborations, I aim to leave a lasting impression that speaks louder than words."*
4. *"When I'm not modeling, you'll find me exploring new creative avenues, soaking up inspiration from the world around me, and constantly evolving—not just in style, but in spirit."*

---

## 7. Assets / Public Files

All images and video live in `/public/` and are referenced as root-relative paths.

| File | Used In |
|---|---|
| `hero.mp4` | Hero video background |
| `gallery1.png` – `gallery9.png` | Gallery grid + lightbox |
| `gallery4.png` | Body Measurements section (right image) |
| `gallery8.png` | About Me section (left image) |
| `timeline1.png` | Timeline — Pretrators |
| `timeline2.png` | Timeline — Upgradables |
| `timeline3.png` | Timeline — Recnstrct |
| `qwe.png` | Present in `/public/` but not referenced in any component |

A mirrored `/dist/` folder exists containing a pre-built version of the same assets.

---

## 8. Navigation Structure

```
Fixed Navbar (always visible)
├── ABOUT       → #about
├── GALLERY     → #gallery
├── CONTACT     → #contact
└── HOME        → scrollTo(0) + reload

Page Scroll Order
├── #hero              (Hero)
├── #about             (About Me)
├── #body-measurements (Body Measurements)
├── #gallery           (Gallery)
├── #timeline          (Past Work Timeline)
├── #contact           (Contact)
└── footer
```

Active section detection: checks `getBoundingClientRect().top <= 120` for each section ID.

---

## 9. Running the Project

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:5000
npm run build    # production build → /dist
npm run preview  # preview /dist locally
```

Vite config: `host: '0.0.0.0'`, `port: 5000`, `allowedHosts: true`.
