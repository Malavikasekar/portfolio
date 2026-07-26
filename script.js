/* ============================================
   ANIMATION ENGINE (Dark Theme)
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ─── Page Loader ───
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) loader.classList.add('loaded');
    }, 600);

    // ─── Custom Cursor ───
    const cursorGlow = document.getElementById('cursor-glow');
    const cursorDot = document.getElementById('cursor-dot');
    let mouseX = 0, mouseY = 0;
    let cursorGlowX = 0, cursorGlowY = 0;
    let cursorDotX = 0, cursorDotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        if(cursorGlow && cursorDot) {
            // Smooth follow for glow
            cursorGlowX += (mouseX - cursorGlowX) * 0.08;
            cursorGlowY += (mouseY - cursorGlowY) * 0.08;
            cursorGlow.style.left = cursorGlowX + 'px';
            cursorGlow.style.top = cursorGlowY + 'px';

            // Faster follow for dot
            cursorDotX += (mouseX - cursorDotX) * 0.2;
            cursorDotY += (mouseY - cursorDotY) * 0.2;
            cursorDot.style.left = cursorDotX + 'px';
            cursorDot.style.top = cursorDotY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state for cursor
    const hoverables = document.querySelectorAll('a, button, .tag, .interest-chip, .btn, .chip, .mini-chip, .pc-github');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => { 
            if(cursorDot) cursorDot.classList.add('hovering'); 
            if(cursorGlow) cursorGlow.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => { 
            if(cursorDot) cursorDot.classList.remove('hovering'); 
            if(cursorGlow) cursorGlow.classList.remove('hovering');
        });
    });

    // ─── Particle Canvas ───
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let canvasMouseX = 0, canvasMouseY = 0;

        function resizeCanvas() {
            const hero = document.getElementById('hero');
            if (hero) {
                canvas.width = hero.offsetWidth;
                canvas.height = hero.offsetHeight;
            }
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = ['rgba(168, 85, 247,', 'rgba(244, 114, 182,', 'rgba(135, 206, 235,'][Math.floor(Math.random() * 3)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse repulsion
                const dx = this.x - canvasMouseX;
                const dy = this.y - canvasMouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    this.x += (dx / dist) * force * 2;
                    this.y += (dy / dist) * force * 2;
                }

                // Wrap around
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.opacity + ')';
                ctx.fill();
            }
        }

        // Create particles
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // Track mouse for particles
        document.getElementById('hero').addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            canvasMouseX = e.clientX - rect.left;
            canvasMouseY = e.clientY - rect.top;
        });
    }

    // ─── Typewriter Effect ───
    const roles = [
        'Python Developer 🐍',
        'Machine Learning Enthusiast 🤖',
        'Problem Solver 💡',
        'Web Developer 🌐',
        'Quick Learner 🚀'
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
});
