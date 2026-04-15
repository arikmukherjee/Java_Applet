// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Sticky Navbar & Scroll Events
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Trigger Counters when in view
    handleCounters();
});

// Virtual Tree Counter Logic
const treeBtn = document.querySelector('.plant-btn');
const treeDisplay = document.getElementById('tree-count');

// Load stored trees
let count = localStorage.getItem('virtualTrees') || 0;
treeDisplay.innerText = count;

treeBtn.addEventListener('click', () => {
    count++;
    localStorage.setItem('virtualTrees', count);
    treeDisplay.innerText = count;
    
    // Add animation
    treeDisplay.parentElement.classList.add('tree-grow-anim');
    setTimeout(() => {
        treeDisplay.parentElement.classList.remove('tree-grow-anim');
    }, 500);
});

// Animated Counters (Impact Section)
const counters = document.querySelectorAll('.counter');
let speed = 200;

function handleCounters() {
    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            const time = value / speed;
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value.toLocaleString();
            }
        };

        // Trigger only if section is in viewport
        const rect = counter.getBoundingClientRect();
        if(rect.top < window.innerHeight && rect.bottom >= 0) {
            animate();
        }
    });
}

// Lightbox Gallery
const galleryImgs = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('form-msg');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic animation for "Success"
    formMsg.innerHTML = `<p style="color: green; margin-top: 10px;">Thank you! Your message has been sent successfully. 🌿</p>`;
    contactForm.reset();
    
    setTimeout(() => {
        formMsg.innerHTML = '';
    }, 5000);
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});