let openRegisterForm = document.querySelector('.register-span');
let registerRedirectBtn = document.querySelector('.register-redirect');
let closeResponseBtn = document.querySelector('.close-response');
const loginForm = document.getElementById('form-login');
const loginEmailValidationRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;


let loginEmailInput = document.querySelector('.login-email-input');
let loginEmailValidationErr = document.querySelector('.login-email-validation-err');

let loginPasswordInput = document.querySelector('.login-password-input');
let loginPasswordValidationErr = document.querySelector('.login-password-validation-err');

let loginValidationTimeout;
loginEmailInput.addEventListener('input', () => {
    console.log('triggered')
    clearTimeout(loginValidationTimeout);
    loginValidationTimeout = setTimeout(() => {
        var enteredLoginEmail = loginEmailInput.value.trim();
        if (loginEmailValidationRegex.test(enteredLoginEmail)) {
            loginEmailValidationErr.style.display = 'none';
        } else if (loginEmailInput.value === '') {
            loginEmailValidationErr.style.display = 'block';
            loginEmailValidationErr.innerHTML = 'Please enter your email.';
        } else {
            loginEmailValidationErr.style.display = 'block';
            loginEmailValidationErr.innerHTML = 'Please enter a valid email address<br>(Ex: user@example.com)';
        }
    }, 500);
})

loginEmailInput.addEventListener('focusout', () => {
    var enteredLoginEmail = loginEmailInput.value.trim();
    if (loginEmailInput.value === '') {
        loginEmailValidationErr.style.display = 'block';
        loginEmailValidationErr.innerHTML = 'Please enter your email.';
    } else {
        if (loginEmailValidationRegex.test(enteredLoginEmail)) {
            loginEmailValidationErr.style.display = 'none';
        } else {
            loginEmailValidationErr.style.display = 'block';
            loginEmailValidationErr.innerHTML = 'Please enter a valid email address<br>(Ex: user@example.com)';
        }
    }
})

loginPasswordInput.addEventListener('focusout', () => {
    if (loginPasswordInput.value === '') {
        loginPasswordValidationErr.innerHTML = "Please enter your password."
        loginPasswordValidationErr.style.display = 'block';
    } else {
        loginPasswordValidationErr.style.display = 'none';
    }
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (loginEmailValidationErr.style.display === 'none' &&
        loginPasswordValidationErr.style.display === 'none') {

        const formData = new FormData(loginForm);
        const details = new URLSearchParams(formData);

        fetch('/login', {
            method: 'POST',
            body: details
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    document.querySelector('.login-response-layer').style.display = 'block';
                    document.querySelector('.login-response-one').style.display = 'flex';
                    document.getElementById('login-response-message-one').innerHTML = data.message;
                    setTimeout(() => {
                        window.location.href = '/products.html';
                    }, 2000)
                }
                else if (data.status === 401) {
                    document.querySelector('.login-response-layer').style.display = 'block';
                    document.querySelector('.login-response-two').style.display = 'flex';
                    document.getElementById('login-response-message-two').innerHTML = data.message;
                } else if (data.status === 404) {
                    document.querySelector('.login-response-layer').style.display = 'block';
                    document.querySelector('.login-response-three').style.display = 'flex';
                    document.getElementById('login-response-message-three').innerHTML = data.message;
                }
                else {
                    console.log("something went wrong")
                }
            })
            .catch(err => console.log(err))
    } else {
        return false;
    }
})

openRegisterForm.addEventListener('click', () => {
    window.location.href = '/register.html';
})

registerRedirectBtn.addEventListener('click', () => {
    window.location.href = '/register.html';
})

closeResponseBtn.addEventListener('click', () => {
    document.querySelector('.login-response-layer').style.display = 'none';
    document.querySelector('.login-response-two').style.display = 'none';
})