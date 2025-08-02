// This file contains all JavaScript logic for various interactive sections of your website.

document.addEventListener('DOMContentLoaded', () => {
    console.log("section.js loaded and DOMContentLoaded fired.");

    // --- Initialize AOS (Animate On Scroll) Library ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, // values from 0 to 3000, with step 50ms
            once: false, // whether animation should happen only once - while scrolling down
        });
        console.log("AOS initialized.");
    } else {
        console.warn("AOS library not found. Ensure it's linked in your HTML.");
    }


    // --- Banner Slider Functionality ---
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".nav-btn.prev-btn");
    const nextBtn = document.querySelector(".nav-btn.next-btn");

    function showSlide(index) {
        if (slides.length === 0) return;

        slides.forEach(slide => slide.classList.remove("active"));
        const normalizedIndex = (index % slides.length + slides.length) % slides.length;
        slides[normalizedIndex].classList.add("active");
        currentSlide = normalizedIndex;
    }

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);


    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    if (slides.length > 0) {
        showSlide(0); // Initialize with the first slide
        // setInterval(nextSlide, 5000); // Uncomment for auto-play if desired
    }


    // --- Achievements Accordion Functionality ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            // Close all other open accordions
            document.querySelectorAll('.accordion-item.active').forEach(openItem => {
                if (openItem !== accordionItem) {
                    openItem.classList.remove('active');
                }
            });

            // Toggle the clicked accordion
            accordionItem.classList.toggle('active');
            // Refresh AOS after accordion state changes
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });


    // --- Facilities Tabbed Grid Functionality ---
    const tabButtons = document.querySelectorAll('.facilities-tabs-container .tab-btn');
    const facilityCards = document.querySelectorAll('.facilities-grid-content .facility-card');

    // Function to filter facilities based on category
    const filterFacilities = (category) => {
        facilityCards.forEach(card => {
            const cardCategory = card.dataset.category;
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
                card.classList.add('hidden');
            }
        });
        // Crucial: Refresh AOS after cards visibility changes
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    };

    // Add click listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            filterFacilities(category);
        });
    });

    // Initialize: Activate the 'Academic' tab and show its facilities on page load
    const academicTabButton = document.querySelector('.facilities-tabs-container .tab-btn[data-category="academic"]');
    if (academicTabButton) {
        academicTabButton.click(); // Simulate a click to initialize
    }


    // --- Event Celebration Section (Dynamic Showcase) ---

    // --- FAQ Accordion Functionality ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');

            document.querySelectorAll('.faq-item.active').forEach(openItem => {
                if (openItem !== faqItem) {
                    openItem.classList.remove('active');
                    openItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            faqItem.classList.toggle('active');
            if (faqItem.classList.contains('active')) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            } else {
                faqAnswer.style.maxHeight = null;
            }
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });

    // --- Generic Modal Functionality (Handles multiple modals) ---
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    console.log(`[Modal Debug] Found ${modalTriggers.length} modal triggers on page load.`);

    const openModal = (modalId) => {
        console.log(`[Modal Debug] Attempting to open modal: ${modalId}`);
        const modal = document.getElementById(modalId);
        if (modal) {
            console.log(`[Modal Debug] Modal element found for ID: ${modalId}. Adding 'active' class.`);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling of background
            if (typeof AOS !== 'undefined') {
                AOS.refresh(); // Refresh AOS for modal content
            }
        } else {
            console.error(`[Modal Debug] ERROR: Modal element not found for ID: ${modalId}. Check HTML ID.`);
        }
    };

    const closeModal = (modalElement) => {
        if (modalElement) {
            console.log(`[Modal Debug] Attempting to close modal: ${modalElement.id}`);
            modalElement.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const modalId = trigger.dataset.modalTarget;
            console.log(`[Modal Debug] Click event detected on trigger. Target modal ID: ${modalId}`);
            openModal(modalId);
        });
    });

    // Event listeners for closing modals
    document.querySelectorAll('.modal').forEach(modal => {
        // Close buttons inside the modal
        modal.querySelectorAll('.close-button, .modal-close-btn').forEach(button => {
            button.addEventListener('click', () => {
                console.log(`[Modal Debug] Close button clicked for modal: ${modal.id}`);
                closeModal(modal);
            });
        });

        // Close modal when clicking outside of modal-content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // Only close if clicking directly on the overlay
                console.log(`[Modal Debug] Clicked outside modal content for modal: ${modal.id}`);
                closeModal(modal);
            }
        });
    });

    // Close any active modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                console.log(`[Modal Debug] Escape key pressed. Closing active modal: ${activeModal.id}`);
                closeModal(activeModal);
            }
        }
    });

});

//the section of events celebration
const carouselWrapper = document.querySelector('.carousel-wrapper-section');
const slides = document.querySelectorAll('.carousel-event-banner');
const carouselSlides = document.querySelector('.carousel-slides-container');
const prevButton = document.querySelector('.carousel-prev-button');
const nextButton = document.querySelector('.carousel-next-button');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
let slideInterval;
const totalSlides = slides.length;

function showSlide(n) {
    if (n >= totalSlides) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = n;
    }
    carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update active dot indicator
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 7000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Event Listeners for Buttons
nextButton.addEventListener('click', () => {
    stopAutoSlide();
    showSlide(currentSlide + 1);
    startAutoSlide();
});

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    showSlide(currentSlide - 1);
    startAutoSlide();
});

// Event Listeners for Dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
    });
});

// Pause/Resume on Hover
carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
carouselWrapper.addEventListener('mouseleave', startAutoSlide);

// Initial setup
showSlide(0);
startAutoSlide();