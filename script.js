// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── SCROLL NAV SHADOW ───
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ─── FADE-UP ON SCROLL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── SMOOTH ANCHOR SCROLL WITH NAV OFFSET ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── WORKSHOP MODAL ───

// Data for each workshop track card.
// Keys match the data-modal attribute on each .track-card element.
const workshopData = {
  ws1a: {
    track: 'Workshop Session 1 — Track A',
    title: 'Discover Quantum Computing: Your First Step into the World of Qubits',
    description: 'Taking the first step into a new field can feel intimidating, but you don’t have to do it alone. This beginner-friendly workshop is designed to welcome those curious about the future of technology. Together, we’ll explore what quantum computing really is, how it differs from classical computing, and why it matters for tomorrow’s innovations. No prior knowledge is required, just curiosity and a willingness to try something new. This workshop aims to empower you to see that quantum technology is not “out of reach”, it needs people like you:)',
    speakers: [
      { name: 'Lavinia Stiliadou', org: 'University of Stuttgart', linkedin: 'https://www.linkedin.com/in/lavinia-stiliadou-51561636b/' }
    ]
  },
  ws1b: {
    track: 'Workshop Session 1 — Track B',
    title: 'Vom Acker zur Anlage - die Projektentwicklung von Solarparks',
    description: 'Details tba, this workshop will be held in German.',
    speakers: [
      { name: 'Jasmin Saad', org: 'EnBW', linkedin: 'https://www.linkedin.com/in/jasmin-saad-1076361ba/' }
    ]
  },
  ws1c: {
    track: 'Workshop Session 1 — Track C',
    title: 'Staying Relevant in the Age of AI: A Practical Playbook for STEM Careers',
    description: 'AI is changing how we work — but the real shift isn’t about replacing jobs. It’s about transforming workflows, gaining deep cross-domain knowledge, and sharpening skills needed to stay relevant. And we are exactly here to put that into practice. In this interactive session, I\'d like to share more on STEM professionals can navigate the rapidly evolving AI landscape without getting overwhelmed by hype. Drawing from my experience building data products in the logistics and customs domain in Europe, I’ll share practical insights on how AI is actually being used inside organisations today — and where the real opportunities lie.',
    speakers: [
      { name: 'Yilin Chen', org: 'AEB', linkedin: 'https://www.linkedin.com/in/chen-yilin/' }
    ]
  },
  ws1d: {
    track: 'Workshop Session 1 — Track D',
    title: 'Think Like a Scientist. Act Like a Founder. Creating impact as a Female Entrepreneur',
    description: 'Did you know scientific and entrepreneurial thinking often overlap? In this interactive workshop, we’ll explore what (female) entrepreneurship truly means. Hands-on exercises demonstrate how mindset shifts spark action and turn your research or ideas into real-world impact. We’ll reflect on identity loops – and show how to combine an impact-driven mindset with entrepreneurial skills. We also discover opportunities, support programs, and pathways at and outside the University of Stuttgart to grow your impact even further after the workshop.',
    speakers: [
      { name: 'Laura Rothgang', org: 'Traces', linkedin: 'https://www.linkedin.com/in/laura-rothgang-560762110/' }
    ]
  },
  ws2a: {
    track: 'Workshop Session 2 — Track A',
    title: 'Tips for Female Engineers in Male-Dominated Environments',
    description: 'As women in male-dominated industries, we often face unique challenges that require specific strategies. This workshop is a space to share our personal experiences to learn from and inspire one another. Together, we will develop practical tips and tricks to confidently navigate and succeed in technical environments. Join us to turn our shared insights into collective strength!',
    speakers: [
      { name: 'Ann-Kathrin Wimmer', org: 'Bosch', linkedin: 'https://www.linkedin.com/in/ann-kathrin-wimmer/' }
    ]
  },
  ws2b: {
    track: 'Workshop Session 2 — Track B',
    title: 'Shaping Gender-Inclusive STEM: Help Improve a Set of Policy Recommendations for Higher Education',
    description: 'What could make studies in STEM more inclusive for everyone? In this workshop, we invite you to share your views and help improve a set of policy recommendations for higher education. The workshop is part of STREAM IT, an EU-funded project working to promote gender-inclusive education in STEM fields. After a short introduction, we will look at the current draft recommendations and discuss them: What is relevant? What works? What might be missing? You don’t need any prior knowledge to join – we are especially interested in your experiences and ideas as students.',
    speakers: [
      { name: 'Ina Qian', org: 'Steinbeis Europa Zentrum', linkedin: 'https://www.linkedin.com/in/inaqian/' },
      { name: 'Sandrine Doretto', org: 'Steinbeis Europa Zentrum', linkedin: 'https://www.linkedin.com/in/sandrine-doretto-67870519/' }
    ]
  },
  ws2c: {
    track: 'Workshop Session 2 — Track C',
    title: 'Design Thinking — Creative Problem Solving in Practice',
    description: 'Design thinking is one of the most powerful frameworks for solving complex, human-centred problems — and it\'s deeply relevant to any STEM career. In this interactive workshop you\'ll work through the core stages (empathise, define, ideate, prototype, test) on a real challenge, guided by facilitators from the Design Factory. You\'ll leave with a new creative toolkit and a fresh perspective on problem solving.',
    speakers: [
      { name: 'Isabelle Zaubitzer', org: 'Design Factory', linkedin: 'https://www.linkedin.com/in/isabelle-zaubitzer-2b5b21333/' }
    ]
  },
   ws2d: {
    track: 'Workshop Session 2 — Track D',
    title: 'Introduction to AI Safety & Career Planning',
    description: 'Details tba',
    speakers: [
      { name: 'Isabelle Katharina Deckenbach', org: 'ELLIS Institute Tübingen', linkedin: 'https://www.linkedin.com/in/katharina-deckenbach/' },
      { name: 'Jeanne Salle', org: 'Max-Planck-Institute for Intelligent Systems', linkedin: 'https://www.linkedin.com/in/jeanne-salle-931786202/' }
    ]
  }
};

