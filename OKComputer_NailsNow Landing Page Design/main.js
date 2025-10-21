// Nails Now - Main JavaScript File
// Handles all interactive features and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initTypedText();
    initParticles();
    initBookingDemo();
    initRevenueChart();
    initPricingToggle();
    initTestimonialsSlider();
    initMobileMenu();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Stagger animation for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Typed text animation for hero section
function initTypedText() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Belleza',
            'Negocio',
            'Éxito',
            'Futuro'
        ],
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });
}

// Particle system for hero background
function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('particles-container');
    
    if (!container) return;
    
    container.appendChild(canvas);
    
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.1,
            color: Math.random() > 0.5 ? '#E8B4B8' : '#A8B5A0'
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        
        animationId = requestAnimationFrame(updateParticles);
    }
    
    // Initialize
    resizeCanvas();
    initParticles();
    updateParticles();
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Cleanup when leaving page
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// Interactive booking demo
function initBookingDemo() {
    let selectedService = null;
    let selectedDate = null;
    let selectedTime = null;
    let selectedPrice = 0;
    
    // Service selection
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            this.classList.add('selected');
            selectedService = this.dataset.service;
            selectedPrice = parseInt(this.dataset.price);
            
            updateBookingSummary();
        });
    });
    
    // Calendar day selection
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.addEventListener('click', function() {
            // Remove previous selection
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            
            // Add selection to clicked day
            this.classList.add('selected');
            selectedDate = `Octubre ${this.textContent}, 2024`;
            
            updateBookingSummary();
        });
    });
    
    // Time slot selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove previous selection
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('bg-soft-rose', 'text-white'));
            
            // Add selection to clicked slot
            this.classList.add('bg-soft-rose', 'text-white');
            selectedTime = this.dataset.time;
            
            updateBookingSummary();
        });
    });
    
    function updateBookingSummary() {
        const summary = document.getElementById('booking-summary');
        const bookBtn = document.getElementById('book-appointment');
        
        if (selectedService && selectedDate && selectedTime) {
            // Show summary
            summary.classList.remove('hidden');
            
            // Update summary content
            document.getElementById('selected-service').textContent = getServiceName(selectedService);
            document.getElementById('selected-date').textContent = selectedDate;
            document.getElementById('selected-time').textContent = selectedTime;
            document.getElementById('selected-price').textContent = `$${selectedPrice}`;
            
            // Enable booking button
            bookBtn.disabled = false;
            
            // Add booking animation
            bookBtn.addEventListener('click', function() {
                showBookingConfirmation();
            }, { once: true });
        }
    }
    
    function getServiceName(service) {
        const names = {
            'manicura': 'Manicura Clásica',
            'pedicura': 'Pedicura Completa',
            'acrilicas': 'Uñas Acrílicas'
        };
        return names[service] || service;
    }
    
    function showBookingConfirmation() {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                <div class="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 class="font-display text-2xl font-medium mb-4">¡Cita Confirmada!</h3>
                <p class="text-warm-gray mb-6">Tu cita demo ha sido reservada exitosamente. En un salón real, tu cliente recibiría una confirmación por email y SMS.</p>
                <button class="btn-primary px-6 py-3 rounded-lg font-medium" onclick="this.parentElement.parentElement.remove()">
                    Entendido
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 5000);
    }
}

