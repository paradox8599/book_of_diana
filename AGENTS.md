# Agentic Development Guidelines: Book of Diana

This document serves as the primary reference for AI agents (and human developers) working on the "Book of Diana" repository. It outlines the project structure, development workflows, coding standards, and operational protocols to ensure consistency and quality.

## 1. Project Overview

"Book of Diana" (嘉然之书) is a lightweight Progressive Web App (PWA) designed to provide randomized answers or prompts to users, similar to a "Magic 8-Ball" but themed around the virtual idol Diana (嘉然).

- **Type:** Progressive Web App (PWA) / Static Website
- **Core Functionality:** Click/Spacebar interaction triggers a rapid cycle of text options, stopping on a random answer.
- **Platform:** Web (Mobile and Desktop optimized).

## 2. Development & Build Workflow

This project utilizes a **No-Build** architecture. There are no bundlers (Webpack, Vite, Parcel) or compilers (Babel, TypeScript). Code is written in standard web technologies and served directly to the browser.

### 2.1. Running the Project

**Deployment Status:** The application is deployed via **GitHub Pages**.

**Local Development:**
Since there is no `package.json` with scripts, use any static file server for local previews or development:

- **Python (Recommended):**
  ```bash
  python3 -m http.server 8000
  ```
- **Node.js (http-server):**
  ```bash
  npx http-server .
  ```
- **Access:** Open `http://localhost:8000` in a browser.

### 2.2. Build Commands

- **None required.** Source files are production-ready.
- **Service Worker:** `sw.js` is registered automatically by logic in `index.html`.

### 2.3. Testing & Verification

There is no automated test suite. Verification is manual.

- **Single "Test" (Manual):**
  1. Open the app in a browser.
  2. Press `Spacebar` or Click anywhere.
  3. Verify text cycles rapidly.
  4. Press/Click again to stop.
  5. Verify a single answer is displayed clearly.
  6. Resize window to <768px width to verify mobile background (`bg_mobile.webp`) loads.

- **Linting:**
  - Currently, no automated linter is configured.
  - Agents should self-lint against the "Code Style" section below.

## 3. Code Style & Conventions

Adhere strictly to these patterns to maintain the project's existing aesthetic.

### 3.1. Formatting & Indentation

**Note: The project currently uses mixed indentation.**

- **HTML (`index.html`):** Use **4 spaces** for indentation.
  ```html
  <body>
    <div class="container"></div>
  </body>
  ```
- **JavaScript (`sw.js`) & JSON (`manifest.json`):** Use **2 spaces** for indentation.
  ```javascript
  self.addEventListener('install', (e) => {
    e.waitUntil(...)
  });
  ```
- **CSS (embedded):** Use **4 spaces** within the `<style>` block.

### 3.2. Naming Conventions

- **Files:** snake_case or lowercase (e.g., `bg_mobile.webp`, `sw.js`).
- **CSS Classes/IDs:** kebab-case (e.g., `.center-container`, `#answer`).
- **JS Variables/Constants:** camelCase (e.g., `answerElement`, `intervalId`, `isRunning`).
- **Global Constants:** `answers` array is defined at the top level of the script.

### 3.3. HTML Structure

- Keep CSS in the `<head>` within a `<style>` block.
- Keep Application Logic at the bottom of `<body>` within a `<script>` block.
- Keep Service Worker registration logic in a separate `<script>` block after `</body>` or at the very end.

### 3.4. JavaScript (Vanilla)

- **Modularity:** Logic is simple enough to reside in `index.html`. Do not extract to external `.js` files unless complexity grows significantly.
- **DOM Access:** Use `document.getElementById` for performance and simplicity.
- **Event Handling:** Use direct property assignment (e.g., `document.body.onkeydown = ...`) or `addEventListener` if multiple handlers are needed.
- **Strings:** Use double quotes `"` for HTML attributes and JSON. Use single quotes `'` or backticks `` ` `` for JavaScript strings.

### 3.5. CSS & Responsive Design

- **Mobile First/Responsive:** Use `@media (max-width: 768px)` breakpoints to handle mobile-specific assets (like background images).
- **Centering:** Flexbox is the standard for centering content:
  ```css
  display: flex;
  justify-content: center;
  align-items: center;
  ```

### 3.6. Error Handling

- **Service Worker:** Use `.catch()` for promise rejections during registration or cache matching.
- **General JS:** Minimal error handling is currently present due to low complexity. Agents should ensure `null` checks if DOM elements might be missing.

## 4. File Structure & Assets

```
/
├── index.html        # Main application entry, UI, and logic
├── sw.js             # Service Worker for offline support
├── manifest.json     # PWA metadata
├── bg.webp           # Desktop background
├── bg_mobile.webp    # Mobile background
└── icon_512.png      # App Icon
```

### 4.1. Asset Management

- **Backgrounds:** WebP format is preferred for size and quality.
- **Icons:** PNG format is standard for manifests.

## 5. Logic Documentation

### 5.1. Randomization Engine

The core mechanic relies on `setInterval`:

1. **Start:** `setInterval` runs every 50ms, updating the innerHTML of `#answer` with a random string from the `answers` array.
2. **Stop:** `clearInterval` is called, leaving the last selected answer on screen.
3. **Trigger:** Toggled by `isRunning` boolean state.

### 5.2. Service Worker Strategy

- **Install:** Caches core shell (`/`, `index.html`) and assets (`bg.webp`, etc.).
- **Fetch:** Cache-first strategy. Returns cached response if available; otherwise falls back to network.

## 6. Future Development Goals

When tasked with updates, consider:

- **Accessibility (a11y):** Ensure the flashing text doesn't trigger photosensitivity issues (maybe slow it down or add a disclaimer). Add ARIA labels.
- **Refactoring:** If JS grows >100 lines, extract to `app.js`.
- **Localization:** Currently Chinese only. Structure `answers` array to support multiple languages if requested.

## 7. Cursor / Copilot Rules

_No specific .cursorrules or .github/copilot-instructions.md found._
Agents should rely entirely on this document and the existing code context.
