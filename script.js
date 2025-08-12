const totalImages = 52;
const basePath = './'; // Change if needed
const gallery = document.getElementById('gallery');
const counter = document.getElementById('counter');
const toTopBtn = document.getElementById('toTopBtn');
const header = document.getElementById('mainHeader');

let lastScrollTop = 0;

// Create image placeholders
for (let i = 1; i <= totalImages; i++) {
    const img = document.createElement('img');
    img.dataset.src = `${basePath}img${i}.png`;
    img.alt = `Image ${i}`;
    img.loading = 'lazy';
    gallery.appendChild(img);
}

// Lazy load with animation
const lazyLoad = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
};

const observer = new IntersectionObserver(lazyLoad, {
    rootMargin: '300px'
});

document.querySelectorAll('img').forEach(img => observer.observe(img));

// Update page counter & header behavior
window.addEventListener('scroll', () => {
    const imgs = document.querySelectorAll('img');
    let currentPage = 1;
    imgs.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentPage = index + 1;
        }
    });
    counter.textContent = `${currentPage} of ${totalImages}`;

    // Show "Go to Top" button after scrolling down
    toTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';

    // Header hide/show animation
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Scroll to top
toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