// Assign data-modal attributes to each track card in the DOM.
// This avoids touching the HTML directly.
const cardMappings = [
  // Session 1
  { session: 0, track: 0, key: 'ws1a' },
  { session: 0, track: 1, key: 'ws1b' },
  { session: 0, track: 2, key: 'ws1c' },
  { session: 0, track: 3, key: 'ws1d' },
  // Session 2
  { session: 1, track: 0, key: 'ws2a' },
  { session: 1, track: 1, key: 'ws2b' },
  { session: 1, track: 2, key: 'ws2c' },
  { session: 1, track: 3, key: 'ws2d' },
];

const trackGrids = document.querySelectorAll('.track-grid');

cardMappings.forEach(({ session, track, key }) => {
  const grid = trackGrids[session];
  if (!grid) return;
  const card = grid.querySelectorAll('.track-card:not(.track-tba)')[track];
  if (card) card.dataset.modal = key;
});

// Build the modal HTML and inject it into the page.
const modal = document.createElement('div');
modal.className = 'modal-overlay';
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-modal', 'true');
modal.innerHTML = `
  <div class="modal-box">
    <button class="modal-close" aria-label="Close">
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <div class="modal-track-label" id="modal-track"></div>
    <div class="modal-title" id="modal-title"></div>
    <p class="modal-desc" id="modal-desc"></p>
    <div class="modal-speakers" id="modal-speakers"></div>
  </div>
`;
document.body.appendChild(modal);

function getInitials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function openModal(key) {
  const data = workshopData[key];
  if (!data) return;

  document.getElementById('modal-track').textContent = data.track;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.description;

  const speakersEl = document.getElementById('modal-speakers');
  speakersEl.innerHTML = data.speakers.map(s => `
    <div class="modal-speaker-row">
      <div class="modal-speaker-avatar">${getInitials(s.name)}</div>
      <div class="modal-speaker-info">
        <div class="modal-speaker-name">${s.name}</div>
        <div class="modal-speaker-org">${s.org}</div>
      </div>
      <a href="${s.linkedin}" target="_blank" class="modal-speaker-li" title="LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
    </div>
  `).join('');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Open on click
document.addEventListener('click', e => {
  const card = e.target.closest('.track-card[data-modal]');
  if (card) { openModal(card.dataset.modal); return; }
  // Don't close if clicking a link inside the modal
  if (e.target.closest('.modal-speaker-li')) return;
  if (modal.classList.contains('active') && !e.target.closest('.modal-box')) closeModal();
});

modal.querySelector('.modal-close').addEventListener('click', closeModal);

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});