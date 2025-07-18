// ===== PERFECT BLENDING RESPONSIVE ENHANCEMENT SYSTEM =====

// Advanced Responsive Management System
class ResponsiveManager {
    constructor() {
        this.init();
        this.setupEventListeners();
    }

    init() {
        this.detectDeviceType();
        this.setupViewportHandler();
        this.initScrollEffects();
        this.setupIntersectionObserver();
        this.enhancePerformance();
        this.setupAccessibility();
    }

    // Device Detection and Responsive Breakpoints
    detectDeviceType() {
        const breakpoints = {
            mobile: 480,
            tablet: 768,
            desktop: 1024,
            large: 1440
        };

        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Update CSS custom properties for responsive design
        document.documentElement.style.setProperty('--viewport-width', `${width}px`);
        document.documentElement.style.setProperty('--viewport-height', `${height}px`);
        
        // Add device class to body
        document.body.classList.remove('is-mobile', 'is-tablet', 'is-desktop', 'is-large');
        
        if (width <= breakpoints.mobile) {
            document.body.classList.add('is-mobile');
        } else if (width <= breakpoints.tablet) {
            document.body.classList.add('is-tablet');
        } else if (width <= breakpoints.desktop) {
            document.body.classList.add('is-desktop');
        } else {
            document.body.classList.add('is-large');
        }

        // Detect touch capability
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
        } else {
            document.body.classList.add('no-touch');
        }
    }

    // Advanced Viewport Handler
    setupViewportHandler() {
        let resizeTimer;
        
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.detectDeviceType();
                this.optimizeForViewport();
                this.updateFluidTypography();
            }, 100);
        };

        window.addEventListener('resize', handleResize);
        this.optimizeForViewport();
    }

    // Viewport Optimization
    optimizeForViewport() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Dynamic font scaling
        const vw = window.innerWidth;
        const scaleFactor = Math.min(Math.max(vw / 1200, 0.8), 1.2);
        document.documentElement.style.setProperty('--scale-factor', scaleFactor);
    }

    // Fluid Typography System
    updateFluidTypography() {
        const minWidth = 320;
        const maxWidth = 1200;
        const currentWidth = window.innerWidth;
        
        const clampedWidth = Math.min(Math.max(currentWidth, minWidth), maxWidth);
        const fontScale = 0.8 + (clampedWidth - minWidth) / (maxWidth - minWidth) * 0.4;
        
        document.documentElement.style.setProperty('--font-scale', fontScale);
    }
}

// Advanced Scroll Effects with Perfect Blending
class ScrollEffectsManager {
    constructor() {
        this.lastScrollY = 0;
        this.ticking = false;
        this.setupScrollEffects();
    }

    setupScrollEffects() {
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        this.updateScrollEffects();
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(this.updateScrollEffects.bind(this));
            this.ticking = true;
        }
    }

    updateScrollEffects() {
        const scrollY = window.pageYOffset;
        const scrollDirection = scrollY > this.lastScrollY ? 'down' : 'up';
        const scrollProgress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1);
        
        // Update navigation with scroll effects
        this.updateNavigation(scrollY, scrollDirection);
        
        // Parallax and blur effects
        this.updateParallaxEffects(scrollY, scrollProgress);
        
        // Update scroll progress indicator
        this.updateScrollProgress(scrollProgress);
        
        this.lastScrollY = scrollY;
        this.ticking = false;
    }

    updateNavigation(scrollY, direction) {
        const nav = document.querySelector('nav');
        if (!nav) return;

        // Add scrolled class for glassmorphism effect
        nav.classList.toggle('scrolled', scrollY > 100);
        
        // Hide/show navigation on scroll
        if (scrollY > 300) {
            nav.classList.toggle('nav-hidden', direction === 'down');
        } else {
            nav.classList.remove('nav-hidden');
        }
    }

    updateParallaxEffects(scrollY, progress) {
        // Dynamic background movement
        const bgLayer = document.body;
        if (bgLayer) {
            const moveY = scrollY * 0.5;
            const rotation = progress * 5;
            bgLayer.style.setProperty('--scroll-y', `${moveY}px`);
            bgLayer.style.setProperty('--scroll-rotation', `${rotation}deg`);
        }

        // Update blur intensity based on scroll
        const blurIntensity = Math.min(scrollY / 500 * 20, 20);
        document.documentElement.style.setProperty('--dynamic-blur', `blur(${blurIntensity}px)`);
    }

    updateScrollProgress(progress) {
        // Create or update scroll progress indicator
        let indicator = document.querySelector('.scroll-progress');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'scroll-progress';
            document.body.appendChild(indicator);
        }
        
        indicator.style.transform = `scaleX(${progress})`;
    }
}

