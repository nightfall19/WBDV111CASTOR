document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('#starRating i');
    const feedbackCard = document.getElementById('feedbackCard');
    const successCard = document.getElementById('successCard');
    const submitBtn = document.getElementById('submitBtn');
    let userRating = 0;

    // Star Selection Logic
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            userRating = index + 1;
            updateStars(userRating);
        });

        // Hover Effect
        star.addEventListener('mouseover', () => {
            updateStars(index + 1);
        });
    });

    // Reset stars to the clicked value when mouse leaves the container
    document.getElementById('starRating').addEventListener('mouseleave', () => {
        updateStars(userRating);
    });

    function updateStars(rating) {
        stars.forEach((s, i) => {
            s.classList.toggle('active', i < rating);
            // Toggle between Fill and Regular icon if desired
            if (i < rating) {
                s.classList.replace('ph-star', 'ph-star'); // Keep fill
            }
        });
    }

    // Submit Logic
    submitBtn.addEventListener('click', () => {
        if (userRating === 0) {
            alert("Please provide a star rating before submitting.");
            return;
        }

        // Hide form and show success
        feedbackCard.style.display = 'none';
        successCard.classList.remove('hidden');
    });
});