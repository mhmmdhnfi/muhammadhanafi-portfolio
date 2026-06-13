"use strict";


// ================================
// TYPING EFFECT (SMOOTH VERSION)
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
            setTimeout(typeEffect, 1400);
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

    setTimeout(typeEffect, isDeleting ? 40 : 80);
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
// SMOOTH SCROLL (ANCHOR NAV)
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
// ACTIVE NAV + SCROLL EFFECT (OPTIMIZED)
// ================================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

let ticking = false;

function updateScroll() {

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.id;
        }
    });

    navItems.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });

    // NAVBAR SHADOW
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.style.boxShadow =
            window.scrollY > 50
                ? "0 10px 30px rgba(0,0,0,0.25)"
                : "none";
    }

    // SCROLL TOP BUTTON
    const topBtn = document.getElementById("scrollTopBtn");
    if (topBtn) {
        topBtn.style.display = window.scrollY > 400 ? "block" : "none";
    }

    // REVEAL ANIMATION
    document.querySelectorAll(".section, .project-card, .timeline-item, .cert-card")
        .forEach(el => {
            const rect = el.getBoundingClientRect();

            if (rect.top < window.innerHeight - 120) {
                el.classList.add("active-reveal");
            }
        });

    // COUNTER
    startCounter();

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
    }
});


// ================================
// COUNTER ANIMATION
// ================================

let counterStarted = false;

function startCounter() {
    if (counterStarted) return;

    const stats = document.querySelector(".stats-grid");
    if (!stats) return;

    const rect = stats.getBoundingClientRect();

    if (rect.top < window.innerHeight) {
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
// SCROLL TO TOP BUTTON
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
// HERO PARALLAX EFFECT
// ================================

const heroImage = document.querySelector(".hero-image img");
const icons = document.querySelectorAll(".floating-icon");

window.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 60;
    const y = (window.innerHeight / 2 - e.clientY) / 60;

    if (heroImage) {
        heroImage.style.transform = `translate(${x}px, ${y}px)`;
    }

    icons.forEach((icon, index) => {
        const speed = (index + 1) * 0.4;
        icon.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });

});


// ================================
// PAGE LOAD ANIMATION
// ================================

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});