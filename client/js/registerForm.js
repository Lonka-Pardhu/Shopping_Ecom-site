let openLoginFormOne = document.querySelector('.login-span');
let openLoginFormTwo = document.querySelector('.login-page-button')
let closeResponseMessage = document.querySelector('.close-response-message');
let timerSpanOne = document.querySelector('.counter-display-one');
const registerForm = document.getElementById('account-form');


let firstNameInput = document.querySelector('.fname-input');
let fNameValidationErr = document.querySelector('.fname-validation-err');

let lastNameInput = document.querySelector('.lname-input');
let lNameValidationErr = document.querySelector('.lname-validation-err');

let emailInput = document.querySelector('.email-input');
let emailValidationErr = document.querySelector('.email-validation-err');
const emailValidationRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;

let passwordInput = document.querySelector('.password-input');
let passwordValidationErr = document.querySelector('.password-validation-err');
const passwordValidationRegex = /^(?=.*[A-Z])(?=.*\d)(?=\S{8,}$).*/;

firstNameInput.addEventListener('input', () => {
    if (firstNameInput.value !== "") {
        fNameValidationErr.style.display = 'none';
    } else {
        fNameValidationErr.style.display = 'block'
        fNameValidationErr.innerHTML = "Please enter your first name";
    }
})
firstNameInput.addEventListener('focusout', () => {
    if (firstNameInput.value !== "") {
        fNameValidationErr.style.display = 'none';
    } else {
        fNameValidationErr.style.display = 'block'
        fNameValidationErr.innerHTML = "Please enter your first name";
    }
})
lastNameInput.addEventListener('input', () => {
    if (lastNameInput.value !== "") {
        lNameValidationErr.style.display = 'none';
    } else {
        lNameValidationErr.style.display = 'block'
        lNameValidationErr.innerHTML = "Please enter your last name";
    }
})
lastNameInput.addEventListener('focusout', () => {
    if (lastNameInput.value !== "") {
        lNameValidationErr.style.display = 'none';
    } else {
        lNameValidationErr.style.display = 'block'
        lNameValidationErr.innerHTML = "Please enter your last name";
    }
})

let timeout;
emailInput.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        var enteredEmail = emailInput.value.trim();
        if (emailValidationRegex.test(enteredEmail)) {
            emailValidationErr.style.display = 'none';
        } else if (emailInput.value === '') {
            emailValidationErr.style.display = 'block';
            emailValidationErr.innerHTML = 'Please enter your email.';
        } else {
            emailValidationErr.style.display = 'block';
            emailValidationErr.innerHTML = 'Please enter a valid email address (Ex: user@example.com)';
        }
    }, 500);
})
emailInput.addEventListener('focusout', () => {
    if (emailInput.value === '') {
        emailValidationErr.style.display = 'block';
        emailValidationErr.innerHTML = 'Please enter your email.';
    } else {
        emailValidationErr.style.display = 'none';
    }
})

passwordInput.addEventListener('input', () => {
    if (passwordValidationRegex.test(passwordInput.value)) {
        passwordValidationErr.style.display = 'none';
    } else {
        passwordValidationErr.style.display = 'block';
        passwordValidationErr.innerHTML = "Checking..."
    }
})
passwordInput.addEventListener('focusout', () => {
    if (passwordValidationRegex.test(passwordInput.value)) {
        passwordValidationErr.style.display = 'none';
    } else if (passwordInput.value === '') {
        passwordValidationErr.innerHTML = "Please create your password."
        passwordValidationErr.style.display = 'block';
    } else {
        passwordValidationErr.style.display = 'block';
        passwordValidationErr.innerHTML = "*Must be at least 8 characters long, *Atleast one uppercase<br>*Atleast one number, *No spaces allowed."
    }
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (fNameValidationErr.style.display === 'none' &&
        lNameValidationErr.style.display === 'none' &&
        emailValidationErr.style.display === 'none' &&
        passwordValidationErr.style.display === 'none') {

        const formData = new FormData(registerForm);
        const details = new URLSearchParams(formData);

        fetch('/register', {
            method: 'POST',
            body: details
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    document.querySelector(".register-response-layer").style.display = 'block';
                    document.querySelector(".register-response-one").style.display = 'flex';
                    document.getElementById('register-response-message-one').innerHTML = data.message;
                    countdownTimer(timerSpanOne);
                }
                else if (data.status === 409) {
                    document.querySelector(".register-response-layer").style.display = 'block';
                    document.querySelector(".register-response-two").style.display = 'flex';
                    document.getElementById('register-response-message-two').innerHTML = data.message;
                } else {
                    console.log("something went wrong")
                }
            })
            .catch(err => console.log(err))
    }
    else {
        return false;
    }
})
function countdownTimer(displayElement) {
    let timerSeconds = 3;
    setInterval(() => {
        displayElement.innerHTML = timerSeconds;
        timerSeconds--;
        if (timerSeconds <= -1) {
            clearInterval();
            window.location.href = '/index.html'
        }
    }, 1000);
}
openLoginFormOne.addEventListener('click', () => {
    window.location.href = '/index.html'
})

openLoginFormTwo.addEventListener('click', () => {
    window.location.href = '/index.html'
})

closeResponseMessage.addEventListener('click', () => {
    document.querySelector(".register-response-layer").style.display = 'none';
    document.querySelector(".register-response-two").style.display = 'none';
})
