/**
 * Login System for Genshin Impact Website
 * Handles modal login, session management, and UI state
 */

// === Modal Controls ===
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// === Modal Form Toggle Logic ===
const modalSignupBtn = document.getElementById("modalSignupBtn");
const modalLoginBtn = document.getElementById("modalLoginBtn");
const modalNameField = document.getElementById("modalNameField");
const modalTitle = document.getElementById("modalTitle");

if (modalLoginBtn) {
    modalLoginBtn.onclick = function () {
        if (!modalLoginBtn.classList.contains('disable')) {
            // If login button is active, perform login
            performModalLogin();
        } else {
            // Switch to login mode
            if (modalNameField) {
                modalNameField.style.maxHeight = "0";
                modalNameField.style.margin = "0";
                modalNameField.style.padding = "0";
            }
            if (modalTitle) {
                modalTitle.innerHTML = "Log In";
            }
            if (modalSignupBtn) {
                modalSignupBtn.classList.add("disable");
            }
            modalLoginBtn.classList.remove("disable");
        }
    };
}

if (modalSignupBtn) {
    modalSignupBtn.onclick = function () {
        if (!modalSignupBtn.classList.contains('disable')) {
            // If signup button is active, perform signup
            performModalLogin();
        } else {
            // Switch to signup mode
            if (modalNameField) {
                modalNameField.style.maxHeight = "65px";
                modalNameField.style.margin = "15px 0";
                modalNameField.style.padding = "0 20px";
            }
            if (modalTitle) {
                modalTitle.innerHTML = "Sign Up";
            }
            modalSignupBtn.classList.remove("disable");
            if (modalLoginBtn) {
                modalLoginBtn.classList.add("disable");
            }
        }
    };
}

// === Login/Signup Handler (Modal) ===
function performModalLogin() {
    const modal = document.getElementById('loginModal');
    const emailInput = modal ? modal.querySelector('input[type="email"], input[placeholder="Email"]') : null;
    const passwordInput = modal ? modal.querySelector('input[type="password"], input[placeholder="Password"]') : null;
    const nameInput = modal ? modal.querySelector('input[placeholder="Name"]') : null;

    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';
    const name = nameInput ? nameInput.value.trim() : '';

    // Validation
    if (!email) {
        alert('Please enter your email address.');
        if (emailInput) emailInput.focus();
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
    }

    if (!password) {
        alert('Please enter your password.');
        if (passwordInput) passwordInput.focus();
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        if (passwordInput) passwordInput.focus();
        return;
    }

    // Get username from name field or email
    const username = name || email.split('@')[0] || 'Traveler';

    // Save to localStorage
    localStorage.setItem('genshinUser', username);
    localStorage.setItem('genshinEmail', email);

    // Clear form
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (nameInput) nameInput.value = '';

    // Update UI
    updateProfileUI(username);

    // Close modal
    closeLoginModal();

    // Show welcome message
    alert('Welcome, ' + username + '!');
}

// === Update Profile UI ===
function updateProfileUI(username) {
    const navProfile = document.getElementById('nav-profile');
    if (navProfile) {
        navProfile.style.display = 'block';
        const profileToggle = navProfile.querySelector('.profile-toggle');
        if (profileToggle) {
            profileToggle.innerHTML = '<i class="fa-solid fa-user-astronaut"></i> ' + username;
        }
    }
}

// === Logout Function ===
function logout() {
    // Clear session
    localStorage.removeItem('genshinUser');
    localStorage.removeItem('genshinEmail');

    // Hide profile dropdown
    const navProfile = document.getElementById('nav-profile');
    if (navProfile) {
        navProfile.style.display = 'none';
    }

    // Redirect to home (if using SPA sections)
    if (typeof showSection === 'function') {
        showSection('home');
    }

    alert('You have been logged out. See you next time, Traveler!');
}

// === Check Session on Page Load ===
function checkSession() {
    const savedUser = localStorage.getItem('genshinUser');
    if (savedUser) {
        updateProfileUI(savedUser);
    }
}

// === Close Modal When Clicking Outside ===
window.addEventListener('click', function (event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLoginModal();
    }
});

// === Close Modal with Escape Key ===
window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeLoginModal();
    }
});

// === Initialize on DOM Load ===
document.addEventListener('DOMContentLoaded', function () {
    checkSession();
});
