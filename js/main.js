/* ============================================
   Akram Mohamed El-Sayed | Portfolio — JS
   Language toggle, scroll effects, typing
   ============================================ */

(function () {
  'use strict';

  // ─── Language Data ───
  const translations = {
    en: {}, // empty — English is the default in HTML data-en attributes
    ar: {
      'Home': 'الرئيسية',
      'About': 'عني',
      'Skills': 'المهارات',
      'Education': 'التعليم',
      'Projects': 'المشاريع',
      'Contact': 'تواصل',
      'Hello, I\'m': 'مرحباً، أنا',
      'Front-End Developer': 'مطور واجهات أمامية',
      'View My Skills': 'عرض مهاراتي',
      'Contact Me': 'تواصل معي',
      'About Me': 'عني',
      'My Skills': 'مهاراتي',
      'Technologies I work with and continue to grow': 'التقنيات التي أعمل معها وأتابع تعلمها',
      'Structuring & semantics': 'الهيكلة والدلالات',
      'Styling & animations': 'التنسيق والرسوم المتحركة',
      'Logic & algorithms': 'المنطق والخوارزميات',
      'Front-End Dev': 'تطوير الواجهات',
      'Building interactive UIs': 'بناء واجهات تفاعلية',
      'Interactivity & scripting': 'التفاعلية والبرمجة',
      'Rapid responsive layout': 'تخطيط متجاوب سريع',
      'Education': 'التعليم',
      'My academic journey and milestones': 'رحلتي الأكاديمية ومحطاتي',
      'Projects': 'المشاريع',
      'Work I\'m proud of (coming soon)': 'أعمال أفخر بها (قريباً)',
      'Get In Touch': 'تواصل معي',
      'Have a question or want to collaborate? Reach out!': 'لديك سؤال أو تريد التعاون؟ تواصل!',
      'Let\'s Connect': 'لنتمتع بالاتصال',
      'I\'m always open to discussing new projects, creative ideas, or opportunities to learn and grow together.': 'أنا دائماً منفتح لمناقشة مشاريع جديدة، أفكار إبداعية، أو فرص للتعلم والنمو معاً.',
      'Your Name': 'اسمك',
      'Your Email': 'بريدك',
      'Subject': 'الموضوع',
      'Message': 'الرسالة',
      'Send Message': 'أرسل الرسالة',
      'Project One': 'المشروع الأول',
      'A description of your upcoming project will appear here. Stay tuned!': 'سيظهر وصف مشروعك القادم هنا. ترقبوا!',
      'Project Two': 'المشروع الثاني',
      'Another exciting project on its way. Check back soon!': 'مشروع مثير آخر في الطريق. عُد قريباً!',
      'Project Three': 'المشروع الثالث',
      'More projects coming soon as I continue learning and building.': 'المزيد من المشاريع قريباً مع استمرار التعلم والبناء.',
      '© 2025 Akram Mohamed El-Sayed. Built with': '© 2025 أكلام محمد السيد. بُني بـ',
      'and Bootstrap 5': 'و Bootstrap 5',
    }
  };

  let currentLang = 'en';

  // ─── Language Toggle ───
  const langToggle = document.getElementById('langToggle');
  const langLabel  = document.getElementById('langLabel');

  langToggle.addEventListener('click', function () {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    applyLanguage(currentLang);
  });

  function applyLanguage(lang) {
    const html = document.documentElement;

    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
      langLabel.textContent = 'EN';
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
      langLabel.textContent = 'AR';
    }

    // Update all elements with data-en / data-ar
    document.querySelectorAll('[data-en][data-ar]').forEach(function (el) {
      const text = el.getAttribute('data-' + lang);
      if (text) el.innerHTML = text;
    });

    // Also handle plain text node swaps from translation map
    const map = translations[lang];
    if (map) {
      Object.entries(map).forEach(function ([en, tr]) {
        document.querySelectorAll('[data-en="' + en + '"]').forEach(function (el) {
          el.innerHTML = tr;
        });
      });
    }
  }

  // ─── Navbar Scroll Effect ───
  const navbar = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrolled = window.scrollY > 80;
    navbar.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('show', window.scrollY > 400);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── Scroll Reveal (IntersectionObserver) ───
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  // ─── Skill Progress Bars ───
  const progressBars = document.querySelectorAll('.progress-bar-fill');

  if ('IntersectionObserver' in window) {
    const barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth + '%';
          bar.classList.add('animated');
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(function (bar) { barObserver.observe(bar); });
  } else {
    progressBars.forEach(function (bar) {
      bar.style.width = bar.getAttribute('data-width') + '%';
      bar.classList.add('animated');
    });
  }

  // ─── Photo Loading ───
  // Photo is already in the HTML as an img tag
  const heroPhoto = document.getElementById('heroPhoto');
  const img = heroPhoto.querySelector('img');
  img.onerror = function () {
    heroPhoto.innerHTML = '<i class="bi bi-person-fill"></i><span class="photo-placeholder-text">Your Photo</span>';
    console.log('Photo not found — placeholder shown. Ensure assets/photos/portrait.jpg exists.');
  };

  // ─── Typing Effect for Hero Role ───
  const roles = [
    'Front-End Developer',
    'HTML & CSS Enthusiast',
    'C++ Learner',
    'Future Full-Stack Developer',
    'Creative Problem Solver'
  ];

  const roleEl = document.querySelector('.hero-role');
  if (roleEl && currentLang === 'en') {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeRole() {
      const current = roles[roleIndex];

      if (isDeleting) {
        roleEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        roleEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeRole, typeSpeed);
    }

    typeRole();
  }

  // ─── Smooth Scroll for Nav Links ───
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        const navCollapse = document.getElementById('navbarNav');
        if (navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getInstance(navCollapse)?.hide();
        }
      }
    });
  });

})();
