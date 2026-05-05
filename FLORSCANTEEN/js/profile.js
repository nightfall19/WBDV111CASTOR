document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.querySelector('.profile-form');
    // Select by type or class to be safer
    const usernameInput = document.querySelector('input[type="text"][value="Nightfall"]') || document.querySelectorAll('.form-field input')[1];
    const fullNameInput = document.querySelector('input[type="text"][value="Fiona Frost"]') || document.querySelectorAll('.form-field input')[0];
    
    const headerUsername = document.querySelector('.profile-pill h6');

    // 1. Real-time preview (for the current page header only)
    usernameInput.addEventListener('input', (e) => {
        const newUsername = e.target.value;
        if (headerUsername) {
            headerUsername.textContent = newUsername.startsWith('@') ? newUsername : `@${newUsername}`;
        }
    });

    // 2. Permanent Save (updates all pages)
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newName = fullNameInput.value;
        const newUser = usernameInput.value;

        // SAVE TO LOCAL STORAGE
        localStorage.setItem('savedFullName', newName);
        localStorage.setItem('savedUsername', newUser);

        // Update current page UI
        alert("Profile saved! Your name will now be updated across all pages.");
        location.reload(); // Refresh to apply changes everywhere
    });
});
// Function to update user info on every page
function syncProfileData() {
    const savedName = localStorage.getItem('savedFullName');
    const savedUser = localStorage.getItem('savedUsername');

    // Update the Header Pill Name
    const headerNameSpan = document.querySelector('.profile-pill span');
    if (headerNameSpan && savedName) {
        // Keeps the <h6> tag intact while changing the text before it
        headerNameSpan.childNodes[0].textContent = savedName + " ";
    }

    // Update the Header Pill Username
    const headerUserH6 = document.querySelector('.profile-pill h6');
    if (headerUserH6 && savedUser) {
        headerUserH6.textContent = savedUser.startsWith('@') ? savedUser : `@${savedUser}`;
    }

    // Update Welcome Text (if it exists on the page)
    const welcomeText = document.querySelector('.welcome-text p');
    if (welcomeText && savedName) {
        welcomeText.textContent = `Welcome Back, ${savedName}`;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.querySelector('.profile-form');
    const usernameInput = document.querySelector('input[value="Nightfall"]') || document.querySelectorAll('.form-field input')[1];
    const fullNameInput = document.querySelector('input[value="Fiona Frost"]') || document.querySelectorAll('.form-field input')[0];

    // Handle Profile Save
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newName = fullNameInput.value;
        const newUser = usernameInput.value;
        const currentTime = new Date().getTime(); // Get timestamp in milliseconds

        // Save Data and the Time of update
        localStorage.setItem('savedFullName', newName);
        localStorage.setItem('savedUsername', newUser);
        localStorage.setItem('profileUpdateTimestamp', currentTime);

        alert("Profile updated! Notification active for 24 hours.");
        location.reload(); 
    });
});
// Run this every time a page loads
document.addEventListener('DOMContentLoaded', syncProfileData);