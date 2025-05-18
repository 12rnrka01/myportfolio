/**
 * transition.js - Handles all animation and transition effects
 * for the portfolio website
 */

$(document).ready(function() {
    // Initialize animations when page loads
    initializeAnimations();
    
    // Set up scroll detection for reveal animations
    setupScrollReveal();
    
    // Initialize typing effect for hero section
    setupTypingEffect();
    
    // Set up hover animations
    setupHoverEffects();
});

/**
 * Initialize animations when page first loads
 */
function initializeAnimations() {
    // Add show class to hero section elements after a small delay
    setTimeout(function() {
        $('#hero h1').addClass('show');
        setTimeout(function() {
            $('#hero h2').addClass('show');
            setTimeout(function() {
                $('#hero p').addClass('show');
                setTimeout(function() {
                    $('#hero .hero-social').addClass('show');
                }, 200);
            }, 200);
        }, 400);
    }, 300);
    
    // Initialize typing effect on hero text
    const nameElement = document.getElementById('name');
    const roleElement = document.getElementById('role');
    
    if (nameElement && nameElement.innerText.length > 0) {
        startTypingAnimation(nameElement, 80);
        
        // Start role typing after name is complete
        setTimeout(function() {
            if (roleElement && roleElement.innerText.length > 0) {
                startTypingAnimation(roleElement, 80);
            }
        }, nameElement.innerText.length * 80 + 500);
    }
}

/**
 * Set up scroll reveal animations
 */
function setupScrollReveal() {
    // Get all elements with reveal-on-scroll class
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    // Create Intersection Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Only trigger once
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% of element is visible
        rootMargin: '-20px 0px' // trigger slightly after element enters viewport
    });
    
    // Observe each reveal element
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Legacy fallback for browsers that don't support Intersection Observer
    if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported, using fallback');
        
        function checkIfInView() {
            const windowHeight = window.innerHeight;
            const windowTopPosition = window.scrollY;
            const windowBottomPosition = windowTopPosition + windowHeight;
            
            revealElements.forEach(element => {
                const elementHeight = element.offsetHeight;
                const elementTopPosition = element.offsetTop;
                const elementBottomPosition = elementTopPosition + elementHeight;
                
                // Check if element is in viewport
                if (
                    elementBottomPosition >= windowTopPosition && 
                    elementTopPosition <= windowBottomPosition
                ) {
                    element.classList.add('show');
                }
            });
        }
        
        window.addEventListener('scroll', checkIfInView);
        window.addEventListener('resize', checkIfInView);
        checkIfInView(); // Initial check
    }
}

/**
 * Start typing animation for an element
 */
function startTypingAnimation(element, speed) {
    if (!element) return;
    
    const text = element.innerText;
    element.innerText = '';
    element.style.visibility = 'visible';
    
    let i = 0;
    const typing = setInterval(function() {
        if (i < text.length) {
            element.innerText += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            element.classList.add('typing-complete');
        }
    }, speed);
}

/**
 * Set up hover effects and interactive animations
 */
function setupHoverEffects() {
    // Add hover-lift class to relevant elements
    $('.experience-box, .project-card, .education-item, .contact-info-item').addClass('hover-lift');
    
    // Setup section transitions
    $('section').addClass('section-transition');
    
    // Animate skill items on hover (only on non-touch devices)
    if (!('ontouchstart' in document.documentElement)) {
        $('.skill-item').each(function(index) {
            $(this).addClass(`reveal-delay-${(index % 5) + 1}`);
        });
    }
    
    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar-animated');
    if (progressBars.length > 0) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    progressObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
    
    // Stagger animations for lists of items
    $('.experience-box, .project-card, .education-item, .skill-item, .contact-info-item').each(function(index) {
        $(this).css('transition-delay', (index % 5) * 0.1 + 's');
    });
    
    // Animate scroll-to-top button
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress);
}

/**
 * Update the scroll progress indicator on the scroll-to-top button
 */
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    const dashOffset = 100 - progress;
    const progressCircle = document.querySelector('#scrollTopBtn .progress');
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    if (progressCircle) {
        progressCircle.style.strokeDashoffset = dashOffset;
    }
    
    if (scrollBtn) {
        if (scrollTop > 100) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    }
}

// Optimize transitions for mobile
function optimizeForMobile() {
    if (window.innerWidth < 768) {
        // Reduce animation complexities on mobile
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            el.style.transitionDuration = '0.4s';
        });
        
        // Disable staggered animations on mobile
        document.querySelectorAll('[class*="reveal-delay-"]').forEach(el => {
            el.style.transitionDelay = '0s';
        });
    }
}

// Check for mobile devices on load and resize
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);

// Respect user preferences for reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}