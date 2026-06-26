
const signUpForm = document.getElementById('signup-form');
const signInForm = document.getElementById('signin-form');

const studentNameInput = document.getElementById('StudName');
const studentNumberInput = document.getElementById('StudNum');
const passwordInput = document.getElementById('signup-password');
const confirmPasswordInput = document.getElementById('confirm-password');

const loginStudentNumber = document.getElementById('login-studnum');
const loginPassword = document.getElementById('login-password');

signUpForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = studentNameInput.value.trim();
    const number = studentNumberInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (name === '' || number === '' || password === '' || confirmPassword === '') {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find(user => user.studentNumber === number);

    if (existingUser) {
        alert("Student number already registered.");
        return;
    }

    const newUser = {
        name: name,
        studentNumber: number,
        password: password
    };

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    alert("Account created successfully!");

    signUpForm.reset();
});


signInForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const number = loginStudentNumber.value.trim();
    const password = loginPassword.value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const validUser = users.find(user => 
        user.studentNumber === number && user.password === password
    );

    if (validUser) {
        alert("Login successful! Welcome " + validUser.name);
    } else {
        alert("Invalid Student Number or Password.");
    }

    signInForm.reset();
});