onload = () => {
    const c = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        clearTimeout(c);
        
        // Play background music
        const audio = document.getElementById('background-music');
        audio.volume = 0.5;
        
        // Add click event to start audio
        document.addEventListener('click', function startAudio() {
            audio.play()
                .then(() => {
                    console.log("Audio started playing");
                    document.removeEventListener('click', startAudio);
                })
                .catch(error => {
                    console.error("Audio playback failed:", error);
                });
        });
    }, 1000);
};

document.addEventListener('DOMContentLoaded', function() {
    // Get all elements once
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const slides = document.querySelectorAll('.slide');
    let currentModalIndex = 0;
    let currentSlide = 0;

    // Initialize first slide
    slides[0].classList.add('active');

    // Slider functionality
    function changeSlide(direction) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Previous/Next buttons for slider
    document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
    document.querySelector('.next').addEventListener('click', () => changeSlide(1));

    // Auto advance slides
    setInterval(() => changeSlide(1), 5000);

    // Modal functionality
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            currentModalIndex = index;
        });
    });

    // Modal navigation
    document.querySelector('.modal-prev').addEventListener('click', () => {
        currentModalIndex = (currentModalIndex - 1 + slides.length) % slides.length;
        modalImg.src = slides[currentModalIndex].src;
    });

    document.querySelector('.modal-next').addEventListener('click', () => {
        currentModalIndex = (currentModalIndex + 1) % slides.length;
        modalImg.src = slides[currentModalIndex].src;
    });

    // Close modal
    document.querySelector('.modal-close').addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Lyrics toggle
    document.querySelector('.lyrics-header').addEventListener('click', function() {
        document.querySelector('.lyrics-container').classList.toggle('open');
    });
});