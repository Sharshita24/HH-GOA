# 🌴 HH Goa 2026 Frame Generator

> **Official Profile Picture Frame Generator for Hacker House Goa 2026 (28–31 OCT 2026 • Goa, India)**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://hh-goa-frame-self.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gkm563/HH-GOA)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## ⚡ Live Application
🚀 **Try it live now**: **[https://hh-goa-frame-self.vercel.app](https://hh-goa-frame-self.vercel.app)**

---

## 📸 Overview

The **HH Goa 2026 Frame Generator** is a fast, privacy-focused, mobile-friendly web application designed for hackers, builders, developers, and attendees of **Hacker House Goa 2026**. 

Users can upload any photo (including iPhone **HEIC** format), auto-fit or manually adjust positioning and zoom using touch gestures or interactive controls, apply authentic branded frames matching the official **[hhgoa.com](https://hhgoa.com)** identity, download a high-resolution **1080×1080 PNG**, and instantly share it on X with `#FrameInGoa`.

### 🔒 100% Client-Side & Private
- **No Login / No Sign Up**
- **No Database / No Server Uploads**
- Image processing and HEIC conversion happen entirely inside your browser.

---

## ✨ Features

- 🖼️ **Client-Side HEIC Support**: Automatic iOS HEIC/HEIF to JPEG conversion powered by `heic2any`.
- 🎨 **3 Branded Frame Styles**:
  1. **Official Poster**: Tall yellow serif typography with the signature hot pink **"गोवा"** Hindi calligraphic overlay.
  2. **Goa Beach & Sun**: Sun arc curve in sun yellow, tropical palm outlines, and beach signboard.
  3. **Builder ID Card**: Cream floating ID card styled after the *Task #1 Builder ID Card* from `hhgoa.com`.
- 🎛️ **Interactive Photo Controls**:
  - Touch Pan & Mouse Drag positioning directly on canvas.
  - Zoom slider (50% to 300%).
  - D-Pad step movements (30px step).
  - 90° Rotation & 1-Click Reset.
- 📐 **1080×1080 High-Res Export**: Generates crisp, square PNG profile pictures suitable for X, LinkedIn, and Telegram.
- 🐦 **1-Click Share to X**: Opens X post intent with pre-filled event tags (`#FrameInGoa`) and copy-caption utility.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14** | React Framework (App Router, Server Components & Static Export) |
| **TypeScript** | Strict Type Safety |
| **Tailwind CSS** | Custom styling, glassmorphism, and authentic `hhgoa.com` color palette |
| **HTML5 Canvas API** | High-resolution 1080×1080 graphic rendering pipeline |
| **heic2any** | Browser-side iOS HEIC to JPEG/PNG image converter |
| **Lucide Icons & Canvas Confetti** | UI icons and celebratory particle animations |
| **Vercel** | Edge network deployment |

---

## 📂 Project Structure

```text
HH-GOA/
├── app/
│   ├── globals.css          # Authentic hhgoa.com color system & font imports
│   ├── layout.tsx           # SEO Metadata, OpenGraph & Twitter Cards
│   └── page.tsx             # Main state orchestration (Landing -> Editor -> Result)
├── components/
│   ├── Header.tsx           # Navbar with studio badge & hhgoa logo mark
│   ├── HeroLanding.tsx      # Landing hero with Task #1 prompt & upload trigger
│   ├── UploadZone.tsx       # Drag-and-drop zone & format validator
│   ├── FramePreview.tsx     # Real-time interactive 1080x1080 canvas
│   ├── EditorControls.tsx   # Frame picker, zoom slider, D-Pad & rotation
│   └── ResultModal.tsx      # High-res download modal & X share intent
├── lib/
│   ├── canvasRenderer.ts    # Core offscreen canvas vector overlay engine
│   ├── heicConverter.ts     # Client-side HEIC conversion wrapper
│   └── imageProcessor.ts    # Aspect-ratio calculator & File API utilities
├── types/
│   └── image.ts             # TypeScript interfaces for image & frame state
├── public/                  # Static assets & icons
├── package.json
├── tailwind.config.ts
└── README.md
```

---

## 🚀 Local Development

Follow these steps to run the application locally:

### 1. Clone Repository
```bash
git clone https://github.com/gkm563/HH-GOA.git
cd HH-GOA
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🤝 Event & Branding Credits

- Event: **Hacker House Goa 2026** (28–31 OCT 2026 • Goa, India)
- Official Site: [https://hhgoa.com](https://hhgoa.com)
- Presented by: **2:47 PM STUDIO**
- Hashtag: **#FrameInGoa**

---

## 📜 License

MIT License. Designed with ❤️ for the Hacker House Goa 2026 community.