// Revenue chart initialization
function initRevenueChart() {
    const chartContainer = document.getElementById('revenue-chart');
    if (!chartContainer) return;
    
    const chart = echarts.init(chartContainer);
    
    const option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#E8B4B8',
            textStyle: {
                color: '#2C2C2C'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            axisLine: {
                lineStyle: {
                    color: '#A8B5A0'
                }
            },
            axisLabel: {
                color: '#6B6B6B'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#A8B5A0'
                }
            },
            axisLabel: {
                color: '#6B6B6B',
                formatter: '${value}k'
            },
            splitLine: {
                lineStyle: {
                    color: '#F0F0F0'
                }
            }
        },
        series: [{
            name: 'Ingresos',
            type: 'line',
            smooth: true,
            data: [18, 22, 25, 28, 31, 35],
            lineStyle: {
                color: '#E8B4B8',
                width: 3
            },
            itemStyle: {
                color: '#E8B4B8'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(232, 180, 184, 0.3)'
                    }, {
                        offset: 1, color: 'rgba(232, 180, 184, 0.05)'
                    }]
                }
            }
        }]
    };
    
    chart.setOption(option);
    
    // Animate chart on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chart.resize();
                // Add animation delay
                setTimeout(() => {
                    chart.setOption({
                        animation: true,
                        animationDuration: 1000,
                        animationEasing: 'cubicOut'
                    });
                }, 500);
            }
        });
    });
    
    observer.observe(chartContainer);
    
    // Handle resize
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const freePrice = document.getElementById('free-price');
    const premiumPrice = document.getElementById('premium-price');
    
    if (!toggle) return;
    
    toggle.addEventListener('change', function() {
        const isAnnual = this.checked;
        
        if (isAnnual) {
            // Annual pricing (2 months free)
            freePrice.textContent = '$0';
            premiumPrice.textContent = '$248'; // $298 * 10 / 12 = ~$248
        } else {
            // Monthly pricing
            freePrice.textContent = '$0';
            premiumPrice.textContent = '$298';
        }
        
        // Add animation
        anime({
            targets: [freePrice, premiumPrice],
            scale: [1, 1.1, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });
}

// Testimonials slider
function initTestimonialsSlider() {
    const slider = document.getElementById('testimonials-slider');
    if (!slider) return;
    
    new Splide(slider, {
        type: 'loop',
        perPage: 1,
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        arrows: false,
        pagination: true,
        gap: '2rem'
    }).mount();
}

// Mobile menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    if (!menuBtn) return;
    
    menuBtn.addEventListener('click', function() {
        // Create mobile menu overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden';
        
        const menu = document.createElement('div');
        menu.className = 'fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300';
        menu.innerHTML = `
            <div class="p-6">
                <div class="flex justify-between items-center mb-8">
                    <div class="font-display text-2xl font-medium">
                        Nails <span class="text-soft-rose">Now</span>
                    </div>
                    <button id="close-menu" class="p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <nav class="space-y-4">
                    <a href="#features" class="block text-warm-gray hover:text-deep-charcoal transition-colors">Características</a>
                    <a href="#demo" class="block text-warm-gray hover:text-deep-charcoal transition-colors">Demo</a>
                    <a href="#pricing" class="block text-warm-gray hover:text-deep-charcoal transition-colors">Planes</a>
                    <a href="client-demo.html" class="block text-warm-gray hover:text-deep-charcoal transition-colors">Cliente Demo</a>
                    <a href="admin-demo.html" class="block text-warm-gray hover:text-deep-charcoal transition-colors">Admin Demo</a>
                    <button class="btn-primary w-full py-3 rounded-lg font-medium mt-6">
                        Comenzar Gratis
                    </button>
                </nav>
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(menu);
        
        // Animate menu in
        setTimeout(() => {
            menu.style.transform = 'translateX(0)';
        }, 10);
        
        // Close menu functionality
        const closeMenu = () => {
            menu.style.transform = 'translateX(100%)';
            setTimeout(() => {
                overlay.remove();
                menu.remove();
            }, 300);
        };
        
        overlay.addEventListener('click', closeMenu);
        document.getElementById('close-menu').addEventListener('click', closeMenu);
        
        // Handle menu links
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    });
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

// Add scroll-based navigation highlighting
window.addEventListener('scroll', debounce(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-soft-rose');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-soft-rose');
        }
    });
}, 100));

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    anime({
        targets: '.hero-bg .reveal',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(200),
        duration: 1000,
        easing: 'easeOutQuart'
    });
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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

// Initialize lazy loading if needed
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Add form validation for demo forms
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Add error handling for charts
function handleChartError(chartId) {
    const container = document.getElementById(chartId);
    if (container) {
        container.innerHTML = `
            <div class="flex items-center justify-center h-full text-warm-gray">
                <div class="text-center">
                    <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <p>Gráfico no disponible temporalmente</p>
                </div>
            </div>
        `;
    }
}

// Export functions for use in other pages
window.NailsNow = {
    initScrollAnimations,
    initRevenueChart,
    handleChartError,
    validateForm
};