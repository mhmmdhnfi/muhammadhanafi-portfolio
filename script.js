// ================================
// TYPING EFFECT
// ================================

const texts = [
    "Instrumentation Engineer",
    "Automation Engineer",
    "PLC Programmer",
    "SCADA Engineer",
    "IoT Developer",
    "Control System Engineer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {

    if (!document.getElementById("typing-text")) return;

    if (count === texts.length) {
        count = 0;
    }

    currentText = texts[count];

    letter = currentText.slice(0, ++index);

    document.getElementById("typing-text").textContent = letter;

    if (letter.length === currentText.length) {

        setTimeout(() => {

            const erase = setInterval(() => {

                letter = letter.slice(0, -1);

                document.getElementById("typing-text").textContent = letter;

                if (letter.length === 0) {

                    clearInterval(erase);

                    count++;
                    index = 0;

                    setTimeout(type, 300);

                }

            }, 50);

        }, 1500);

    } else {

        setTimeout(type, 100);

    }

})();


// ================================
// MOBILE MENU
// ================================

const menuBtn =
document.querySelector(".menu-btn");

const navLinks =
document.querySelector(".nav-links");

if(menuBtn){

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-active");

    });

}


// ================================
// CLOSE MOBILE MENU
// ================================

document
.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("mobile-active");

    });

});


// ================================
// SMOOTH SCROLL
// ================================

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            const target =
            document.querySelector(
                this.getAttribute("href")
            );

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        }
    );

});


// ================================
// ACTIVE NAVBAR
// ================================

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 150;

        const sectionHeight =
        section.offsetHeight;

        if(

            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight

        ){

            current =
            section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if(

            link.getAttribute("href")
            ===
            "#" + current

        ){

            link.classList.add("active");

        }

    });

});


// ================================
// NAVBAR SHADOW
// ================================

const navbar =
document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(!navbar) return;

    if(window.scrollY > 50){

        navbar.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.08)";

    }

    else{

        navbar.style.boxShadow =
        "none";

    }

});


// ================================
// REVEAL ANIMATION
// ================================

const reveals =
document.querySelectorAll(
    ".section, .project-card, .timeline-item"
);

function reveal(){

    reveals.forEach(item => {

        const windowHeight =
        window.innerHeight;

        const revealTop =
        item.getBoundingClientRect().top;

        const revealPoint = 120;

        if(

            revealTop <
            windowHeight - revealPoint

        ){

            item.classList.add(
                "active-reveal"
            );

        }

    });

}

window.addEventListener(
    "scroll",
    reveal
);

reveal();


// ================================
// COUNTER ANIMATION
// ================================

const counters =
document.querySelectorAll(
    ".stat-card h3"
);

let started = false;

function startCounter(){

    if(started) return;

    const stats =
    document.querySelector(
        ".stats-grid"
    );

    if(!stats) return;

    const top =
    stats.getBoundingClientRect().top;

    if(top < window.innerHeight){

        started = true;

        counters.forEach(counter => {

            const target =
            parseInt(
                counter.innerText
            );

            if(isNaN(target)) return;

            let current = 0;

            const speed =
            target / 60;

            function update(){

                current += speed;

                if(current < target){

                    counter.innerText =
                    Math.floor(current);

                    requestAnimationFrame(
                        update
                    );

                }

                else{

                    counter.innerText =
                    target;

                }

            }

            update();

        });

    }

}

window.addEventListener(
    "scroll",
    startCounter
);


// ================================
// SCROLL TOP BUTTON
// ================================

const topBtn =
document.getElementById(
    "scrollTopBtn"
);

window.addEventListener(
    "scroll",
    () => {

        if(!topBtn) return;

        if(window.scrollY > 400){

            topBtn.style.display =
            "block";

        }

        else{

            topBtn.style.display =
            "none";

        }

    }
);

if(topBtn){

    topBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top:0,
                behavior:"smooth"

            });

        }
    );

}


// ================================
// HERO IMAGE PARALLAX
// ================================

const heroImage =
document.querySelector(
    ".hero-image img"
);

window.addEventListener(
    "mousemove",
    (e)=>{

        if(!heroImage) return;

        const x =
        (window.innerWidth / 2
        - e.clientX) / 40;

        const y =
        (window.innerHeight / 2
        - e.clientY) / 40;

        heroImage.style.transform =
        `translate(${x}px,${y}px)`;

    }
);


// ================================
// FLOATING ICONS
// ================================

const icons =
document.querySelectorAll(
    ".floating-icon"
);

window.addEventListener(
    "mousemove",
    (e)=>{

        icons.forEach((icon,index)=>{

            const speed =
            (index + 1) * 0.4;

            const x =
            (window.innerWidth/2
            - e.clientX)
            *
            speed
            /
            100;

            const y =
            (window.innerHeight/2
            - e.clientY)
            *
            speed
            /
            100;

            icon.style.transform =
            `translate(${x}px,${y}px)`;

        });

    }
);


// ================================
// PAGE LOAD ANIMATION
// ================================

document.body.style.opacity = "0";

window.addEventListener(
    "load",
    ()=>{

        document.body.style.transition =
        "opacity .8s ease";

        document.body.style.opacity =
        "1";

    }
);
