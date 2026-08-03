# Shree Jagannath Puri Immersive 3D & Augmented Reality (AR) Experience

[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile%20%7C%20AR-orange.svg)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20WebXR-blue.svg)](#)
[![Deployment](https://img.shields.io/badge/Deployment-Vite%20Production-green.svg)](#)

---

## Executive Summary

The **Shree Jagannath Puri Immersive 3D & Augmented Reality (AR) Experience** is an enterprise-grade digital heritage preservation and interactive virtual tourism platform. Designed to bridge historical cultural legacies with modern spatial computing, the application delivers a high-fidelity, interactive, and educational visualization of the historical **Jagannath Rath Yatra Chariot Festival** and the **Shree Jagannath Temple in Puri, Odisha**.

By utilizing cutting-edge web-based 3D rendering and native Augmented Reality (AR) projection technologies, this platform democratizes access to sacred Indian architecture and rituals. It provides global audiences with a tactile, self-paced, and immersive educational journey.

---

## Technical Value Proposition & Objectives

*   **Virtual Cultural Preservation:** Digital archiving and interactive rendering of complex sacred objects, promoting cultural heritage education through spatial visualization.
*   **Zero-Install Augmented Reality:** Native mobile AR integration utilizing standard web protocols (WebXR, Scene Viewer, AR Quick Look), eliminating the need for external applications or proprietary hardware.
*   **High-Fidelity Rendering & Optimization:** Delivering interactive 3D assets on the web with rapid load times, low memory overhead, and responsive client-side rendering.
*   **Multimodal User Engagement:** Pairing visual assets with synchronized spatial audio, educational content structures, and interactive media galleries to maximize user retention and engagement.

---

## Core Product Architecture & Features

### 1. Immersive Portal Gateway (Landing Screen)
*   **Atmospheric Entry:** A stylized "Temple Gate" 3D opening animation designed to establish a reverent, cinematic context.
*   **Asset Preloading Pipeline:** Tracks real-time percentage indicators of GLTF/GLB asset loading sequences to optimize initial page performance.
*   **Integrated Devotional Audio:** Automatic ambient transition of classical flute music upon entering the main application workspace.

### 2. Interactive Spatial 3D Viewport
*   **Cross-Model Exploration:** Users can seamlessly toggle between the **Rath Yatra Chariot (Nandighosha)** and the **Shree Jagannath Puri Temple** models.
*   **State-of-the-Art Controls:** Integration of Google's `<model-viewer>` component, providing precise 360° camera orbit controls, manual zoom boundaries, automatic rotation options, and real-time shadow projection settings.

### 3. Augmented Reality (AR) Integration
*   **Cross-OS Compatibility:** Seamless support across Android (WebXR & Google Scene Viewer) and iOS (Apple AR Quick Look) mobile operating systems.
*   **Spatial Placement & Scaling:** Automatic floor-plane detection, gesture-controlled manual scaling, and intuitive camera calibration prompts.
*   **AR-Specific Ambient Audio:** Dynamic volume/track adjustment (e.g., activating crowd audio or muting/pausing flute background soundtracks) when moving from desktop browser layout to AR view sessions.

### 4. Interactive Knowledge Base Dashboard
*   **Modular Tabbed Interfaces:** Organizes deep research, historical accounts, and architectural dimensions into structured category panes:
    *   **Overview:** Background contexts, dates, and historical timelines of the deities.
    *   **Chariots & Architecture:** Fine details of construction (Kalinga design style, dimensions of the three grand chariots—Nandighosha, Taladhwaja, Darpadalana—and the four sacred gates).
    *   **Rituals & Mahaprasad:** Operational breakdowns of the Chhera Pahanra and Pahandi rituals, alongside technical details of the temple's holy kitchen (*Rosaghara*) feeding over 20,000 pilgrims daily.
    *   **Mysteries:** A curation of anomalous architectural phenomena (e.g., the wind-defying flag, the shadowless dome, the silence of the ocean waves at Singhadwara).

### 5. Divine Darshan Media Gallery
*   **Curated Image Grid:** Clean aesthetic layout featuring premium photography of the temple spire, deities, and procession routes.
*   **Lightbox Visualization:** Full-screen asset inspection modals with overlay descriptions for detailed learning.

---

## Technical Stack & Architecture

The application is built on a modern, decoupled web architecture engineered for speed, responsiveness, and minimal bundle sizes:

*   **UI Library:** `React 19` (Functional Components & Hooks for state orchestration)
*   **Build Tool & Dev Server:** `Vite 8` (Fast Hot Module Replacement, optimized tree-shaking production bundler)
*   **3D/AR Engine:** Google `<model-viewer>` (Web Component abstraction over Three.js/WebGL)
*   **Icons:** `Lucide-React` (Vector icons)
*   **Design Language:** Premium Glassmorphism (CSS Variables, HSL-based color tokens, fluid gradients, and CSS-based hardware-accelerated animations)
*   **Linter:** `Oxlint` (Super fast JavaScript/React linter for clean code quality)

```
[Client Web Browser]
       │
       ├──► React UI & State Orchestration (App.jsx)
       │       │
       │       ├──► Custom Glassmorphic CSS (index.css)
       │       └──► Lucide Icons & SVGs
       │
       ├──► WebXR / Google Scene Viewer (AR Engines)
       │
       └──► HTML5 Audio Context (flute.mp3, crowd.mp3)
```

---

## Local Development & Setup Instructions

To run the project locally, ensure you have [Node.js](https://nodejs.org/) (v18+) installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/SohamVernekar/Jagannath-Puri-AR-experience.git
cd Jagannath-Puri-AR-experience
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:5173`.

### 4. Build for Production
To generate an optimized distribution bundle for web deployment:
```bash
npm run build
```
This builds static assets into the `dist/` directory, ready to be hosted on Vercel, Netlify, or any standard web server.

### 5. Code Linting
Run Oxlint to check code quality and potential React performance bottlenecks:
```bash
npm run lint
```

---

## Corporate Governance & Contribution Guidelines

This repository serves as a digital touchpoint for cultural preservation. We welcome contributions that align with our high standards of software quality and cultural respect:

1.  **Code Consistency:** Adhere to the established CSS variable tokens for color palettes and components to maintain a premium visual aesthetic.
2.  **Asset Licensing:** Ensure all 3D assets (`.glb` files) and media gallery files are optimized for web consumption (compressed texture sizes, low vertex counts) and have appropriate usage licenses.
3.  **Cross-Device Testing:** Verify all pull requests on both desktop browsers (Chrome, Safari, Firefox) and mobile AR browsers (Chrome on Android, Safari on iOS) to prevent regression bugs in AR tracking loops.

---

*Developed with devotion and modern software engineering excellence.*
