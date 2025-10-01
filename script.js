gsap.registerPlugin(ScrollTrigger);

/* === FUNGSI UNTUK MENU MOBILE === */
const navMenu = document.querySelector('.nav__menu-js');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}
if (navClose) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}
navLinks.forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/* === FUNGSI THEME TOGGLE === */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) { body.classList.add(savedTheme); if (savedTheme === 'dark-theme') { themeToggle.classList.replace('bx-sun', 'bx-moon'); } }
themeToggle.addEventListener('click', () => { body.classList.toggle('dark-theme'); if (body.classList.contains('dark-theme')) { themeToggle.classList.replace('bx-sun', 'bx-moon'); localStorage.setItem('theme', 'dark-theme'); } else { themeToggle.classList.replace('bx-moon', 'bx-sun'); localStorage.setItem('theme', 'light-theme'); } });

/* === ANIMASI MENGETIK === */
const typed = new Typed('.typing-animation', {
    strings: ['My profile'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
    backDelay: 1500,
});

/* === ANIMASI HEADER SAAT SCROLL === */
const header = document.querySelector('.header');
ScrollTrigger.create({
    trigger: 'body',
    start: 'top -50px',
    onEnter: () => header.classList.add('scrolled'),
    onLeaveBack: () => header.classList.remove('scrolled'),
});

/* === NAV LINK ACTIVE ON SCROLL === */
const sections = document.querySelectorAll('.section');
const navLinksAll = document.querySelectorAll('.nav__link');
sections.forEach(section => { ScrollTrigger.create({ trigger: section, start: "top center", end: "bottom center", onToggle: self => { const correspondingLink = document.querySelector(`.nav__link[href="#${section.id}"]`); if (self.isActive && correspondingLink) { navLinksAll.forEach(link => link.classList.remove('active-link')); correspondingLink.classList.add('active-link'); } } }); });

/* === ANIMASI GARIS BAWAH JUDUL === */
const sectionTitles = gsap.utils.toArray('.section__title');
sectionTitles.forEach(title => {
    ScrollTrigger.create({
        trigger: title,
        start: "top 90%",
        onEnter: () => title.classList.add('animate-underline'),
    });
});

/* === ANIMASI FADE-IN & SLIDE-UP UNTUK SECTION UMUM === */
gsap.utils.toArray('#home, #about, #certification, #contact').forEach(section => { 
    const elementsToAnimate = section.querySelectorAll('h1, h2, p, .home__socials, .home__image, .about__image, .button, .contact__form, .certification__card, .flip-card'); 
    gsap.from(elementsToAnimate, { opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" } }); 
});

/* === PERBAIKAN: ANIMASI TIMELINE YANG BISA BERULANG === */
const timelineItems = gsap.utils.toArray('.timeline-item');
timelineItems.forEach((item, index) => {
    const direction = (index % 2 === 0) ? 100 : -100;
    gsap.from(item, {
        x: direction,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse" 
        }
    });
});

/* === LOGIKA KURSOR ELEGAN === */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverables = document.querySelectorAll('a, button, .home__socials i, #theme-toggle, .timeline-content, .nav__toggle, .nav__close, .certification__card');

const mouse = { x: -100, y: -100 }; 
const pos = { x: 0, y: 0 }; 
const speed = 0.1;

let previousMouseX = 0;
let previousMouseY = 0;
let scaleX = 1;
let scaleY = 1;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    gsap.to([cursorDot, cursorOutline], { duration: 0.3, opacity: 1 });
});

const updateCursor = () => {
    const dx = mouse.x - pos.x;
    const dy = mouse.y - pos.y;
    pos.x += dx * speed;
    pos.y += dy * speed;
    
    const deltaMouseX = mouse.x - previousMouseX;
    const deltaMouseY = mouse.y - previousMouseY;
    previousMouseX = mouse.x;
    previousMouseY = mouse.y;

    const velocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150);
    const scale = (velocity / 150) * 0.5;
    
    scaleX = gsap.utils.clamp(0.8, 1.2, 1 + scale);
    scaleY = gsap.utils.clamp(0.8, 1.2, 1 - scale);

    const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

    gsap.set(cursorDot, { x: mouse.x, y: mouse.y });
    gsap.set(cursorOutline, { 
        x: pos.x - 20,
        y: pos.y - 20,
        scaleX: scaleX,
        scaleY: scaleY,
        rotation: angle
    });

    requestAnimationFrame(updateCursor);
};

requestAnimationFrame(updateCursor);

hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorOutline.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorOutline.classList.remove('hover');
    });
});

document.addEventListener('mouseleave', () => {
    gsap.to([cursorDot, cursorOutline], { duration: 0.3, opacity: 0 });
});

/* === LOGIKA FLIP CARD CONTACT === */
const flipCardInner = document.querySelector('.flip-card-inner');
const flipTrigger = document.querySelector('.flip-trigger-button');
const flipClose = document.querySelector('.flip-close-button');

if (flipTrigger && flipCardInner) {
    flipTrigger.addEventListener('click', () => {
        flipCardInner.classList.add('is-flipped');
    });
}

if (flipClose && flipCardInner) {
    flipClose.addEventListener('click', () => {
        flipCardInner.classList.remove('is-flipped');
    });
}