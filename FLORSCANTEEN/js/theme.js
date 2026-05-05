document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeImg = themeToggle.querySelector('img'); // Target the img tag instead of <i>

    // Paths to your custom images
    const moonIcon = "./picture/moon.png";
    const sunIcon = "./picture/sun.png"; // Ensure you have a sun.png in your picture folder

    // Load saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeImg) themeImg.src = sunIcon; // Set to sun if dark mode is active
    }

    // Function to update chart colors for visibility
    const updateChartColors = () => {
        if (window.salesChart) {
            const isDark = document.body.classList.contains('dark-mode');
            const textColor = isDark ? '#a0a0a0' : '#747d8c'; //
            const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'; //

            window.salesChart.options.scales.x.ticks.color = textColor; //
            window.salesChart.options.scales.y.ticks.color = textColor; //
            window.salesChart.options.scales.y.grid.color = gridColor; //
            window.salesChart.update(); //
        }
    };

    // Initial chart color update
    setTimeout(updateChartColors, 200); //

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode'); //
        const isDark = document.body.classList.contains('dark-mode'); //

        // Update UI Image
        if (themeImg) {
            if (isDark) {
                themeImg.src = sunIcon; // Switch image to Sun
                localStorage.setItem('theme', 'dark'); //
            } else {
                themeImg.src = moonIcon; // Switch image back to Moon
                localStorage.setItem('theme', 'light'); //
            }
        }

        // Apply colors to chart
        updateChartColors(); //
    });
});