// Intersection Observer for Advanced Animations
class AnimationManager {
    constructor() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-50px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.handleIntersection(entry);
            });
        }, observerOptions);

        // Observe all sections and animation elements
        document.querySelectorAll('section, .animate-on-scroll').forEach(el => {
            this.observer.observe(el);
        });
    }

    handleIntersection(entry) {
        const element = entry.target;
        const ratio = entry.intersectionRatio;
        
        // Add visible class for CSS animations
        if (ratio > 0.25) {
            element.classList.add('in-view');
        } else {
            element.classList.remove('in-view');
        }

        // Advanced blur and opacity effects
        const opacity = Math.min(ratio * 2, 1);
        const blur = Math.max(20 - (ratio * 20), 0);
        
        element.style.setProperty('--element-opacity', opacity);
        element.style.setProperty('--element-blur', `blur(${blur}px)`);
    }

    setupHoverEffects() {
        // Enhanced hover effects for cards and buttons
        document.querySelectorAll('.project-card, .service-card, .hero-buttons a').forEach(element => {
            this.addAdvancedHover(element);
        });
    }

    addAdvancedHover(element) {
        element.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            e.target.style.setProperty('--mouse-x', `${x}px`);
            e.target.style.setProperty('--mouse-y', `${y}px`);
            e.target.classList.add('enhanced-hover');
        });

        element.addEventListener('mouseleave', () => {
            element.classList.remove('enhanced-hover');
        });

        element.addEventListener('mousemove', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            e.target.style.setProperty('--mouse-x', `${x}px`);
            e.target.style.setProperty('--mouse-y', `${y}px`);
        });
    }
}

// Mobile Optimization Manager
class MobileOptimizer {
    constructor() {
        this.setupTouchOptimizations();
        this.setupMobileMenu();
        this.optimizeImages();
    }

    setupTouchOptimizations() {
        // Prevent zoom on double tap
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        });

        // Optimize touch targets
        document.querySelectorAll('a, button, .clickable').forEach(element => {
            element.style.minHeight = '44px';
            element.style.minWidth = '44px';
        });
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('mobile-menu-open');
                menuToggle.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = nav.classList.contains('mobile-menu-open') ? 'hidden' : '';
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && nav.classList.contains('mobile-menu-open')) {
                    nav.classList.remove('mobile-menu-open');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    optimizeImages() {
        // Lazy loading for better performance
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }
}

// Performance Optimizer
class PerformanceOptimizer {
    constructor() {
        this.setupPerformanceOptimizations();
        this.monitorPerformance();
    }

    setupPerformanceOptimizations() {
        // Debounce scroll events
        this.debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };

        // Throttle resize events
        this.throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };
    }

    monitorPerformance() {
        // Monitor frame rate
        let lastTime = performance.now();
        let frames = 0;
        
        const checkFrameRate = (currentTime) => {
            frames++;
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                
                // Adjust effects based on performance
                if (fps < 30) {
                    document.body.classList.add('low-performance');
                } else {
                    document.body.classList.remove('low-performance');
                }
                
                frames = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(checkFrameRate);
        };
        
        requestAnimationFrame(checkFrameRate);
    }
}

// ===== ENHANCED ABOUT SECTION INTERACTIONS =====

class AboutSectionManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypingAnimation();
        this.setupSkillsTabs();
        this.setupIntersectionObserver();
        this.setupSkillBars();
        this.setupSpecialtyHovers();
        }

        setupValidationRules() {
        const validationRules = {
            name: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Please enter a valid name (letters and spaces only)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            subject: {
                required: true,
                message: 'Please select a project type'
            },
            message: {
                required: true,
                minLength: 10,
                message: 'Please provide more details (at least 10 characters)'
            }
        };

        this.validationRules = validationRules;
    }

    validateField(field) {
        const name = field.name;
        const value = field.value.trim();
        const rules = this.validationRules[name];
        
        if (!rules) return { isValid: true };

        // Required validation
        if (rules.required && !value) {
            return {
                isValid: false,
                message: 'This field is required'
            };
        }

        // Min length validation
        if (rules.minLength && value.length < rules.minLength) {
            return {
                isValid: false,
                message: `Minimum ${rules.minLength} characters required`
            };
        }

        // Pattern validation
        if (rules.pattern && value && !rules.pattern.test(value)) {
            return {
                isValid: false,
                message: rules.message
            };
        }

        return { isValid: true };
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
        field.classList.add('error');
        
        // Add error animation
        errorElement.style.opacity = '0';
        errorElement.style.transform = 'translateY(-10px)';
        
        requestAnimationFrame(() => {
            errorElement.style.transition = 'all 0.3s ease';
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        });
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }

    setupRealTimeValidation() {
        this.inputs?.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', () => {
                const validation = this.validateField(input);
                if (!validation.isValid) {
                    this.showFieldError(input, validation.message);
                } else {
                    this.clearFieldError(input);
                    input.classList.add('valid');
                }
            });

            // Clear error on focus
            input.addEventListener('focus', () => {
                this.clearFieldError(input);
                input.classList.remove('valid');
            });

            // Real-time validation for specific fields
            if (input.type === 'email') {
                input.addEventListener('input', this.debounce(() => {
                    if (input.value.includes('@')) {
                        const validation = this.validateField(input);
                        if (validation.isValid) {
                            input.classList.add('valid');
                        } else {
                            input.classList.remove('valid');
                        }
                    }
                }, 500));
            }
        });
    }

    enhanceFormInteractions() {
        // Add floating label effect
        this.inputs?.forEach(input => {
            const label = input.parentNode.querySelector('label');
            if (label && (input.type !== 'select-one')) {
                this.setupFloatingLabel(input, label);
            }
        });

        // Enhance select dropdowns
        const selects = this.form?.querySelectorAll('select');
        selects?.forEach(select => this.enhanceSelect(select));

        // Add form progress indicator
        this.addProgressIndicator();
    }

    setupFloatingLabel(input, label) {
        const checkValue = () => {
            if (input.value || input === document.activeElement) {
                label.classList.add('floating');
            } else {
                label.classList.remove('floating');
            }
        };

        input.addEventListener('focus', checkValue);
        input.addEventListener('blur', checkValue);
        input.addEventListener('input', checkValue);
        
        // Initial check
        checkValue();
    }

    enhanceSelect(select) {
        select.addEventListener('change', () => {
            if (select.value) {
                select.classList.add('has-value');
            } else {
                select.classList.remove('has-value');
            }
        });
    }

    addProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'form-progress';
        progressBar.innerHTML = '<div class="form-progress-bar"></div>';
        
        this.form.insertBefore(progressBar, this.form.firstChild);
        
        // Update progress based on filled fields
        this.inputs?.forEach(input => {
            input.addEventListener('input', () => this.updateProgress());
            input.addEventListener('change', () => this.updateProgress());
        });
    }

    updateProgress() {
        const totalFields = this.inputs.length;
        const filledFields = Array.from(this.inputs).filter(input => 
            input.value.trim() !== '' && input.value !== ''
        ).length;
        
        const progress = (filledFields / totalFields) * 100;
        const progressBar = this.form.querySelector('.form-progress-bar');
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
            
            // Add color based on progress
            if (progress < 30) {
                progressBar.className = 'form-progress-bar low';
            } else if (progress < 70) {
                progressBar.className = 'form-progress-bar medium';
            } else {
                progressBar.className = 'form-progress-bar high';
            }
        }
    }

    setupFormSubmission() {
        this.form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            let isFormValid = true;
            this.inputs?.forEach(input => {
                const validation = this.validateField(input);
                if (!validation.isValid) {
                    this.showFieldError(input, validation.message);
                    isFormValid = false;
                } else {
                    this.clearFieldError(input);
                }
            });

            if (!isFormValid) {
                this.showSubmissionError('Please fix the errors above');
                return;
            }

            // Show loading state
            this.setLoadingState(true);

            try {
                // Simulate form submission (replace with actual submission logic)
                await this.submitForm();
                this.showSuccessMessage();
            } catch (error) {
                this.showSubmissionError('Failed to send message. Please try again.');
            } finally {
                this.setLoadingState(false);
            }
        });
    }

    async submitForm() {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Replace this with actual form submission logic
                const formData = new FormData(this.form);
                console.log('Form Data:', Object.fromEntries(formData));
                
                // Simulate success (90% success rate for demo)
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitBtn?.classList.add('loading');
            this.submitBtn?.setAttribute('disabled', 'true');
        } else {
            this.submitBtn?.classList.remove('loading');
            this.submitBtn?.removeAttribute('disabled');
        }
    }

    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                </svg>
            </div>
            <h4>Message Sent Successfully!</h4>
            <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
        `;
        
        this.form.appendChild(successMessage);
        
        // Reset form after showing success
        setTimeout(() => {
            this.form.reset();
            this.updateProgress();
            successMessage.remove();
            this.inputs?.forEach(input => {
                input.classList.remove('valid', 'error');
                this.clearFieldError(input);
            });
        }, 5000);
    }

    showSubmissionError(message) {
        // Remove existing error
        const existingError = this.form.querySelector('.form-error');
        if (existingError) existingError.remove();
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.innerHTML = `
            <div class="error-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
                </svg>
            </div>
            <span>${message}</span>
        `;
        
        this.submitBtn?.parentNode.insertBefore(errorMessage, this.submitBtn);
        
        // Auto remove after 5 seconds
        setTimeout(() => errorMessage.remove(), 5000);
    }

    debounce(func, wait) {
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
}

// ===== CONTACT SECTION ANIMATIONS =====

class ContactAnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupStatsCounterAnimation();
        this.setupMethodHoverEffects();
        this.setupFormAnimations();
    }

    setupStatsCounterAnimation() {
        const stats = document.querySelectorAll('.contact-stat .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const text = element.textContent;
        const hasPercent = text.includes('%');
        const hasHours = text.includes('h');
        const number = parseFloat(text.replace(/[^\d.]/g, ''));
        
        let current = 0;
        const increment = number / 60; // 60 frames for smooth animation
        
        const animate = () => {
            current += increment;
            
            if (current >= number) {
                current = number;
            }
            
            let displayValue;
            if (hasPercent) {
                displayValue = Math.round(current) + '%';
            } else if (hasHours) {
                displayValue = Math.round(current) + 'h';
            } else {
                displayValue = current.toFixed(1);
            }
            
            element.textContent = displayValue;
            
            if (current < number) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    setupMethodHoverEffects() {
        const methods = document.querySelectorAll('.contact-method');
        
        methods.forEach(method => {
            method.addEventListener('mouseenter', () => {
                // Add ripple effect
                this.createRippleEffect(method);
            });
        });
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'contact-ripple';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        element.appendChild(ripple);
        
        // Animate ripple
        requestAnimationFrame(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(1)';
            ripple.style.opacity = '0';
        });
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
    }

    setupFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        
        // Stagger animation for form groups
        formGroups.forEach((group, index) => {
            group.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// ===== ENHANCED ABOUT SECTION INTERACTIONS =====

class AboutSectionManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypingAnimation();
        this.setupSkillsTabs();
        this.setupIntersectionObserver();
        this.setupSkillBars();
        this.setupSpecialtyHovers();
    }

    // Typing Animation for Subtitle
    setupTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) return;

        const text = typingElement.getAttribute('data-text') || 'Crafting Digital Experiences with Passion and Precision';
        typingElement.textContent = '';
        
        let index = 0;
        const typeSpeed = 80;
        const pauseTime = 2000;
        
        const typeText = () => {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, typeSpeed);
            } else {
                setTimeout(() => {
                    index = 0;
                    typingElement.textContent = '';
                    setTimeout(typeText, 500);
                }, pauseTime);
            }
        };

        // Start typing after page load
        setTimeout(typeText, 1000);
    }

    // Skills Tabs Functionality
    setupSkillsTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const skillCategories = document.querySelectorAll('.skill-category');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                // Remove active class from all tabs and categories
                tabButtons.forEach(btn => btn.classList.remove('active'));
                skillCategories.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding category
                button.classList.add('active');
                const targetCategory = document.querySelector(`[data-category="${category}"]`);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                    this.animateSkillBars(targetCategory);
                }
            });
        });
    }

    // Intersection Observer for Animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    // Animate story elements
                    if (target.classList.contains('story-paragraph')) {
                        target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    }
                    
                    // Animate specialty items
                    if (target.classList.contains('specialty-item')) {
                        const delay = Array.from(target.parentNode.children).indexOf(target) * 0.1;
                        target.style.animation = `fadeInUp 0.6s ease-out ${delay}s forwards`;
                    }
                    
                    // Animate achievement cards
                    if (target.classList.contains('achievement-card')) {
                        const delay = Array.from(target.parentNode.children).indexOf(target) * 0.15;
                        target.style.animation = `fadeInUp 0.7s ease-out ${delay}s forwards`;
                    }
                    
                    // Animate active skill category
                    if (target.classList.contains('skill-category') && target.classList.contains('active')) {
                        this.animateSkillBars(target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToObserve = [
            ...document.querySelectorAll('.story-paragraph'),
            ...document.querySelectorAll('.specialty-item'),
            ...document.querySelectorAll('.achievement-card'),
            ...document.querySelectorAll('.skill-category')
        ];

        elementsToObserve.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    // Skill Bar Animations
    setupSkillBars() {
        // Initial animation for the first visible category
        const activeCategory = document.querySelector('.skill-category.active');
        if (activeCategory) {
            setTimeout(() => this.animateSkillBars(activeCategory), 500);
        }
    }

    animateSkillBars(category) {
        const skillBars = category.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transform = 'scaleX(1)';
                
                // Add counter animation
                const skillItem = bar.closest('.skill-item');
                const level = parseInt(skillItem.getAttribute('data-level'));
                this.animateCounter(skillItem, level);
                
            }, index * 100);
        });
    }

    animateCounter(skillItem, targetLevel) {
        const levelElement = skillItem.querySelector('.skill-level');
        if (!levelElement) return;

        let currentLevel = 0;
        const increment = targetLevel / 50; // Animate over ~1 second
        
        const updateCounter = () => {
            currentLevel += increment;
            if (currentLevel >= targetLevel) {
                currentLevel = targetLevel;
                levelElement.textContent = this.getLevelText(targetLevel);
            } else {
                levelElement.textContent = `${Math.floor(currentLevel)}%`;
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    }

    getLevelText(level) {
        if (level >= 95) return 'Expert';
        if (level >= 85) return 'Advanced';
        if (level >= 70) return 'Intermediate';
        return 'Beginner';
    }

    // Specialty Items Hover Effects
    setupSpecialtyHovers() {
        const specialtyItems = document.querySelectorAll('.specialty-item');
        
        specialtyItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.createParticleEffect(item);
            });
        });
    }

    createParticleEffect(element) {
        const rect = element.getBoundingClientRect();
        const particles = 6;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #8bc34a;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                opacity: 1;
                animation: particleFloat 1.5s ease-out forwards;
            `;
            
            const angle = (360 / particles) * i;
            const distance = 50 + Math.random() * 30;
            
            particle.style.setProperty('--angle', angle + 'deg');
            particle.style.setProperty('--distance', distance + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1500);
        }
    }
}

