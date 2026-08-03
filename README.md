# Jagannath Puri 3D & AR Web Experience

An interactive 3D and Augmented Reality (AR) web app that brings the heritage of the Jagannath Rath Yatra and the Puri Temple straight to your browser. 

---

## What is this project?

This project is a web-based, interactive experience built to showcase the rich history, architecture, and spiritual significance of the sacred **Shree Jagannath Temple** and the famous **Rath Yatra Chariot Festival** in Puri, Odisha. 

Using web-based 3D models and native Augmented Reality (AR), you can explore the colossal chariot up close, examine the temple architecture, and place these sacred structures directly in your physical environment using your phone's camera!

---

## Core Features

*   **🚪 The Temple Gate Gateway:** A cool, animated entrance sequence featuring opening temple doors and a loading screen before you step into the main experience.
*   **📐 Interactive 3D Viewport:** Toggle between detailed 3D models of the **Rath Yatra Chariot (Nandighosha)** and the **Puri Temple**. You can rotate them 360°, zoom in, pan, and toggle auto-rotation and shadows.
*   **✨ Augmented Reality (AR):** Bring the models into your room! On supported mobile devices (Android and iOS), you can project the chariot or temple onto the floor and scale it to any size.
*   **🎵 Dynamic Soundscapes:** Ambient devotional flute music plays in the background, which dynamically transitions to crowd chants when you enter AR mode.
*   **📖 Interactive Knowledge Hub:** A tabbed sidebar packed with cool facts, historical summaries, dimensions of the three grand chariots, details of the temple's massive kitchen (Rosaghara), and unexplained temple mysteries.
*   **🖼️ Media Gallery:** A collection of photos from the Rath Yatra festival with a lightbox popup view for detail exploration.

---

## Tech Stack

Here's the lightweight setup power behind this app:

*   **React 19 & Vite 8:** For a lightning-fast development experience and a highly responsive, single-page UI.
*   **Google `<model-viewer>`:** The web component doing the heavy lifting for WebGL 3D rendering and native mobile AR (via WebXR, Scene Viewer, and Quick Look).
*   **Vanilla CSS:** Clean, custom glassmorphic styling, HSL variables, fluid gradients, and hardware-accelerated animations.
*   **Lucide React:** For clean, modern SVG icons.
*   **Oxlint:** A super-fast linter to keep the codebase lint-free.

---

## Running it Locally

Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/SohamVernekar/Jagannath-Puri-AR-experience.git
    cd Jagannath-Puri-AR-experience
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the dev server:**
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    ```
    This creates an optimized, static bundle in the `dist/` directory ready for deployment (e.g., Vercel, Netlify, or GitHub Pages).

5.  **Lint the code:**
    ```bash
    npm run lint
    ```

---

## Contributing & Feedback

Since I'm working on this project solo, any feedback, suggestions, or contributions are highly appreciated! 

If you want to improve the 3D models, optimize the code, or add new visual elements, feel free to:
1.  Fork the repo
2.  Create your feature branch (`git checkout -b feature/cool-new-idea`)
3.  Commit your changes (`git commit -m 'Add some cool feature'`)
4.  Push to the branch (`git push origin feature/cool-new-idea`)
5.  Open a Pull Request

---

*Made with 💛 and devotion.*
