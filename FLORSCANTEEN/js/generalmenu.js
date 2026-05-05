document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const weeklyNav = document.getElementById('weekly-nav');
    const foodCards = document.querySelectorAll('.food-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            const isWeeklyToggle = button.id === 'weekly-toggle';
            const isSecondary = button.parentElement.classList.contains('secondary');

            // 1. Highlight the button you just clicked
            if (!isSecondary) {
                // If it's a main menu item (Special, Best Seller, etc.)
                document.querySelectorAll('.filter-tabs:not(.secondary) .tab-btn')
                    .forEach(btn => btn.classList.remove('active'));
            } else {
                // If it's a specific day (Mon, Tue, etc.)
                document.querySelectorAll('.secondary .tab-btn')
                    .forEach(btn => btn.classList.remove('active'));
            }
            button.classList.add('active');

            // 2. Logic for showing/hiding the Weekly Days
            if (isWeeklyToggle) {
                // Toggle the display of Mon-Sat
                weeklyNav.classList.toggle('show');
                return; // Stop here so it doesn't filter food until a day is picked
            } else if (!isSecondary) {
                // If you click "Special" or "Drinks", hide the Weekly days
                weeklyNav.classList.remove('show');
            }

            // 3. Filter the food based on the choice
            if (category) {
                filterMenu(category);
            }
        });
    });

    function filterMenu(category) {
        const target = category.toLowerCase();
        foodCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category').toLowerCase();
            if (target === 'all' || cardCategory === target) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Default view when page opens
    filterMenu('special');
});
