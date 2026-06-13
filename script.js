/* ==================================
   TYPING ANIMATION
================================== */

const typingTexts = [
    "Instrumentation Engineer",
    "Control System Engineer",
    "Automation Engineer",
    "PLC Programmer",
    "IoT Developer",
    "SCADA Engineer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement =
document.getElementById("typing-text");

function typeEffect() {

    if (!typingElement) return;

    const currentText =
    typingTexts[textIndex];

    if (!isDeleting) {

        typingElement.textContent =
        currentText.substring(
            0,
            charIndex + 1
        );

        charIndex++;

        if (
            charIndex ===
            currentText.length
        ) {

            isDeleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typingElement.textContent =
        currentText.substring(
            0,
            charIndex - 1
        );

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            textIndex++;

            if (
                textIndex >=
                typingTexts.length
            ) {

                textIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        isDeleting ? 50 : 100
    );
}

typeEffect();

/* ==================================
   SCROLL TO TOP
================================== */

const scrollBtn =
document.getElementById(
    "scrollTopBtn"
);

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 400
        ) {

            scrollBtn.style.display =
            "block";

        } else {

            scrollBtn.style.display =
            "none";
        }
    }
);

if(scrollBtn){

    scrollBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        }
    );

}

/* ==================================
   NAVBAR SHADOW
================================== */

const navbar =
document.querySelector(
    ".navbar"
);

window.addEventListener(
    "scroll",
    () => {

        if(!navbar) return;

        if(
            window.scrollY > 50
        ){

            navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.08)";

        }

        else{

            navbar.style.boxShadow =
            "none";
        }

    }
);

/* ==================================
   REVEAL ANIMATION
================================== */

const revealElements =
document.querySelectorAll(
    ".section, .project-card, .timeline-item"
);

function revealOnScroll(){

    revealElements.forEach(
        (element)=>{

            const windowHeight =
            window.innerHeight;

            const elementTop =
            element
            .getBoundingClientRect()
            .top;

            const revealPoint =
            120;

            if(
                elementTop <
                windowHeight -
                revealPoint
            ){

                element.classList.add(
                    "active-reveal"
                );
            }

        }
    );
}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

/* ==================================
   ACTIVE NAVIGATION
================================== */

const sections =
document.querySelectorAll(
    "section"
);

const navLinks =
document.querySelectorAll(
    ".nav-links a"
);

window.addEventListener(
    "scroll",
    ()=>{

        let current = "";

        sections.forEach(
            section=>{

                const sectionTop =
                section.offsetTop - 150;

                const sectionHeight =
                section.clientHeight;

                if(
                    pageYOffset >=
                    sectionTop
                    &&
                    pageYOffset <
                    sectionTop +
                    sectionHeight
                ){

                    current =
                    section.getAttribute(
                        "id"
                    );
                }

            }
        );

        navLinks.forEach(
            link=>{

                link.classList.remove(
                    "active"
                );

                if(
                    link.getAttribute(
                        "href"
                    )
                    ===
                    "#" + current
                ){

                    link.classList.add(
                        "active"
                    );
                }

            }
        );

    }
);

/* ==================================
   COUNTER ANIMATION
================================== */

const counters =
document.querySelectorAll(
    ".stat-card h3"
);

let counterStarted =
false;

function animateCounter(){

    if(counterStarted) return;

    const statsSection =
    document.querySelector(
        ".stats-grid"
    );

    if(!statsSection) return;

    const position =
    statsSection
    .getBoundingClientRect()
    .top;

    if(
        position <
        window.innerHeight - 100
    ){

        counterStarted = true;

        counters.forEach(
            counter=>{

                const target =
                parseFloat(
                    counter.innerText
                );

                if(
                    isNaN(target)
                ) return;

                let current = 0;

                const increment =
                target / 50;

                function update(){

                    current +=
                    increment;

                    if(
                        current <
                        target
                    ){

                        counter.innerText =
                        Math.floor(
                            current
                        );

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

            }
        );
    }

}

window.addEventListener(
    "scroll",
    animateCounter
);

/* ==================================
   MOBILE MENU
================================== */

const menuBtn =
document.querySelector(
    ".menu-btn"
);

const navMenu =
document.querySelector(
    ".nav-links"
);

if(menuBtn){

    menuBtn.addEventListener(
        "click",
        ()=>{

            navMenu.classList.toggle(
                "mobile-active"
            );

        }
    );

}

/* ==================================
   CLOSE MOBILE MENU
================================== */

document
.querySelectorAll(
".nav-links a"
)
.forEach(link=>{

    link.addEventListener(
        "click",
        ()=>{

            navMenu.classList.remove(
                "mobile-active"
            );

        }
    );

});

/* ==================================
   SMOOTH SCROLL
================================== */

document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor=>{

    anchor.addEventListener(
        "click",

        function(e){

            e.preventDefault();

            const target =
            document.querySelector(
                this.getAttribute(
                    "href"
                )
            );

            if(target){

                target.scrollIntoView({

                    behavior:
                    "smooth"

                });

            }

        }
    );

});

/* ==================================
   PROJECT CARD EFFECT
================================== */

const cards =
document.querySelectorAll(
    ".project-card"
);

cards.forEach(card=>{

    card.addEventListener(
        "mouseenter",
        ()=>{

            card.style.transform =
            "translateY(-10px)";
        }
    );

    card.addEventListener(
        "mouseleave",
        ()=>{

            card.style.transform =
            "translateY(0)";
        }
    );

});

/* ==================================
   PARALLAX HERO IMAGE
================================== */

const heroImage =
document.querySelector(
    ".hero-image img"
);

window.addEventListener(
    "mousemove",
    (e)=>{

        if(!heroImage) return;

        const x =
        (window.innerWidth/2
        - e.pageX)/40;

        const y =
        (window.innerHeight/2
        - e.pageY)/40;

        heroImage.style.transform =
        `translate(${x}px, ${y}px)`;
    }
);

/* ==================================
   FLOATING ICONS EFFECT
================================== */

const floatingIcons =
document.querySelectorAll(
    ".floating-icon"
);

window.addEventListener(
    "mousemove",
    (e)=>{

        floatingIcons.forEach(
            (icon,index)=>{

                const speed =
                (index + 1) * 0.4;

                const x =
                (window.innerWidth/2
                - e.pageX)
                *
                speed
                /
                100;

                const y =
                (window.innerHeight/2
                - e.pageY)
                *
                speed
                /
                100;

                icon.style.transform =
                `translate(${x}px,${y}px)`;
            }
        );

    }
);

/* ==================================
   LOADING ANIMATION
================================== */

window.addEventListener(
    "load",
    ()=>{

        document.body.style.opacity =
        "1";

    }
);

document.body.style.opacity =
"0";

document.body.style.transition =
"opacity .8s ease";
