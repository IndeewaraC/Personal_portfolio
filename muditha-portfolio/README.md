# Muditha Lakmali Bodawatte Gedara - Academic Portfolio

A clean, modern, and highly responsive personal portfolio website designed specifically for a Biostatistician and Health Data Scientist. This project features a "Pearl White" and "Cognac" aesthetic, smooth animations, and a modular data structure that makes updating academic and professional records effortless.

## 🚀 Live Demo
[*(mudithalakmali.com)*](https://mudithalakmali-portfolio-ldfa4v6j2-indeewaracs-projects.vercel.app/)

## ✨ Key Features
* **Fully Responsive Design**: Includes a custom mobile-first hamburger menu overlay that prevents content clipping on small devices.
* **Modular Architecture**: All CV data (experience, publications, skills) is separated from the UI logic. You can update your resume without touching the React components.
* **Smooth Animations**: Uses `framer-motion` for elegant entry animations and scrolling transitions.
* **Sticky Navigation**: A frosted-glass sticky header that allows users to quickly jump between sections.
* **Modern Typography**: Powered by *Plus Jakarta Sans* for a clean, academic, and highly readable look.

## � Automatic Updates with Contentful Webhooks

This portfolio supports automatic rebuilding when you update content in Contentful. Follow these steps to set it up:

### 1. GitHub Repository Setup

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Set source to "GitHub Actions"

2. **Add Repository Secrets**:
   - Go to Settings → Secrets and variables → Actions
   - Add these secrets:
     - `CONTENTFUL_SPACE_ID`: Your Contentful space ID
     - `CONTENTFUL_ACCESS_TOKEN`: Your Contentful access token

### 2. Contentful Webhook Setup

1. **Create a Webhook in Contentful**:
   - Go to Settings → Webhooks
   - Click "Add Webhook"
   - Name: "Portfolio Auto-Update"
   - URL: `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches`
   - Triggers: Select "Publish" events for all content types
   - HTTP Method: POST
   - Headers:
     - `Authorization`: `token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`
     - `Accept`: `application/vnd.github.v3+json`
   - Request Body: 
     ```json
     {
       "event_type": "contentful-update"
     }
     ```

2. **Create a Personal Access Token** (if using direct webhook):
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
   - Use this token in the webhook Authorization header

### 3. Alternative: Webhook Relay Service

For better security, use a service like [Zapier](https://zapier.com) or [Make](https://www.make.com):

1. **Contentful → Zapier**: Trigger on content publish
2. **Zapier → GitHub**: Call repository dispatch API

### 4. Manual Webhook Server (Optional)

If you want to run your own webhook server:

```bash
# Install dependencies
npm install express

# Set environment variables
export CONTENTFUL_WEBHOOK_SECRET=your_webhook_secret
export GITHUB_REPO=your_username/your_repo
export GITHUB_TOKEN=your_github_token

# Run the server
node scripts/webhook-server.js
```

Then point your Contentful webhook to your server URL.

## 📝 Manual Update Process

If webhooks aren't set up, update manually:

```bash
# Fetch latest data
npm run prebuild

# Build and preview
npm run build
npm run preview
```

## 🚀 Deployment

The site is configured for GitHub Pages deployment via GitHub Actions. Push to main branch to trigger automatic deployment.

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
