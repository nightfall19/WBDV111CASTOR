document.addEventListener('DOMContentLoaded', () => {
    const historyContainer = document.getElementById('order-history-container');
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const clearBtn = document.getElementById('clear-history-btn');

    if (!historyContainer) return;

    if (orderHistory.length === 0) {
        historyContainer.innerHTML = `<p style="text-align:center; padding:20px;">No purchases found.</p>`;
        return;
    }

    historyContainer.innerHTML = orderHistory.map(order => `
        <div class="order-history-card">
            <div class="order-main-info">
                <div class="order-meta">Order ID: #${order.id} — Placed: ${order.orderDate}</div>
                <div style="color: #e67e22; font-weight: bold; margin: 5px 0;">
                    Scheduled: ${order.scheduledDate} at ${order.scheduledTime} (${order.mode})
                </div>
                <div class="order-items-list">
                    ${order.items.map(i => `<span>${i.name} (x${i.quantity})</span>`).join(', ')}
                </div>
                <div class="order-status-actions">
                    <span class="status-pill">${order.status}</span>
                    <span class="total-pill">${order.total}</span>
                </div>
            </div>
        </div>
    `).join('');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear your entire order history?")) {
            localStorage.removeItem('orderHistory');
            renderHistory(); // Re-renders the empty state
        }
    });
}

});