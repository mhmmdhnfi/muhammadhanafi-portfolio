/* =====================================
   TYPING ANIMATION
===================================== */

const typingTexts = [
    "Instrumentation Engineer",
    "Control System Engineer",
    "Automation Engineer",
    "IoT Developer",
    "PLC Programmer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing-text");

function typeEffect() {

    const currentText = typingTexts[textIndex];

    if (!isDeleting) {

        typingElement.textContent =
            currentText.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentText.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentText.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            textIndex++;

            if (textIndex >= typingTexts.length) {

                textIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

/* =====================================
   SCROLL TO TOP BUTTON
===================================== */

const scrollBtn =
    document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        scrollBtn.style.display = "block";

    } else {

        scrollBtn.style.display = "none";

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =====================================
   NAVBAR SHADOW EFFECT
===================================== */

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.1)";

    } else {

        navbar.style.boxShadow =
            "none";

    }

});

/* =====================================
   REVEAL ANIMATION
===================================== */

const revealElements =
    document.querySelectorAll(
        ".section, .project-card, .timeline-item"
    );

function revealOnScroll() {

    revealElements.forEach((element) => {

        const windowHeight =
            window.innerHeight;

        const elementTop =
            element.getBoundingClientRect().top;

        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("active-reveal");

        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

/* =====================================
   ACTIVE MENU LINK
===================================== */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop
            &&
            pageYOffset <
            sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});

/* =====================================
   PROJECT CARD HOVER EFFECT
===================================== */

const cards =
    document.querySelectorAll(
        ".project-card"
    );

cards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.transform =
                "translateY(-12px) scale(1.03)";

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "translateY(0px) scale(1)";

        }
    );

});

/* =====================================
   COUNTER ANIMATION
===================================== */

const counters =
    document.querySelectorAll(
        ".stat-card h3"
    );

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection =
        document.querySelector(
            ".stats-grid"
        );

    if (!statsSection) return;

    const position =
        statsSection.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const target =
                parseFloat(
                    counter.innerText
                );

            if (isNaN(target)) return;

            let current = 0;

            const increment =
                target / 50;

            const updateCounter = () => {

                current += increment;

                if (current < target) {

                    counter.innerText =
                        Math.floor(current);

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.innerText =
                        target;

                }

            };

            updateCounter();

        });

    }

}

window.addEventListener(
    "scroll",
    startCounters
);

/* =====================================
   MOBILE MENU
===================================== */

const menuBtn =
    document.querySelector(
        ".menu-btn"
    );

const navMenu =
    document.querySelector(
        ".nav-links"
    );

menuBtn.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle(
            "mobile-active"
        );

    }
);

/* =====================================
   SMOOTH SCROLL
===================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute(
                        "href"
                    )
                );

            target.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

});