// Enhanced Responsive Utilities for About Section
class AboutResponsiveManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileOptimizations();
        this.setupTabletOptimizations();
        this.setupDesktopOptimizations();
        this.setupTouchOptimizations();
        this.handleResize();
    }

    setupMobileOptimizations() {
        if (window.innerWidth <= 768) {
            this.optimizeForMobile();
        }
    }

    optimizeForMobile() {
        // Reduce animation complexity on mobile
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.style.setProperty('--animation-duration', '0.3s');
        }

        // Optimize skill bars for touch
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('touchstart', () => {
                item.classList.add('touch-active');
            });
            
            item.addEventListener('touchend', () => {
                setTimeout(() => item.classList.remove('touch-active'), 300);
            });
        });
    }

    setupTabletOptimizations() {
        if (window.innerWidth > 768 && window.innerWidth <= 1024) {
            this.optimizeForTablet();
        }
    }

    optimizeForTablet() {
        // Adjust spacing for tablet
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            aboutContent.style.setProperty('--tablet-spacing', '3rem');
        }
    }

    setupDesktopOptimizations() {
        if (window.innerWidth > 1024) {
            this.optimizeForDesktop();
        }
    }

    optimizeForDesktop() {
        // Enable advanced hover effects on desktop
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.classList.add('desktop-enhanced');
        }
    }

    setupTouchOptimizations() {
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Optimize touch interactions
            const interactiveElements = document.querySelectorAll('.tab-button, .specialty-item, .achievement-card');
            interactiveElements.forEach(element => {
                element.style.minHeight = '44px';
                element.style.minWidth = '44px';
            });
        }
    }

    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.init();
            }, 250);
        });
    }
}

