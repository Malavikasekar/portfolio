/* ============================================
   ANIMATION ENGINE (Dark Theme)
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ─── Page Loader ───
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) loader.classList.add('loaded');
    }, 2400);

    // ─── Custom Cursor Removed ───

    // ─── Professional Interactive Hero Glow ───
    const hero = document.getElementById('hero');
    const glow = document.getElementById('hero-mouse-glow');
    
    if (hero && glow) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            requestAnimationFrame(() => {
                glow.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
            });
        });
    }

    // ─── Typewriter Effect ───
    const roles = [
        'Creative Coder 💻',
        'Innovative Thinker 🧠',
        'UI/UX Enthusiast ✨',
        'Tech Explorer 🔭',
        'System Architect 🏗️'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterEl = document.getElementById('typewriter');

    function typeWriter() {
        if (!typewriterEl) return;
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000);
                return;
            }
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        const speed = isDeleting ? 40 : 80;
        setTimeout(typeWriter, speed);
    }
    if (typewriterEl) setTimeout(typeWriter, 1800);

    // ─── Navbar Scroll Effect ───
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ─── Active Nav Link ───
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a[data-section]');

    function updateActiveNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ─── Mobile Hamburger ───
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ─── Smooth Scroll ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ─── Scroll-Triggered Animations ───
    const animateElements = document.querySelectorAll('[data-animate]');
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    animateElements.forEach(el => animateObserver.observe(el));

    // ─── Skill Bar Animation ───
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-fill');
                if (fill) fill.classList.add('fill-animate');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-card').forEach(el => skillObserver.observe(el));

    // ─── 3D Card Tilt Effect ───
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Update spotlight position
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            card.style.setProperty('--mouse-x', percentX + '%');
            card.style.setProperty('--mouse-y', percentY + '%');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });

    // ─── Section Divider Visibility ───
    const dividers = document.querySelectorAll('.section-divider');
    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    dividers.forEach(d => dividerObserver.observe(d));

    // ─── Parallax Floating Shapes ───
    const shapes = document.querySelectorAll('.shape');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 0.02;
            shape.style.transform += ` translateY(${scrollY * speed}px)`;
        });
    });
    // ─── 3D Phone Carousel Interaction (Nexus App) ───
    const phones = document.querySelectorAll('.phone-frame');
    
    function rotateCarousel(direction) {
        const leftPhone = document.querySelector('.phone-left');
        const centerPhone = document.querySelector('.phone-center');
        const rightPhone = document.querySelector('.phone-right');
        
        if (!leftPhone || !centerPhone || !rightPhone) return;

        if (direction === 'right') {
            rightPhone.className = 'phone-frame phone-center';
            centerPhone.className = 'phone-frame phone-left';
            leftPhone.className = 'phone-frame phone-right';
        } else {
            leftPhone.className = 'phone-frame phone-center';
            centerPhone.className = 'phone-frame phone-right';
            rightPhone.className = 'phone-frame phone-left';
        }
    }

    // Auto-rotate every 3 seconds
    let carouselInterval = setInterval(() => rotateCarousel('right'), 3000);

    phones.forEach(phone => {
        phone.addEventListener('click', function() {
            if (this.classList.contains('phone-center')) return;
            
            clearInterval(carouselInterval);

            if (this.classList.contains('phone-left')) {
                rotateCarousel('left');
            } else if (this.classList.contains('phone-right')) {
                rotateCarousel('right');
            }
            
            // Resume auto-rotate
            carouselInterval = setInterval(() => rotateCarousel('right'), 3000);
        });
    });


    // ─── Weather App 4-Phone Carousel ───
    const weatherPhones = document.querySelectorAll('.weather-phone');
    
    function rotateWeatherCarousel(direction) {
        const left = document.querySelector('.weather-phone-left');
        const center = document.querySelector('.weather-phone-center');
        const right = document.querySelector('.weather-phone-right');
        const hidden = document.querySelector('.weather-phone-hidden');
        
        if (!left || !center || !right || !hidden) return;

        if (direction === 'right') {
            // Shift right
            right.className = 'phone-frame weather-phone weather-phone-hidden';
            center.className = 'phone-frame weather-phone weather-phone-right';
            left.className = 'phone-frame weather-phone weather-phone-center';
            hidden.className = 'phone-frame weather-phone weather-phone-left';
        } else {
            // Shift left
            left.className = 'phone-frame weather-phone weather-phone-hidden';
            center.className = 'phone-frame weather-phone weather-phone-left';
            right.className = 'phone-frame weather-phone weather-phone-center';
            hidden.className = 'phone-frame weather-phone weather-phone-right';
        }
    }

    let weatherInterval = setInterval(() => rotateWeatherCarousel('right'), 3000);

    weatherPhones.forEach(phone => {
        phone.addEventListener('click', function() {
            if (this.classList.contains('weather-phone-center')) return;
            
            clearInterval(weatherInterval);

            if (this.classList.contains('weather-phone-left')) {
                rotateWeatherCarousel('right'); // Rotate right brings left to center
            } else if (this.classList.contains('weather-phone-right')) {
                rotateWeatherCarousel('left');  // Rotate left brings right to center
            }
            
            // Resume auto-rotate
            weatherInterval = setInterval(() => rotateWeatherCarousel('right'), 3000);
        });
    });

    // ─── Stacked Cards Carousel (Attendance App) ───
    const stackCards = document.querySelectorAll('.stack-card');
    let stackPositions = ['stack-pos-1', 'stack-pos-2', 'stack-pos-3', 'stack-pos-4', 'stack-pos-5'];

    function rotateStack() {
        if (stackCards.length === 0) return;
        
        // Find which card is currently at the front
        let frontCardIndex = -1;
        stackCards.forEach((card, index) => {
            if (card.classList.contains('stack-pos-1')) {
                frontCardIndex = index;
            }
        });

        if (frontCardIndex !== -1) {
            // Animate it out to the right
            stackCards[frontCardIndex].classList.add('stack-out');
            
            setTimeout(() => {
                stackCards[frontCardIndex].classList.remove('stack-out');
                
                // Shift array: last element becomes first
                stackPositions.unshift(stackPositions.pop());
                
                stackCards.forEach((card, index) => {
                    // Remove old positions
                    card.classList.remove('stack-pos-1', 'stack-pos-2', 'stack-pos-3', 'stack-pos-4', 'stack-pos-5');
                    // Add new position
                    card.classList.add(stackPositions[index]);
                });
            }, 400); // Wait for the swipe out animation to finish
        }
    }

    let stackInterval = setInterval(rotateStack, 3000);

    // Allow manual click
    const stackContainer = document.querySelector('.card-stack-container');
    if (stackContainer) {
        stackContainer.addEventListener('click', () => {
            clearInterval(stackInterval);
            rotateStack();
            stackInterval = setInterval(rotateStack, 3000);
        });
    }
});
