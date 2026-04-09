/**
 * LampBotics Website JavaScript
 * Minimal vanilla JS for interactions
 * Built by agents. Approved by humans.
 */

(function() {
  'use strict';

  // ==========================================
  // DOM Ready
  // ==========================================
  document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initArchiveToggle();
    initAnimations();
  });

  // ==========================================
  // Navigation
  // ==========================================
  function initNavigation() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');

    if (!nav) return;

    // Mobile menu toggle
    if (toggle && links) {
      toggle.addEventListener('click', function() {
        toggle.classList.toggle('nav__toggle--active');
        links.classList.toggle('nav__links--open');
      });

      // Close menu when clicking a link
      links.querySelectorAll('.nav__link').forEach(function(link) {
        link.addEventListener('click', function() {
          toggle.classList.remove('nav__toggle--active');
          links.classList.remove('nav__links--open');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
          toggle.classList.remove('nav__toggle--active');
          links.classList.remove('nav__links--open');
        }
      });
    }

    // Scroll effect for navigation
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ==========================================
  // Scroll Effects
  // ==========================================
  function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==========================================
  // Archive Toggle
  // ==========================================
  function initArchiveToggle() {
    const toggle = document.querySelector('.archive__toggle');
    const content = document.querySelector('.archive__content');

    if (!toggle || !content) return;

    toggle.addEventListener('click', function() {
      toggle.classList.toggle('archive__toggle--open');
      content.classList.toggle('archive__content--open');

      // Update aria-expanded
      const isOpen = content.classList.contains('archive__content--open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // ==========================================
  // Scroll Animations (Intersection Observer)
  // ==========================================
  function initAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(function(el) {
      el.style.opacity = '0';
      observer.observe(el);
    });

    // Observe cards
    document.querySelectorAll('.card').forEach(function(card) {
      card.style.opacity = '0';
      observer.observe(card);
    });
  }

  // ==========================================
  // YouTube Video Handling
  // ==========================================
  window.initYouTubePlayer = function(containerId, videoId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId +
      '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=' + videoId +
      '&playsinline=1&modestbranding=1&enablejsapi=1&cc_load_policy=0&iv_load_policy=3&disablekb=1';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = false;
    iframe.loading = 'lazy';

    container.appendChild(iframe);
  };

  // ==========================================
  // Lazy Load YouTube Videos
  // ==========================================
  window.addEventListener('load', function() {
    // Initialize hero video after page load for better FCP
    const heroVideo = document.querySelector('[data-youtube-hero]');
    if (heroVideo) {
      const videoId = heroVideo.dataset.youtubeHero;
      initYouTubePlayer(heroVideo.id, videoId);
    }

    // Use Intersection Observer for below-fold videos
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const container = entry.target;
            const videoId = container.dataset.youtubeLazy;
            if (videoId) {
              initYouTubePlayer(container.id, videoId);
            }
            videoObserver.unobserve(container);
          }
        });
      }, { rootMargin: '200px' });

      document.querySelectorAll('[data-youtube-lazy]').forEach(function(el) {
        videoObserver.observe(el);
      });
    }
  });

})();
