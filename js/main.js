// Tarun Music Backlink Site — Main JS

document.addEventListener('DOMContentLoaded', () => {

  // === Navbar Scroll Effect ===
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // === Hamburger Menu ===
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // === Scroll Reveal Animation ===
  const revealEls = document.querySelectorAll(
    '.genre-card, .license-card, .why-feature, .blog-card, .service-card, .contact-item, .creator-inner, .why-inner, .section-header'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger siblings for grid items
        const siblings = entry.target.parentElement
          ? Array.from(entry.target.parentElement.children).filter(c => c.classList.contains('reveal'))
          : [];
        const i = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), Math.max(0, i) * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Immediately show elements already in viewport
  setTimeout(() => {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
  }, 50);

  // === Active Nav Link (per page) ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentPage);
  });

  // === Contact Form (demo) ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✅ Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✅ Message Sent!';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  // === Waveform Animation (hero decoration) ===
  const waveCanvas = document.getElementById('waveCanvas');
  if (waveCanvas) {
    const ctx = waveCanvas.getContext('2d');
    let frame = 0;
    const bars = 48;
    function drawWave() {
      waveCanvas.width = waveCanvas.offsetWidth;
      waveCanvas.height = waveCanvas.offsetHeight;
      const w = waveCanvas.width;
      const h = waveCanvas.height;
      ctx.clearRect(0, 0, w, h);
      const barW = w / bars;
      for (let i = 0; i < bars; i++) {
        const amp = Math.sin(i * 0.4 + frame * 0.05) * 0.5 + 0.5;
        const barH = amp * h * 0.8 + h * 0.1;
        const alpha = 0.3 + amp * 0.5;
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        const x = i * barW + barW * 0.1;
        const bw = barW * 0.7;
        ctx.beginPath();
        ctx.roundRect(x, (h - barH) / 2, bw, barH, 3);
        ctx.fill();
      }
      frame++;
      requestAnimationFrame(drawWave);
    }
    drawWave();
  }

  // === Counter Animation ===
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, val, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

});
