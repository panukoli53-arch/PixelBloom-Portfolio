
// PIXELBLOOM WEBSITE JAVASCRIPT

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");

// MOBILE NAVIGATION
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.innerHTML = isOpen
    ? '<i class="fas fa-xmark"></i>'
    : '<i class="fas fa-bars"></i>';
});

// CLOSE MENU AFTER CLICKING A LINK
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// DARK AND LIGHT MODE
const savedTheme = localStorage.getItem("pixelbloom-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

function updateThemeIcon() {
  themeToggle.innerHTML = document.body.classList.contains("dark")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark")
    ? "dark"
    : "light";

  localStorage.setItem("pixelbloom-theme", theme);
  updateThemeIcon();
});

// SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// ACTIVE NAVIGATION LINK
const pageSections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, {
    rootMargin: "-35% 0px -55% 0px"
  });

  pageSections.forEach(section => sectionObserver.observe(section));
}

// BACK TO TOP BUTTON
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields.";
    return;
  }

  const subject = encodeURIComponent("Portfolio Contact Message");
  const body = encodeURIComponent(
    "Name: " + name +
    "\nEmail: " + email +
    "\n\nMessage:\n" + message
  );

  formStatus.textContent =
    "Opening your email app. Please send the prepared message there.";

  window.location.href =
    "mailto:panukoli53@gmail.com?subject=" +
    subject + "&body=" + body;
});

// CURRENT YEAR
document.getElementById("year").textContent =
  new Date().getFullYear();
