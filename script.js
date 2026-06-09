const loader = document.getElementById("loader");
const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("navPanel");
const themeToggle = document.getElementById("themeToggle");
const typedText = document.getElementById("typedText");
const revealEls = document.querySelectorAll("[data-reveal]");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const projectModal = document.getElementById("projectModal");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalTech = document.getElementById("projectModalTech");
const projectModalDesc = document.getElementById("projectModalDesc");
const projectModalFeatures = document.getElementById("projectModalFeatures");
const projectModalBadge = document.getElementById("projectModalBadge");
const closeModalTargets = document.querySelectorAll("[data-close-modal]");
const cursorGlow = document.querySelector(".cursor-glow");
const navLinks = document.querySelectorAll(".nav-link");
const statNumbers = document.querySelectorAll("[data-count]");
const skillCards = document.querySelectorAll(".skill-card");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const typedPhrases = [
  "Building Intelligent AI Solutions",
  "Computer Vision Developer",
  "Deep Learning Researcher",
  "Future AI Innovator",
];

const preferredTheme = localStorage.getItem("theme");
if (preferredTheme) {
  document.body.dataset.theme = preferredTheme;
}

const syncThemeIcon = () => {
  const isLight = document.body.dataset.theme === "light";
  themeToggle.querySelector(".theme-toggle__icon").textContent = isLight ? "Light" : "Dark";
};

syncThemeIcon();

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
  if (nextTheme === "dark") {
    document.body.removeAttribute("data-theme");
  } else {
    document.body.dataset.theme = nextTheme;
  }
  localStorage.setItem("theme", nextTheme);
  syncThemeIcon();
});

navToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navPanel.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!navPanel.classList.contains("is-open")) {
    return;
  }
  const clickedInsideNav = navPanel.contains(event.target) || navToggle.contains(event.target);
  if (!clickedInsideNav) {
    navPanel.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navPanel.classList.contains("is-open")) {
    navPanel.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

let typedIndex = 0;
let charIndex = 0;
let deleting = false;

const typeLoop = () => {
  const current = typedPhrases[typedIndex];
  if (!deleting) {
    charIndex += 1;
    typedText.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex -= 1;
    typedText.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      typedIndex = (typedIndex + 1) % typedPhrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
};

typeLoop();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      if (entry.target.classList.contains("skill-card")) {
        entry.target.classList.add("is-visible");
      }
      if (entry.target.hasAttribute("data-count")) {
        animateCount(entry.target);
      }
    }
  });
}, { threshold: 0.18 });

revealEls.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

skillCards.forEach((card) => {
  revealObserver.observe(card);
});

const animateCount = (el) => {
  if (el.dataset.countStarted) {
    return;
  }
  el.dataset.countStarted = "true";
  const target = Number(el.dataset.count);
  const decimalPlaces = String(el.dataset.count).includes(".") ? 1 : 0;
  const duration = 850;
  const start = performance.now();
  const finalValue = target.toFixed(decimalPlaces);

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = target * (1 - Math.pow(1 - progress, 3));
    el.textContent = value.toFixed(decimalPlaces);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = finalValue;
    }
  };

  requestAnimationFrame(tick);
  window.setTimeout(() => {
    el.textContent = finalValue;
  }, duration + 150);
};

statNumbers.forEach((el) => {
  revealObserver.observe(el);
});

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}, { threshold: 0.55 });

document.querySelectorAll("section[id]").forEach((section) => sectionObserver.observe(section));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const tags = card.dataset.tags || "";
      const shouldShow = filter === "all" || tags.includes(filter);
      card.style.display = shouldShow ? "" : "none";
    });
  });
});

const openModal = (card) => {
  const title = card.dataset.title || "Project";
  const tech = card.dataset.tech || "";
  const desc = card.dataset.description || "";
  const features = card.dataset.features || "";

  projectModalTitle.textContent = title;
  projectModalTech.textContent = tech;
  projectModalDesc.textContent = desc;
  projectModalFeatures.textContent = features;
  projectModalBadge.textContent = card.querySelector(".badge")?.textContent || "Project";

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
};

document.querySelectorAll(".open-project").forEach((button) => {
  button.addEventListener("click", () => openModal(button.closest(".project-card")));
});

closeModalTargets.forEach((target) => {
  target.addEventListener("click", () => {
    projectModal.classList.remove("is-open");
    projectModal.setAttribute("aria-hidden", "true");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields before sending.";
    formStatus.style.color = "var(--accent)";
    return;
  }

  if (!emailPattern.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.style.color = "var(--accent)";
    return;
  }

  formStatus.textContent = "Sending message...";
  formStatus.style.color = "var(--secondary)";

  const submitUrl = contactForm.getAttribute("action");
  const formData = new FormData(contactForm);

  fetch(submitUrl, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Form submission failed");
      }
      formStatus.textContent = "Thanks! Your message has been sent.";
      formStatus.style.color = "var(--success)";
      contactForm.reset();
    })
    .catch(() => {
      formStatus.textContent = "Something went wrong. Please try again.";
      formStatus.style.color = "var(--accent)";
    });
});

const smoothMove = () => {
  if (!cursorGlow || window.matchMedia("(pointer: coarse)").matches) {
    if (cursorGlow) {
      cursorGlow.style.display = "none";
    }
    return;
  }
  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let targetX = currentX;
  let targetY = currentY;

  document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    document.body.style.setProperty("--cursor-x", `${targetX}px`);
    document.body.style.setProperty("--cursor-y", `${targetY}px`);
  });

  const animateCursor = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;
    requestAnimationFrame(animateCursor);
  };

  animateCursor();
};

smoothMove();

const resizeCanvas = () => {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
};

const particles = Array.from({ length: 70 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  radius: Math.random() * 1.8 + 0.4,
  vx: (Math.random() - 0.5) * 0.28,
  vy: (Math.random() - 0.5) * 0.28,
}));

const drawParticles = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < -20) particle.x = window.innerWidth + 20;
    if (particle.x > window.innerWidth + 20) particle.x = -20;
    if (particle.y < -20) particle.y = window.innerHeight + 20;
    if (particle.y > window.innerHeight + 20) particle.y = -20;

    ctx.beginPath();
    ctx.fillStyle = "rgba(88, 241, 255, 0.52)";
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();

    for (let j = index + 1; j < particles.length; j += 1) {
      const other = particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(78, 168, 255, ${0.12 - distance / 1100})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawParticles);
};

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawParticles();

window.addEventListener("load", () => {
  loader.classList.add("hidden");
});
