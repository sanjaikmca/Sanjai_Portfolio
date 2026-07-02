/* ==========================================
        PORTFOLIO V2 - SCRIPT.JS
        Author: Sanjai K
========================================== */

// ===============================
// Typing Animation
// ===============================

const roles = [
    "Machine Learning Engineer",
    "AI Engineer",
    "Data Engineering Enthusiast",
    "IEEE Published Researcher",
    "LLM & Generative AI Learner"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent = currentRole.substring(0, charIndex++);

        if (charIndex > currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent = currentRole.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {

                roleIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();


// ===============================
// Counter Animation
// ===============================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = parseFloat(counter.dataset.target);

            const isDecimal = target % 1 !== 0;

            let count = 0;

            const increment = target / 80;

            function updateCounter() {

                count += increment;

                if (count >= target) {

                    counter.innerText = target;

                } else {

                    counter.innerText = isDecimal
                        ? count.toFixed(2)
                        : Math.floor(count);

                    requestAnimationFrame(updateCounter);

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


// ===============================
// Scroll To Top
// ===============================

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollBtn.style.display = "flex";

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


// ===============================
// Sticky Navbar
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(5,8,22,.95)";

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.3)";

    } else {

        header.style.background = "rgba(5,8,22,.65)";

        header.style.boxShadow = "none";

    }

});


// ===============================
// Mobile Menu
// ===============================

const menu = document.querySelector(".menu");

const navLinks = document.querySelector(".nav-links");

menu.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// Close menu after clicking

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// ===============================
// Smooth Reveal Animation
// ===============================

const revealElements = document.querySelectorAll(

    ".project-card, .experience-card, .certificate-card, .achievement-card, .icon-card"

);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: .15

});

revealElements.forEach(el => {

    el.style.opacity = "0";

    el.style.transform = "translateY(40px)";

    el.style.transition = ".6s ease";

    revealObserver.observe(el);

});


// ===============================
// Current Year
// ===============================

const year = new Date().getFullYear();

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML = `© ${year} Sanjai K. All Rights Reserved.`;

}


// ===============================
// Console Message
// ===============================

console.log("%cWelcome to Sanjai's Portfolio 🚀", "color:#00d9ff;font-size:18px;font-weight:bold;");
console.log("%cMachine Learning Engineer | IEEE Published Researcher", "color:#ffffff;");
