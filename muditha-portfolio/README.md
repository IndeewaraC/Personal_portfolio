# Muditha Lakmali Bodawatte Gedara - Academic Portfolio

A clean, modern, and highly responsive personal portfolio website designed specifically for a Biostatistician and Health Data Scientist. This project features a "Pearl White" and "Cognac" aesthetic, smooth animations, and a modular data structure that makes updating academic and professional records effortless.

## 🚀 Live Demo
*(Add your live Vercel or GitHub Pages link here once deployed)*

## ✨ Key Features
* **Fully Responsive Design**: Includes a custom mobile-first hamburger menu overlay that prevents content clipping on small devices.
* **Modular Architecture**: All CV data (experience, publications, skills) is separated from the UI logic. You can update your resume without touching the React components.
* **Smooth Animations**: Uses `framer-motion` for elegant entry animations and scrolling transitions.
* **Sticky Navigation**: A frosted-glass sticky header that allows users to quickly jump between sections.
* **Modern Typography**: Powered by *Plus Jakarta Sans* for a clean, academic, and highly readable look.

## 🛠️ Tech Stack
* **Framework**: [React](https://reactjs.org/)
* **Styling**: Pure CSS (Custom CSS Variables for easy theming)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📂 Project Structure

To make maintenance easy, this portfolio separates the visual layout (`App.jsx`) from your actual resume information (`src/data/`).

```text
├── public/
│   └── media/
│       ├── profile.jpg          # Your profile picture
│       └── Muditha_CV_2026.pdf  # Downloadable Dossier/CV
├── src/
│   ├── data/                    # 📝 UPDATE YOUR INFO HERE
│   │   ├── affiliations.js
│   │   ├── awards.js
│   │   ├── certifications.js
│   │   ├── education.js
│   │   ├── experience.js
│   │   ├── hobbies.js
│   │   ├── leadership.js
│   │   ├── profile.js
│   │   ├── publications.js
│   │   ├── skills.js
│   │   └── socials.js
│   ├── App.jsx                  # UI Layout & Sections
│   ├── index.css                # Styling & Responsive rules
│   └── main.jsx                 # React Entry Point
├── package.json
└── README.md