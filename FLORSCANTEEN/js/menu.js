document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Selectors
    const weeklyToggle = document.getElementById('weekly-toggle');
    const weeklyNav = document.getElementById('weekly-nav');
    const filterButtons = document.querySelectorAll('.tab-btn');
    const foodCards = document.querySelectorAll('.food-card');
    const searchInput = document.querySelector('.search-input');
    const foodGrid = document.querySelector('.food-grid');
    const addButtons = document.querySelectorAll('.add-item-btn');

    // 2. Weekly Toggle Logic
    // Itatago ang Mon-Sat sa simula at lalabas lang kapag clinick ang 'Weekly'
    if (weeklyToggle && weeklyNav) {
        weeklyToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isHidden = weeklyNav.style.display === 'none' || weeklyNav.style.display === '';
            weeklyNav.style.display = isHidden ? 'block' : 'none';
            
            // Opsyonal: I-reset ang filter pag sinara ang weekly nav
            if (!isHidden) {
                showAllCards();
            }
        });
    }

    // 3. Optimized Filter Logic
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Huwag pansinin ang toggle button para sa filtering logic
            if (button.id === 'weekly-toggle') return;

            const selectedCategory = button.getAttribute('data-category').toLowerCase();

            // Handle UI Active State
         foodCards.forEach(card => {
                const cardCat = card.getAttribute('data-category').toLowerCase();

                // --- START OF IF-ELSE DAY LOGIC ---
                if (selectedCategory === 'everyday') {

                    card.style.display = (cardCat === 'everyday') ? 'block' : 'none';
                } 
                else if (selectedCategory === 'monday') {
                    // Show Monday specials + Everyday staples
                    card.style.display = (cardCat === 'monday') ? 'block' : 'none';
                } 
                else if (selectedCategory === 'tuesday') {
                    card.style.display = (cardCat === 'tuesday') ? 'block' : 'none';
                } 
                else if (selectedCategory === 'wednesday') {
                    card.style.display = (cardCat === 'wednesday') ? 'block' : 'none';
                } 
                else if (selectedCategory === 'thursday') {
                    card.style.display = (cardCat === 'thursday') ? 'block' : 'none';
                } 
                else if (selectedCategory === 'friday') {
                    card.style.display = (cardCat === 'friday') ? 'block' : 'none';
                } 
                else if (selectedCategory === 'saturday') {
                    card.style.display = (cardCat === 'saturday') ? 'block' : 'none';
                } 
                else {
                    // This handles Special, Best Seller, and Drinks
                    card.style.display = (cardCat === selectedCategory) ? 'block' : 'none';
                }
                // --- END OF IF-ELSE DAY LOGIC ---
            });
        });
    });

    // 4. Search Logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchValue = e.target.value.toLowerCase();
            foodCards.forEach(card => {
                const dishName = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = dishName.includes(searchValue) ? 'block' : 'none';
            });
        });
    }

    // 5. Add to Cart Logic (Event Delegation)
    // Inside menu.js - Add to Cart Logic
addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = {
                name: btn.dataset.name,
                // Ensure price is treated as a number for calculations later
                price: parseFloat(btn.dataset.price),
                img: btn.dataset.img,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('canteenCart')) || [];
            const existing = cart.find(i => i.name === item.name);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(item);
            }

            localStorage.setItem('canteenCart', JSON.stringify(cart));
            alert(`${item.name} added to cart!`);
        });
    });

    // Helper function para ipakita ulit lahat
    function showAllCards() {
        foodCards.forEach(card => card.style.display = 'block');
        filterButtons.forEach(btn => btn.classList.remove('active'));
    }
});