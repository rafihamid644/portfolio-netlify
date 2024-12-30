document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');

    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Get the target section id
            const targetId = this.getAttribute('href');

            // Smooth scroll to target section
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });

    // Contact Form Handling
    const form = document.getElementById('contact-form');
    const result = document.getElementById('result');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            result.innerHTML = "Please wait...";
            result.style.display = "block";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = json.message;
                    result.classList.remove('error');
                    result.classList.add('success');
                    form.reset();
                } else {
                    result.innerHTML = json.message;
                    result.classList.remove('success');
                    result.classList.add('error');
                }
            })
            .catch(error => {
                result.innerHTML = "Something went wrong!";
                result.classList.remove('success');
                result.classList.add('error');
            })
            .then(function() {
                setTimeout(() => {
                    result.style.display = "none";
                    result.classList.remove('success', 'error');
                }, 5000);
            });
        });
    }

    // Intersection Observer untuk animasi fade-in
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Hentikan observasi setelah elemen muncul
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Amati semua elemen dengan kelas fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => observer.observe(element));
});
