const OrderManager = {
    elements: {
        // Method Selection
        deliveryBtns: document.querySelectorAll('#delivery-methods .pill-btn'),
        paymentBtns: document.querySelectorAll('#payment-methods .pill-btn'),
        
        // Input Fields
        deliveryFields: document.getElementById('delivery-fields'),
        pickupFields: document.getElementById('pickup-fields'),
        deliveryDate: document.getElementById('delivery-date-select'),
        deliveryTime: document.getElementById('delivery-time'),
        pickupDate: document.getElementById('date-select'),
        pickupTime: document.getElementById('pickup-time'),
        gcashInfo: document.getElementById('gcash-info'),
        
        // Display and Actions
        cartItemsList: document.getElementById('cart-items-list'),
        placeOrderBtn: document.getElementById('place-order-btn'),
        subtotalVal: document.getElementById('sub-val'),
        shipVal: document.getElementById('ship-val'),
        totalVal: document.getElementById('total-val')
        
    },

    init() {
        this.renderOrderItems();
        this.setupEventListeners();
        this.setMinDates();
        this.updateTotals();
    },

    setMinDates() {
        const today = new Date().toISOString().split('T')[0];
        if (this.elements.deliveryDate) this.elements.deliveryDate.min = today;
        if (this.elements.pickupDate) this.elements.pickupDate.min = today;
    },

    validateDateTime() {
        const activeModeBtn = document.querySelector('#delivery-methods .pill-btn.active');
        const isPickup = activeModeBtn && activeModeBtn.dataset.mode === 'PICK-UP';
        const dateInput = isPickup ? this.elements.pickupDate : this.elements.deliveryDate;
        const timeInput = isPickup ? this.elements.pickupTime : this.elements.deliveryTime;

        // Ensure fields exist and are filled
        if (!dateInput?.value || !timeInput?.value) {
            alert("Please select both a date and a time.");
            return false;
        }

        // 1. Validate Mon-Sat (No Sundays)
        const selectedDate = new Date(dateInput.value);
        const day = selectedDate.getUTCDay(); 
        if (day === 0) {
            alert("Flor's Canteen is closed on Sundays. Please select Monday to Saturday.");
            return false;
        }

        // 2. Validate Time (8 AM - 4 PM)
        const [hours] = timeInput.value.split(':').map(Number);
        if (hours < 8 || hours >= 16) {
            alert("Please select a time between 8:00 AM and 4:00 PM.");
            return false;
        }
        return true;
    },

    updateTotals() {
        const cart = JSON.parse(localStorage.getItem('canteenCart')) || [];
        const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
        
        const activeModeBtn = document.querySelector('#delivery-methods .pill-btn.active');
        const isPickup = activeModeBtn && activeModeBtn.dataset.mode === 'PICK-UP';
        
        const deliveryFee = (!isPickup && cart.length > 0) ? 30.00 : 0.00;
        const tax = cart.length > 0 ? 10.00 : 0.00;
        const finalTotal = subtotal + deliveryFee + tax;

        if (this.elements.subtotalVal) this.elements.subtotalVal.innerText = `₱ ${subtotal.toFixed(2)}`;
        if (this.elements.shipVal) this.elements.shipVal.innerText = `₱ ${deliveryFee.toFixed(2)}`;
        if (this.elements.totalVal) this.elements.totalVal.innerText = `₱ ${finalTotal.toFixed(2)}`;
    },

    renderOrderItems() {
        const cart = JSON.parse(localStorage.getItem('canteenCart')) || [];
        const container = this.elements.cartItemsList;
        if (!container) return;
        
        container.innerHTML = cart.length === 0 ? '<p style="text-align:center; padding: 20px;">Your cart is empty.</p>' : '';
        
        cart.forEach((item, index) => {
            container.insertAdjacentHTML('beforeend', `
                <div class="cart-item">
                    <div class="item-info">
                        <img src="${item.img || 'placeholder.png'}" class="item-img">
                        <div class="item-details">
                            <h3>${item.name}</h3>
                            <div class="quantity-selector">
                                <button class="qty-btn" onclick="OrderManager.updateQty(${index}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" onclick="OrderManager.updateQty(${index}, 1)">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="item-actions">
                        <span>₱ ${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="delete-btn" onclick="OrderManager.removeItem(${index})">Remove</button>
                    </div>
                </div>`);
        });
        this.updateTotals();
    },

    setupEventListeners() {
        // Toggle Delivery/Pickup fields
        this.elements.deliveryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.elements.deliveryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const isPickup = btn.dataset.mode === 'PICK-UP';
                this.elements.deliveryFields.classList.toggle('hidden', isPickup);
                this.elements.pickupFields.classList.toggle('hidden', !isPickup);
                this.updateTotals();
            });
        });

        // Toggle GCash Info
        this.elements.paymentBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.elements.paymentBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const isGcash = btn.dataset.pay === 'GCASH';
                this.elements.gcashInfo.classList.toggle('hidden', !isGcash);
            });
        });

        // Main Action
        this.elements.placeOrderBtn?.addEventListener('click', () => this.handlePlaceOrder());
    },

    updateQty(index, change) {
        let cart = JSON.parse(localStorage.getItem('canteenCart'));
        cart[index].quantity += change;
        if (cart[index].quantity < 1) cart.splice(index, 1);
        localStorage.setItem('canteenCart', JSON.stringify(cart));
        this.renderOrderItems();
    },

    removeItem(index) {
        let cart = JSON.parse(localStorage.getItem('canteenCart'));
        cart.splice(index, 1);
        localStorage.setItem('canteenCart', JSON.stringify(cart));
        this.renderOrderItems();
    },

    handlePlaceOrder() {
        const cart = JSON.parse(localStorage.getItem('canteenCart')) || [];
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (!this.validateDateTime()) return;

        const activeModeBtn = document.querySelector('#delivery-methods .pill-btn.active');
        const isPickup = activeModeBtn.dataset.mode === 'PICK-UP';
        const dateInput = isPickup ? this.elements.pickupDate : this.elements.deliveryDate;
        const timeInput = isPickup ? this.elements.pickupTime : this.elements.deliveryTime;

        // Calculate Final Totals for the record
        const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
        const fee = isPickup ? 0 : 30;
        const total = subtotal + fee + 10;

        const purchasedOrder = {
            id: Math.floor(100000 + Math.random() * 900000),
            orderDate: new Date().toLocaleDateString(),
            scheduledDate: dateInput.value,
            scheduledTime: timeInput.value,
            mode: isPickup ? 'PICK-UP' : 'DELIVERY',
            items: cart,
            status: 'Processing',
            total: `₱ ${total.toFixed(2)}`
        };

        const history = JSON.parse(localStorage.getItem('orderHistory')) || [];
        history.unshift(purchasedOrder);
        localStorage.setItem('orderHistory', JSON.stringify(history));

        localStorage.removeItem('canteenCart');
        alert("Purchase successful!");
        window.location.href = 'UserGeneralViewHistoryOrder.html';
        const clearBtn = document.getElementById('clear-history-btn');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear your entire order history?")) {
            localStorage.removeItem('orderHistory');
            renderHistory(); // Re-renders the empty state
        }
    });
}

    }
    
    
};

document.addEventListener('DOMContentLoaded', () => OrderManager.init());