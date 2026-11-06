
// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }
});

// CLOSE MENU AFTER CLICKING LINK

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});

// DARK AND LIGHT MODE

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("portfolioTheme", "dark");
    } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("portfolioTheme", "light");
    }
});

// SCROLL ANIMATION

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll(".reveal").forEach(function (element) {
    observer.observe(element);
});

// CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {
        formStatus.textContent = "Please enter a valid name.";
        return;
    }

    if (!emailPattern.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        return;
    }

    if (message.length < 10) {
        formStatus.textContent = "Message must contain at least 10 characters.";
        return;
    }

    formStatus.textContent =
        "Form validated successfully! Email sending service is not connected yet.";

    contactForm.reset();
});