// Performance Optimizations for About Section
class AboutPerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.optimizeAnimations();
        this.setupPreferredReducedMotion();
    }

    setupLazyLoading() {
        // Lazy load skill progress animations
        const skillCategories = document.querySelectorAll('.skill-category:not(.active)');
        skillCategories.forEach(category => {
            category.style.willChange = 'auto';
        });
    }

    optimizeAnimations() {
        // Use CSS transforms for better performance
        const animatedElements = document.querySelectorAll('.skill-progress, .achievement-card, .specialty-item');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }

    setupPreferredReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                #about *, #about *::before, #about *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===== FIXED STANDALONE SKILLS TAB FUNCTIONALITY =====
// This ensures the tab switching works properly

(function() {
    'use strict';
    
    let skillsTabsInitialized = false;
    
    function initSkillsTabs() {
        if (skillsTabsInitialized) return;
        
        const tabButtons = document.querySelectorAll('.tab-button');
        const skillCategories = document.querySelectorAll('.skill-category');
        
        console.log('Initializing skills tabs...');
        console.log('Found tab buttons:', tabButtons.length);
        console.log('Found skill categories:', skillCategories.length);
        
        if (tabButtons.length === 0 || skillCategories.length === 0) {
            console.warn('Skills tabs or categories not found!');
            return;
        }

        // Remove existing event listeners to prevent duplicates
        tabButtons.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        });

        // Get fresh references after cloning
        const freshTabButtons = document.querySelectorAll('.tab-button');

        freshTabButtons.forEach((button, index) => {
            console.log(`Setting up tab button ${index}:`, button.getAttribute('data-category'));
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const category = this.getAttribute('data-category');
                console.log('Tab clicked:', category);
                
                // Remove active class from all tabs
                freshTabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                
                // Remove active class from all categories
                skillCategories.forEach(cat => {
                    cat.classList.remove('active');
                    cat.style.display = 'none';
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Show corresponding category
                const targetCategory = document.querySelector(`.skill-category[data-category="${category}"]`);
                console.log('Target category:', targetCategory);
                
                if (targetCategory) {
                    targetCategory.classList.add('active');
                    targetCategory.style.display = 'block';
                    
                    // Animate skill bars
                    setTimeout(() => {
                        animateSkillBarsInCategory(targetCategory);
                    }, 100);
                    
                    console.log('Category switched to:', category);
                } else {
                    console.error('Target category not found for:', category);
                }
            });
        });
        
        // Ensure the first tab is active on load
        const firstTab = freshTabButtons[0];
        const firstCategory = skillCategories[0];
        
        if (firstTab && firstCategory) {
            firstTab.classList.add('active');
            firstTab.setAttribute('aria-selected', 'true');
            firstCategory.classList.add('active');
            firstCategory.style.display = 'block';
            
            setTimeout(() => {
                animateSkillBarsInCategory(firstCategory);
            }, 500);
        }
        
        skillsTabsInitialized = true;
        console.log('Skills tabs initialized successfully!');
    }
    
    function animateSkillBarsInCategory(category) {
        const skillBars = category.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            // Reset animation
            bar.style.transform = 'scaleX(0)';
            bar.style.transition = 'none';
            
            setTimeout(() => {
                bar.style.transition = 'transform 1s ease-out';
                bar.style.transform = 'scaleX(1)';
            }, index * 150 + 100);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkillsTabs);
    } else {
        initSkillsTabs();
    }
    
    // Also initialize after a short delay to ensure all elements are rendered
    setTimeout(initSkillsTabs, 200);
    
    // Make functions global for debugging
    window.debugSkillsTabs = function() {
        console.log('=== Skills Tabs Debug Info ===');
        console.log('Tab buttons:', document.querySelectorAll('.tab-button'));
        console.log('Skill categories:', document.querySelectorAll('.skill-category'));
        console.log('Active tab:', document.querySelector('.tab-button.active'));
        console.log('Active category:', document.querySelector('.skill-category.active'));
    };
    
})();

// Call debug function to check initial state
setTimeout(() => {
    if (typeof window.debugSkillsTabs === 'function') {
        window.debugSkillsTabs();
    }
}, 1000);

// Initialize All Systems
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all enhancement systems
    new ResponsiveManager();
    new ScrollEffectsManager();
    new AnimationManager();
    new MobileOptimizer();
    new PerformanceOptimizer();
    
    // Initialize About Section Features
    new AboutSectionManager();
    new AboutResponsiveManager();
    new AboutPerformanceManager();
    
    // Add loaded class for CSS animations immediately
    document.body.classList.add('js-loaded', 'loaded');
});

// Export for external use if needed
window.ResponsiveEnhancements = {
    ResponsiveManager,
    ScrollEffectsManager,
    AnimationManager,
    MobileOptimizer,
    PerformanceOptimizer
};

// Project filters are now handled by components/featured-projects.js
// Skills tabs functionality is handled above in the standalone section
