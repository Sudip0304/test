// Khagol InfoTech Solutions - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNavigation();
    initializeAnimations();
    initializeForm();
    initializeTechShowcase();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 15, 28, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'var(--bg-overlay)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu when pressing escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 70; // Account for fixed navbar height
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileToggle.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                }
            }
        });
    });
    
    // Handle mobile Get Started button
    const mobileCTA = document.querySelector('.mobile-cta-btn');
    if (mobileCTA) {
        mobileCTA.addEventListener('click', (e) => {
            const href = mobileCTA.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 70;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileToggle.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                }
            }
        });
    }
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Animation effects
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special animations for specific elements
                if (entry.target.classList.contains('service-card')) {
                    if (!entry.target.classList.contains('animated')) {
                        animateServiceCard(entry.target);
                        entry.target.classList.add('animated');
                    }
                } else if (entry.target.classList.contains('stat-card')) {
                    animateStatCard(entry.target);
                } else if (entry.target.classList.contains('team-member')) {
                    animateTeamMember(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .stat-card, .team-member, .solution-card, .feature-list li, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Stagger animation for service cards
    function animateServiceCard(card) {
        const delay = Array.from(card.parentElement.children).indexOf(card) * 100;
        setTimeout(() => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
        }, delay);
    }
    
    // Counter animation for stat cards
    function animateStatCard(card) {
        const numberElement = card.querySelector('.stat-number');
        if (numberElement) {
            const text = numberElement.textContent.trim();
            
            // Handle different stat formats
            if (text === '24/7') {
                // For 24/7, just animate the appearance
                numberElement.style.opacity = '0';
                numberElement.style.transform = 'scale(0.5)';
                setTimeout(() => {
                    numberElement.style.transition = 'all 0.6s ease';
                    numberElement.style.opacity = '1';
                    numberElement.style.transform = 'scale(1)';
                }, 300);
            } else {
                // Extract number and suffix for other formats
                const match = text.match(/(\d+)([%+]?)/);
                if (match) {
                    const number = parseInt(match[1]);
                    const suffix = match[2] || '';
                    
                    if (!isNaN(number)) {
                        animateCounter(numberElement, 0, number, 1500, suffix);
                    }
                } else {
                    // Fallback for any unmatched format
                    numberElement.style.opacity = '0';
                    numberElement.style.transform = 'scale(0.5)';
                    setTimeout(() => {
                        numberElement.style.transition = 'all 0.6s ease';
                        numberElement.style.opacity = '1';
                        numberElement.style.transform = 'scale(1)';
                    }, 300);
                }
            }
        }
    }
    
    // Team member animation
    function animateTeamMember(member) {
        const avatar = member.querySelector('.member-avatar');
        if (avatar) {
            setTimeout(() => {
                avatar.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    avatar.style.transform = 'scale(1)';
                }, 200);
            }, 300);
        }
    }
    
    // Counter animation utility
    function animateCounter(element, start, end, duration, suffix) {
        // Set initial state
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            // Format the number based on suffix
            const currentNum = Math.floor(current);
            if (suffix === '%') {
                element.textContent = currentNum + '%';
            } else if (suffix === '+') {
                element.textContent = currentNum + '+';
            } else {
                element.textContent = currentNum;
            }
        }, 16);
    }
}

// Tech showcase interaction
function initializeTechShowcase() {
    const techNodes = document.querySelectorAll('.tech-node');
    const centerLogo = document.querySelector('.center-logo');
    
    techNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            // Pause rotation
            const techRing = node.closest('.tech-ring');
            if (techRing) {
                techRing.style.animationPlayState = 'paused';
            }
            
            // Show tooltip
            const tech = node.getAttribute('data-tech');
            if (tech) {
                showTechTooltip(node, tech);
            }
            
            // Highlight center logo
            if (centerLogo) {
                centerLogo.style.transform = 'translate(-50%, -50%) scale(1.2)';
                centerLogo.style.color = 'var(--text-accent)';
            }
        });
        
        node.addEventListener('mouseleave', () => {
            // Resume rotation
            const techRing = node.closest('.tech-ring');
            if (techRing) {
                techRing.style.animationPlayState = 'running';
            }
            
            // Hide tooltip
            hideTechTooltip();
            
            // Reset center logo
            if (centerLogo) {
                centerLogo.style.transform = 'translate(-50%, -50%) scale(1)';
                centerLogo.style.color = 'var(--text-accent)';
            }
        });
    });
    
    function showTechTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 1000;
            border: var(--border-primary);
            box-shadow: var(--shadow-lg);
            white-space: nowrap;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.bottom + 10 + 'px';
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }, 10);
    }
    
    function hideTechTooltip() {
        const tooltip = document.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }
    }
}

// Form handling
function initializeForm() {
    const form = document.getElementById('projectForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('.submit-btn');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Form validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error
        clearError(e);
        
        // Validation rules
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function clearError(e) {
        const field = e.target;
        field.classList.remove('error');
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--error-color);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        field.parentElement.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateY(0)';
        }, 10);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            showNotification('Please fix the errors above', 'error');
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                Sending...
            </div>
        `;
        
        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            style.remove();
        }
    });
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const bgColor = type === 'success' ? 'var(--success-color)' : 'var(--error-color)';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 600;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    const floatingElements = document.querySelector('.floating-elements');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        if (floatingElements) {
            floatingElements.style.transform = `translateY(${rate * 0.3}px)`;
        }
    });
    
    // Add scroll indicator
    createScrollIndicator();
    
    function createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = scrollPercent + '%';
        });
    }
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const optimizedScrollHandler = throttle(() => {
    // Scroll-dependent functionality
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Add CSS for form error states
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-row input.error,
    .form-row select.error,
    .form-row textarea.error {
        border-color: var(--error-color);
        box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1);
    }
    
    .tech-node:hover {
        box-shadow: 0 10px 30px rgba(0, 102, 255, 0.4);
    }
`;
document.head.appendChild(errorStyles);
