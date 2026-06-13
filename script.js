"use strict";


// ================================
// TYPING EFFECT (UNCHANGED - STABLE)
// ================================

const texts = [
    "Instrumentation Engineer",
    "Automation Engineer",
    "PLC Programmer",
    "SCADA Engineer",
    "IoT Developer",
    "Control System Engineer"
];

let i = 0;
let j = 0;
let isDeleting = false;

function typeEffect() {
    const el = document.getElementById("typing-text");
    if (!el) return;

    const current = texts[i];

    if (!isDeleting) {
        el.textContent = current.substring(0, j + 1);
        j++;

        if (j === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        el.textContent = current.substring(0, j - 1);
        j--;

        if (j === 0) {
            isDeleting = false;
            i = (i + 1) % texts.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 35 : 70);
}

typeEffect();


// ================================
// MOBILE MENU
// ================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-active");
        });
    });
}


// ================================
// SMOOTH SCROLL
// ================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ================================
// CINEMATIC SCROLL ENGINE (NEW)
// ================================

const revealItems = document.querySelectorAll(
    ".section, .project-card, .timeline-item, .cert-card, .stat-card"
);

function cinematicReveal() {

    const trigger = window.innerHeight * 0.85;

    revealItems.forEach((el, index) => {

        const rect = el.getBoundingClientRect();

        if (rect.top < trigger) {

            if (!el.classList.contains("active")) {

                setTimeout(() => {
                    el.classList.add("cinematic-reveal", "active");
                }, index * 60);

            }
        }
    });
}


// ================================
// ACTIVE NAV + UI UPDATES
// ================================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

function updateNav() {

    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
            current = section.id;
        }
    });

    navItems.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });

    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.style.boxShadow =
            window.scrollY > 50
                ? "0 10px 30px rgba(0,0,0,0.25)"
                : "none";
    }

    const topBtn = document.getElementById("scrollTopBtn");
    if (topBtn) {
        topBtn.style.display = window.scrollY > 400 ? "block" : "none";
    }
}


// ================================
// COUNTER (SAFE ONE-TIME)
// ================================

let counterStarted = false;

function startCounter() {

    if (counterStarted) return;

    const stats = document.querySelector(".stats-grid");
    if (!stats) return;

    const rect = stats.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.9) {

        counterStarted = true;

        document.querySelectorAll(".stat-card h3").forEach(counter => {

            const target = parseInt(counter.textContent);
            if (isNaN(target)) return;

            let current = 0;
            const step = target / 60;

            function animate() {
                current += step;

                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target;
                }
            }

            animate();
        });
    }
}


// ================================
// SCROLL ENGINE (OPTIMIZED RAF)
// ================================

let ticking = false;

function onScroll() {
    cinematicReveal();
    updateNav();
    startCounter();
    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
    }
});


// ================================
// SCROLL TO TOP
// ================================

const topBtn = document.getElementById("scrollTopBtn");

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ================================
// HERO PARALLAX (SMOOTH RAF VERSION)
// ================================

const heroImage = document.querySelector(".hero-image img");
const icons = document.querySelectorAll(".floating-icon");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = (window.innerWidth / 2 - e.clientX) * 0.02;
    mouseY = (window.innerHeight / 2 - e.clientY) * 0.02;
});

function animateParallax() {

    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    if (heroImage) {
        heroImage.style.transform =
            `translate(${currentX}px, ${currentY}px)`;
    }

    icons.forEach((icon, i) => {
        const speed = (i + 1) * 0.5;
        icon.style.transform =
            `translate(${currentX * speed}px, ${currentY * speed}px)`;
    });

    requestAnimationFrame(animateParallax);
}

animateParallax();


// ================================
// PAGE LOAD
// ================================

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    cinematicReveal();
});
