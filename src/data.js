// ---------------------------------------------------------------------------
// EDIT THIS FILE to make the portfolio yours. Everything visible is here.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Charvi Vyas',
  role: 'Full-Stack & ML Developer',
  tagline:
    'B.Tech IT grad who turns ideas into practical software — from full-stack apps to real-time ML systems.',
  brand: 'CV', // small monogram top-left
}

export const about = {
  body: `I'm an Information Technology graduate from GRIET, Hyderabad, with hands-on
  experience in Java, SQL, data analytics, and web development. I enjoy building
  practical software with a strong foundation in full-stack concepts and machine
  learning — and I'm looking to contribute and grow from day one.`,
  stats: [
    { num: '7.43', lbl: 'CGPA / 10' },
    { num: '2+', lbl: 'Internships' },
    { num: '5+', lbl: 'Certifications' },
  ],
}

export const experience = [
  {
    when: 'May 2026 — Jul 2026',
    role: 'Software / IT Intern · IbaseIT',
    desc: 'Completed a full-stack internship (concluded 31 Jul 2026) — applied Java, SQL, and data analysis to real-world projects, collaborating on debugging, testing, and end-to-end software delivery.',
  },
  {
    when: 'Apr 2026 — May 2026',
    role: 'Customer Relations Officer (Intern) · SIG Overseas',
    desc: 'Handled client communication and CRM operations, coordinating with internal teams for smooth servicing.',
  },
  {
    when: '2022 — 2026',
    role: 'B.Tech, Information Technology · GRIET',
    desc: 'Information Technology at Gokaraju Rangaraju Institute of Engineering & Technology, Hyderabad. CGPA 7.43 / 10.',
  },
]

export const projects = [
  {
    title: 'MatriSense+',
    desc: 'Real-time ML system for maternal risk prediction — IoT vitals collection, live risk scoring, and a clinical decision-support dashboard.',
    stack: ['Python', 'IoT', 'ML', 'Streamlit'],
  },
  {
    title: 'The Virtual Wardrobe',
    desc: 'Full-stack wardrobe app with OCR-based clothing image parsing and FAISS-powered outfit recommendations.',
    stack: ['Python', 'Streamlit', 'FAISS', 'OCR'],
  },
  {
    title: 'ReelForge',
    desc: 'Turns any website URL into a narrated walkthrough video — automated browser capture, scripted scene stitching, and rendered MP4 output.',
    stack: ['FastAPI', 'Playwright', 'ffmpeg', 'Next.js'],
  },
]

export const links = [
  { label: 'GitHub', href: 'https://github.com/charvi13-tech' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/charvi-vyas-ambati-6604851aa/' },
  { label: 'Email', href: 'mailto:charvivyasambati@gmail.com' },
  // Résumé PDF lives in /public and is served at the site root.
  { label: 'Résumé', href: 'charvi-vyas-resume.pdf' },
]

// Depth labels for the HUD as you descend (offset 0 → 1)
export const zones = [
  { at: 0.0, label: 'Surface' },
  { at: 0.22, label: 'Sunlight Zone' },
  { at: 0.45, label: 'Twilight Zone' },
  { at: 0.7, label: 'Midnight Zone' },
  { at: 0.9, label: 'The Abyss' },
]

export const MAX_DEPTH = 3860 // metres shown at the very bottom
