"use strict";


// ================================
// TYPE EFFECT (STABLE)
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
let deleting = false;

function typeEffect() {

    const el = document.getElementById("typing-text");
    if (!el) return;

    const current = texts[i];

    if (!deleting) {
        el.textContent = current.substring(0, j + 1);
        j++;

        if (j === current.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {
        el.textContent = current.substring(0, j - 1);
        j--;

        if (j === 0) {
            deleting = false;
            i = (i + 1) % texts.length;
        }
    }

    setTimeout(typeEffect, deleting ? 40 : 80);
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
// CINEMATIC REVEAL ENGINE V2
// ================================

const revealItems = document.querySelectorAll(
    ".section, .project-card, .timeline-item, .cert-card, .stat-card"
);

function reveal() {

    const trigger = window.innerHeight * 0.85;

    revealItems.forEach((el) => {

        const rect = el.getBoundingClientRect();

        if (rect.top < trigger) {
            el.classList.add("active");
        }

    });
}


// ================================
// NAV + UI UPDATE
// ================================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

function navUpdate() {

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
// COUNTER
// ================================

let counterStarted = false;

function counter() {

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
// SCROLL ENGINE (ONE LOOP)
// ================================

let ticking = false;

function onScroll() {
    reveal();
    navUpdate();
    counter();
    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
    }
});


// ================================
// PARALLAX V2 (SMOOTH)
// ================================

const heroImage = document.querySelector(".hero-image img");
const icons = document.querySelectorAll(".floating-icon");

let mx = 0, my = 0;
let cx = 0, cy = 0;

document.addEventListener("mousemove", (e) => {
    mx = (window.innerWidth / 2 - e.clientX) * 0.02;
    my = (window.innerHeight / 2 - e.clientY) * 0.02;
});

function parallax() {

    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;

    if (heroImage) {
        heroImage.style.transform = `translate(${cx}px, ${cy}px)`;
    }

    icons.forEach((icon, i) => {
        const speed = (i + 1) * 0.5;
        icon.style.transform = `translate(${cx * speed}px, ${cy * speed}px)`;
    });

    requestAnimationFrame(parallax);
}

parallax();


// ================================
// SCROLL TOP
// ================================

const topBtn = document.getElementById("scrollTopBtn");

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// ================================
// LOAD
// ================================

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    reveal();
});
