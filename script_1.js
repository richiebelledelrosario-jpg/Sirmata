function show(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

const EYE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>`;

const EYE_OFF_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
           a18.45 18.45 0 0 1 5.06-5.94"/>
  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8
           a18.5 18.5 0 0 1-2.16 3.19"/>
  <line x1="1" y1="1" x2="23" y2="23"/>
</svg>`;

function togglePass(inputId, btn) {
    const inp = document.getElementById(inputId);
    if (inp.type === 'password') {
        inp.type = 'text';
        btn.innerHTML = EYE_OFF_ICON;
        btn.setAttribute('aria-label', 'Hide password');
    } else {
        inp.type = 'password';
        btn.innerHTML = EYE_ICON;
        btn.setAttribute('aria-label', 'Show password');
    }
}

function showBanner(id, duration) {
    const b = document.getElementById(id);
    b.classList.add('show');
    setTimeout(() => b.classList.remove('show'), duration || 2500);
}

function isValidName(name) {                                                    // This is our first validation. It checks if the name contains only letters and spaces.
    const nameRegex = /^[A-Za-z\s]+$/;                                          // Eto yun nagchecheck kung may letters at spaces sa name
    return nameRegex.test(name);
}

function isValidPassword(password) {                                            // Here naman is our validation for pass, it should be 8-16 chars, uppercase, lowercase, number, special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/;
    return passwordRegex.test(password);
}

function showError(inputId, message) {                                          // error message
    document.getElementById(inputId + "-error").textContent = message;
}

function clearError(inputId) {                                                  // if valid clear error message
    document.getElementById(inputId + "-error").textContent = "";
}

// Student Name real-time validation
document.getElementById("StudName").addEventListener("input", function () {
    if (!isValidName(this.value)) {
        showError("StudName", "Only letters and spaces allowed.");
    } else {
        clearError("StudName");
    }
});

// Student Password real-time validation
document.getElementById("signup-password").addEventListener("input", function () {
    if (!isValidPassword(this.value)) {
        showError("signup-password", "Weak password (8–16 chars, uppercase, lowercase, number, special).");
    } else {
        clearError("signup-password");
    }
});

// Student Sign Up
document.getElementById('Student-signup-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById("StudName").value;
    const number = document.getElementById("StudNum").value;
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("confirm-password").value;

    let valid = true;

    if (!isValidName(name)) {
        showError("StudName", "Invalid name.");
        valid = false;
    }

    if (!isValidPassword(password)) {
        showError("signup-password", "Invalid password.");
        valid = false;
    }

    if (password !== confirm) {
        showError("confirm-password", "Passwords do not match.");
        valid = false;
    }

    if (!valid) return;

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentNumber", number);
    localStorage.setItem("studentPassword", password);

    showBanner("studsignup-banner", 2000);
    setTimeout(() => { window.location.href = "frontpage.html"; }, 2000);
});

// Student Sign In
document.getElementById("Student-signin-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const number = document.getElementById("login-studnum").value;
    const password = document.getElementById("login-password").value;

    const storedNumber = localStorage.getItem("studentNumber");
    const storedPassword = localStorage.getItem("studentPassword");

    if (number === storedNumber && password === storedPassword) {
        showBanner("studsignin-banner", 2000);
        setTimeout(() => { window.location.href = "frontpage.html"; }, 2000);
    } else {
        const inp = document.getElementById("login-password");
        inp.style.border = "1.5px solid red";
        setTimeout(() => inp.style.border = "", 1500);
    }
});

// Applicant Name real-time validation
document.getElementById("ApplicantName").addEventListener("input", function () {
    if (!isValidName(this.value)) {
        showError("ApplicantName", "Only letters and spaces allowed.");
    } else {
        clearError("ApplicantName");
    }
});

// Applicant Password real-time validation
document.getElementById("Applicant-password").addEventListener("input", function () {
    if (!isValidPassword(this.value)) {
        showError("Applicant-password", "Password must be 8–16 chars, include uppercase, lowercase, number, special.");
    } else {
        clearError("Applicant-password");
    }
});

// Applicant Confirm Password real-time validation
document.getElementById("Applicant-confirm-password").addEventListener("input", function () {
    const password = document.getElementById("Applicant-password").value;
    if (this.value !== password) {
        showError("Applicant-confirm-password", "Passwords do not match.");
    } else {
        clearError("Applicant-confirm-password");
    }
});

// Applicant Sign Up
document.getElementById('Applicant-signup-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById("ApplicantName").value;
    const number = document.getElementById("ApplicantNum").value;
    const password = document.getElementById("Applicant-password").value;
    const confirm = document.getElementById("Applicant-confirm-password").value;

    let valid = true;

    if (!isValidName(name)) {
        showError("ApplicantName", "Invalid name.");
        valid = false;
    }

    if (!isValidPassword(password)) {
        showError("Applicant-password", "Invalid password.");
        valid = false;
    }

    if (password !== confirm) {
        showError("Applicant-confirm-password", "Passwords do not match.");
        valid = false;
    }

    if (!valid) return;

    localStorage.setItem("applicantName", name);
    localStorage.setItem("applicantNumber", number);
    localStorage.setItem("applicantPassword", password);

    showBanner("appsignup-banner", 2000);
    setTimeout(() => { window.location.href = "frontpage_2.html"; }, 2000);
});

// Applicant Sign In
document.getElementById("Applicant-signin-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const number = document.getElementById("login-Appnum").value;
    const password = document.getElementById("login-Apppass").value;

    const storedNumber = localStorage.getItem("applicantNumber");
    const storedPassword = localStorage.getItem("applicantPassword");

    if (number === storedNumber && password === storedPassword) {
        showBanner("appsignin-banner", 2000);
        setTimeout(() => { window.location.href = "frontpage_2.html"; }, 2000);
    } else {
        const inp = document.getElementById("login-Apppass");
        inp.style.border = "1.5px solid red";
        setTimeout(() => inp.style.border = "", 1500);
    }
});