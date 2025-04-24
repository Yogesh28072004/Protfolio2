// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Resume download functionality
document.getElementById('resumeBtn').addEventListener('click', function() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = './images/resume.pdf'; // Replace with your actual resume file path
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Hero section animations
            if (entry.target.id === 'home') {
                const heroContent = entry.target.querySelector('.hero-content');
                const heroImage = entry.target.querySelector('.hero-image');
                
                heroContent.querySelector('h1').classList.add('animate-fadeInUp');
                setTimeout(() => {
                    heroContent.querySelector('h2').classList.add('animate-slideInLeft');
                }, 500);
                setTimeout(() => {
                    heroContent.querySelector('p').classList.add('animate-slideInRight');
                }, 1000);
                setTimeout(() => {
                    heroImage.classList.add('animate-fadeInUp');
                }, 1500);
            }
            
            // Skills section animations
            if (entry.target.id === 'skills') {
                const skillCards = entry.target.querySelectorAll('.skill-card');
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.querySelector('h3').classList.add('animate-fadeInUp');
                        setTimeout(() => {
                            card.querySelector('p').classList.add('animate-fadeInUp');
                        }, 300);
                    }, index * 300);
                });
            }
            
            // Projects section animations
            if (entry.target.id === 'projects') {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.querySelector('h3').classList.add('animate-slideInLeft');
                        setTimeout(() => {
                            card.querySelector('p').classList.add('animate-slideInRight');
                        }, 300);
                    }, index * 400);
                });
            }
            
            // Contact section animations
            if (entry.target.id === 'contact') {
                const contactSection = entry.target;
                contactSection.querySelector('h2').classList.add('animate-fadeInUp');
                setTimeout(() => {
                    contactSection.querySelector('form').classList.add('animate-fadeInUp');
                }, 500);
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Typing Animation
window.addEventListener('load', () => {
    const typingText = document.querySelector('.typing-text');
    const typingCursor = document.querySelector('.typing-cursor');
    
    // Start typing animation after a short delay
    setTimeout(() => {
        typingText.style.animation = 'typing 2s steps(20, end) forwards';
        typingCursor.style.display = 'inline-block';
        
        // Hide cursor after typing animation completes
        setTimeout(() => {
            typingCursor.style.display = 'none';
        }, 2000);
    }, 1000);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing theme toggle...');
    
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    const icon = themeToggle.querySelector('i');
    if (!icon) {
        console.error('Theme toggle icon not found!');
        return;
    }
    
    console.log('Theme toggle elements found:', { themeToggle, icon });
    
    // Check for saved theme preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    console.log('Initial theme:', currentTheme);
    
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        console.log('Theme toggle clicked');
        currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        console.log('Switching theme from', currentTheme, 'to', newTheme);
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        if (newTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    document.addEventListener('DOMContentLoaded', function () {
        const toggleBtn = document.getElementById('themeToggle');
        const icon = toggleBtn.querySelector('i');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
        // Load saved theme or use system preference
        const savedTheme = localStorage.getItem('theme');
        const currentTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme);
    
        // Toggle on click
        toggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            theme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateIcon(theme);
        });
    
        // Respond to system preference change
        prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                updateIcon(newTheme);
            }
        });
    
        function updateIcon(theme) {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
}
);    