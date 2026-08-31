# ISM Digital Portfolio — Multi-Page Redesign

**Date:** 2026-04-08  
**Student:** Rithvik Inampudi  
**Topic:** Deep Learning  
**Program:** ISM 1

---

## Overview

Convert the existing single-page scroll portfolio into a 7-page Next.js site matching the ISM Digital Portfolio Rubric MP1. Each rubric section becomes its own route. The existing visual design (particle canvas, cursor effects, preloader, dark theme) is preserved across all pages via the shared `ClientShell` in `layout.tsx`.

---

## Routing

| # | Tab Label | Route |
|---|-----------|-------|
| 1 | HOME | `/` |
| 2 | ABOUT ME | `/about-me` |
| 3 | ABOUT ISM | `/about-ism` |
| 4 | MENTOR BIO | `/mentor-bio` |
| 5 | RESEARCH | `/research` |
| 6 | BLOG | `/blog` |
| 7 | PROJECTS | `/projects` |

Each route is a folder under `src/app/` with a `page.tsx` file.

---

## Layout & ClientShell

`src/app/layout.tsx` continues to wrap all pages with `ClientShell`. Changes to `ClientShell`:

- **Remove:** `SECTIONS` array, `activeSection` state, `IntersectionObserver` for section detection, ambient layer divs, section dots nav, section counter label
- **Keep:** particle canvas, cursor dot/ring/glow, click ripple, cursor trail, preloader, scroll progress bar, scroll-to-top button
- **Keep:** scroll reveal (`.reveal` class) — individual pages can use it on their elements

---

## Navbar (`src/components/Navbar/Navbar.tsx`)

- Replace `anchors` array with 7 route objects: `{ label: 'HOME', href: '/' }`, etc.
- Replace `scrollToSection` + `onClick` with Next.js `<Link href={route.href}>`
- Replace `activeSection` prop with `usePathname()` from `next/navigation` for active state
- Remove `isHidden` prop and hide-on-scroll behavior (not relevant for page nav)
- Hamburger mobile menu stays unchanged
- `ClientShell` no longer passes `activeSection` or `isNavHidden` to Navbar

---

## Page Content

### 1. HOME (`/`)
- Student name: **Rithvik Inampudi**
- Topic of Study: **Deep Learning**
- Background: existing matrix/particle visual style (hero section)
- Quote: placeholder text — `"[Your quote here]"`
- Replaces current `Introduction` component

### 2. ABOUT ME (`/about-me`)
- **Photo:** placeholder box with label "Add professional photo"
- **Biography:** "Rithvik Inampudi is a student passionate about artificial intelligence and deep learning. With a strong foundation in mathematics and computer science, he is dedicated to exploring how neural networks and machine learning models can be applied to solve complex, real-world challenges. Through the ISM program, Rithvik is actively deepening his expertise in deep learning research and development, with a long-term goal of building intelligent systems that create meaningful impact."
- **Mission Statement:** "My mission is to contribute meaningfully to the field of deep learning by developing intelligent systems that solve real-world problems and push the boundaries of AI research. I aim to create impactful technologies that not only advance the field technically but also lead to practical improvements in people's lives. Through continuous learning and collaboration, I hope to make a positive difference in society by using deep learning as a tool for innovation and social good."
- **Résumé:** Download button linking to `/resume.pdf` (PDF copied to `public/`)
- **Contact:** `rithvik.inampudi@gmail.com` | `linkedin.com/in/rithvik-inampudi`

### 3. ABOUT ISM (`/about-ism`)
- **Logo:** ISM logo image (copied to `public/ism-logo.png`)
- **Description:** Standard ISM program description — ISM (Independent Study Mentorship) is a year-long, research-based program that connects high school students with professionals in their field of interest. Students develop real-world skills through primary and secondary research, mentorship, and an original work project, culminating in a final product that demonstrates mastery of their chosen topic.

### 4. MENTOR BIO (`/mentor-bio`)
- ISM 1 student — page displays a styled "Coming Soon" placeholder. No mentor content required at this stage.

### 5. RESEARCH (`/research`)
- **Primary Sources**
  - Interviews — placeholder card: "No interviews added yet"
  - Mentor Visits — placeholder card: "No mentor visits added yet"
- **Secondary Sources** — placeholder list: "No secondary sources added yet"

### 6. BLOG (`/blog`)
- Empty state: styled message "Blog posts will appear here, ordered newest to oldest."

### 7. PROJECTS (`/projects`)
- **Original Work:** "Adaptive Resolution Vision Simulator for Teaching Deep Learning Efficiency" — summary card with title, date (October 24, 2025), subject, and introduction paragraph from the proposal doc. Link/button to view full document.
- **Final Product:** "AI-Powered Waste Detection Model" — summary card with title, date (March 26, 2026), and progress assessment summary. Link/button to view full document.
- Both source documents copied to `public/` for download.

---

## Files to Remove / Retire

The following existing components are replaced by page-specific content and can be deleted:

- `src/components/Introduction/`
- `src/components/About/`
- `src/components/Projects/`
- `src/components/Experience/`
- `src/components/Achievements/`
- `src/components/Skills/`
- `src/components/Extracurriculars/`
- `src/app/project/` (existing project detail pages)
- `src/data/data.ts`
- `src/app/page.module.css`

---

## Assets to Copy to `public/`

| Source | Destination |
|--------|-------------|
| `/Users/divyainampudi/.claude/image-cache/1601781c-5c25-48dd-bfa5-19b8eba5c6b7/2.png` | `public/ism-logo.png` |
| `/Users/divyainampudi/Downloads/Copy of CNS General Resume Template.pdf` | `public/resume.pdf` |
| `/Users/divyainampudi/Downloads/_Original Work Proposal.docx` | `public/original-work-proposal.docx` |
| `/Users/divyainampudi/Downloads/Final Product Progress Assesment.docx` | `public/final-product-assessment.docx` |

---

## Styling

- All new pages follow existing dark theme from `globals.css`
- Page sections use `.reveal` class for scroll-in animations
- Consistent section heading style across pages
- Placeholder elements styled with dashed borders in the site's blue accent color

---

## Out of Scope

- Actual blog post content (to be added later)
- Real research entries (to be filled in by student)
- Professional photo (to be added by student)
- Quote on HOME page (to be filled in by student)
