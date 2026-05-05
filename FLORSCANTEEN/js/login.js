document.addEventListener('DOMContentLoaded', () => {
    // === 1. ELEMENT SELECTIONS ===
    const container = document.getElementById('container');
    const signUpBtn = document.getElementById('signUp');
    const signInBtn = document.getElementById('signIn');

    const toForgot = document.getElementById('to-forgot');
    const toSignin = document.getElementById('to-signin');
    const signinView = document.getElementById('signin-view');
    const forgotView = document.getElementById('forgot-view');

    const togglePass = document.getElementById('toggle-pass');
    const passInput = document.getElementById('pass-input');
    const emailInput = document.querySelector('.sign-in-container input[type="email"]');

    const modal = document.getElementById('termsModal');
    const openTermsBtn = document.getElementById('openTermsModal');
    const closeTermsBtn = document.getElementById('closeTerms');
    const agreeTermsBtn = document.getElementById('agreeBtn');
    const signInTerms = document.querySelector('.sign-in-container input[name="terms"]');

    const useButtons = document.querySelectorAll('.use-btn');

    // === 2. PANEL SLIDING (SIGN IN / SIGN UP) ===
    signUpBtn.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInBtn.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    // === 3. VIEW TOGGLE (FORGOT PASSWORD) ===
    if (toForgot && toSignin) {
        toForgot.addEventListener('click', (e) => {
            e.preventDefault();
            signinView.classList.add('hidden');
            forgotView.classList.remove('hidden');
        });

        toSignin.addEventListener('click', (e) => {
            e.preventDefault();
            forgotView.classList.add('hidden');
            signinView.classList.remove('hidden');
        });
    }

    // === 4. PASSWORD VISIBILITY ===
    if (togglePass && passInput) {
        togglePass.addEventListener('click', () => {
            const isPassword = passInput.getAttribute('type') === 'password';
            passInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePass.classList.toggle('fa-eye');
            togglePass.classList.toggle('fa-eye-slash');
        });
    }

    // === 5. TERMS MODAL LOGIC ===
    if (openTermsBtn) {
        openTermsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }

    closeTermsBtn.addEventListener('click', () => modal.style.display = 'none');
    
    agreeTermsBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        signInTerms.checked = true;
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) modal.style.display = 'none';
    });

    // === 6. DEMO ACCOUNT "USE" BUTTONS ===
    useButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.account-card');
            const username = card.querySelector('.credential-row:nth-of-type(1) .value').innerText.trim();
            const password = card.querySelector('.credential-row:nth-of-type(2) .value').innerText.trim();

            // Reset UI state to Sign In
            container.classList.remove("right-panel-active");
            signinView.classList.remove('hidden');
            forgotView.classList.add('hidden');

            // Fill inputs
            emailInput.value = username;
            passInput.value = password;
            signInTerms.checked = true; // Auto-check terms for demo ease

            // Feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => button.innerHTML = originalText, 1000);
        });
    });

    // === 7. FORM SUBMISSION & VALIDATION ===
    const validateForm = (selector) => {
        const fields = document.querySelectorAll(`${selector} input[required]`);
        let valid = true;

        fields.forEach(input => {
            if (input.type === 'checkbox' ? !input.checked : !input.value.trim()) {
                valid = false;
                input.style.outline = "2px solid red";
            } else {
                input.style.outline = "none";
                input.style.borderColor = "var(--border)";
            }
        });
        return valid;
    };

    document.querySelector('.sign-in-container .main-btn').addEventListener('click', () => {
        if (validateForm('.sign-in-container')) {
            console.log("Attempting Login...");
            // Your redirection logic from login.html <script> can go here
        } else {
            alert("Please fill all fields and agree to terms.");
        }
    });
});