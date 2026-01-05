        // ============ PRELOADER ============
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1800);
        });

        // ============ CUSTOM CURSOR ============
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Cursor hover effect
        const hoverElements = document.querySelectorAll('a, button, .feature-card, .team-card, .faq-item, .token-item, .roadmap-content');
        
        hoverElements.forEach(elem => {
            elem.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            elem.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // ============ NAVBAR SCROLL EFFECT ============
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ============ THEME TOGGLE ============
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // ============ MOBILE MENU ============
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
        });

        mobileNavOverlay.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
            });
        });

        // ============ SCROLL REVEAL ANIMATION ============
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));

        // ============ COUNTER ANIMATION ============
        const counters = document.querySelectorAll('.stat-number');
        let countersAnimated = false;

        const animateCounters = () => {
            if (countersAnimated) return;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const suffix = counter.textContent.replace(/[0-9]/g, '');
                let current = 0;
                const increment = target / 50;
                const duration = 50;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + suffix;
                        setTimeout(updateCounter, duration);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };

                updateCounter();
            });
            
            countersAnimated = true;
        };

        // Trigger counter animation when hero section is visible
        const heroSection = document.querySelector('.hero');
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(animateCounters, 500);
            }
        }, { threshold: 0.5 });

        counterObserver.observe(heroSection);

        // ============ FAQ ACCORDION ============
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // ============ SCROLL TO TOP ============
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ============ GENERATE PARTICLES ============
        const bgParticles = document.querySelector('.bg-particles');

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            bgParticles.appendChild(particle);
        }

        // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // ============ PARALLAX EFFECT FOR GRADIENT ORBS ============
        const orbs = document.querySelectorAll('.gradient-orb');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            orbs.forEach((orb, index) => {
                const speed = 0.1 * (index + 1);
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });

        // ============ ACTIVE NAV LINK HIGHLIGHT ============
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + current) {
                    link.style.color = 'var(--accent-primary)';
                }
            });
        });

        // ============ PERFORMANCE: DEBOUNCE SCROLL EVENTS ============
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // ============ LAZY LOADING FOR IMAGES ============
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('.lazy-load');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loaded');
                        imageObserver.unobserve(entry.target);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }

        // ============ KEYBOARD ACCESSIBILITY ============
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
            }
        });

        console.log('🚀 NexaChain - Premium Web3 Template Loaded Successfully!');
