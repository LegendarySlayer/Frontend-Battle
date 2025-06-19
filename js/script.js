// Professional JavaScript Implementation
        class FrontendBattleApp {
            constructor() {
                this.initializeApp();
                this.setupEventListeners();
                this.handleTheme();
                this.setupIntersectionObserver();
                this.optimizePerformance();
            }

            initializeApp() {
                // Show content immediately for testing, or add realistic loading time
                window.addEventListener('DOMContentLoaded', () => {
                    setTimeout(() => {
                        this.hideLoader();
                    }, 800);
                });
            }

            hideLoader() {
                const loader = document.getElementById('loader');
                const app = document.getElementById('app');
                
                if (loader && app) {
                    loader.classList.add('fade-out');
                    app.classList.remove('hidden');
                    
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }
            }

            setupEventListeners() {
                // Theme toggle
                const themeToggle = document.getElementById('toggle-theme');
                if (themeToggle) {
                    themeToggle.addEventListener('click', () => this.toggleTheme());
                }

                // Smooth scrolling navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', (e) => this.handleNavClick(e));
                });

                // Navbar scroll effect
                window.addEventListener('scroll', () => this.handleScroll());

                // Keyboard navigation
                document.addEventListener('keydown', (e) => this.handleKeyboard(e));
            }

            toggleTheme() {
                const html = document.documentElement;
                const currentTheme = html.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                const themeToggle = document.getElementById('toggle-theme');
                
                html.setAttribute('data-theme', newTheme);
                
                // Store theme preference (without localStorage as per artifact restrictions)
                if (themeToggle) {
                    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
                }
                
                // Add smooth transition effect
                document.body.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                setTimeout(() => {
                    document.body.style.transition = '';
                }, 300);
            }

            handleTheme() {
                // Default to light theme
                const html = document.documentElement;
                const themeToggle = document.getElementById('toggle-theme');
                
                html.setAttribute('data-theme', 'light');
                if (themeToggle) {
                    themeToggle.textContent = '🌙';
                }
            }

            handleNavClick(e) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbar = document.getElementById('navbar');
                    const navHeight = navbar ? navbar.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    this.updateActiveNavLink(e.target);
                }
            }

            updateActiveNavLink(activeLink) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                activeLink.classList.add('active');
            }

            handleScroll() {
                const navbar = document.getElementById('navbar');
                if (!navbar) return;
                
                const scrollTop = window.pageYOffset;
                
                // Add scrolled class for navbar styling
                if (scrollTop > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Update active nav link based on scroll position
                this.updateActiveNavOnScroll();
            }

            updateActiveNavOnScroll() {
                const sections = document.querySelectorAll('section[id]');
                const navLinks = document.querySelectorAll('.nav-link');
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 80;
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - navHeight - 100;
                    const sectionHeight = section.offsetHeight;
                    
                    if (window.pageYOffset >= sectionTop && 
                        window.pageYOffset < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }

            setupIntersectionObserver() {
                // Animate elements when they come into view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                // Observe sections for animation
                document.querySelectorAll('section').forEach(section => {
                    observer.observe(section);
                });
            }

            optimizePerformance() {
                // Debounce scroll events
                let scrollTimeout;
                const originalHandleScroll = this.handleScroll.bind(this);
                
                this.handleScroll = () => {
                    if (scrollTimeout) {
                        cancelAnimationFrame(scrollTimeout);
                    }
                    scrollTimeout = requestAnimationFrame(originalHandleScroll);
                };
            }


            handleKeyboard(e) {
                // Add keyboard navigation support
                if (e.key === 'Escape') {
                    console.log('Escape pressed - modal close logic placeholder.');
                }

                if (e.key === 't') {
                    this.toggleTheme(); // 'T' key to toggle theme
                }

                if (e.key === 'ArrowDown') {
                    window.scrollBy({ top: 100, behavior: 'smooth' });
                }

                if (e.key === 'ArrowUp') {
                    window.scrollBy({ top: -100, behavior: 'smooth' });
                }
            }
        }

        // Initialize the application
        new FrontendBattleApp();