let openLoginFormOne = document.querySelector('.login-span');
let openLoginFormTwo = document.querySelector('.login-page-button')
let closeResponseMessage = document.querySelector('.close-response-message')
let timerSpanOne = document.querySelector('.counter-display-one');
const registerForm = document.getElementById('account-form');
const passwordValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailValidationRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;
let emailInput = document.querySelector('.email-input');
let emailValidationErr = document.querySelector('.email-validation-err')

let timeout;
emailInput.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        var enteredEmail = emailInput.value.trim();
        if (emailValidationRegex.test(enteredEmail) || emailInput.value === '') {
            emailValidationErr.style.display = 'none';
        } else {
            emailValidationErr.style.display = 'block';
        }
    }, 1000);
})
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let userFirstName = document.querySelector('.fname-input').value;
    let userLastName = document.querySelector('.lname-input').value;
    let userEmail = document.querySelector('.email-input').value;
    let userDob = document.querySelector('.date-input').value;
    let userPassword = document.querySelector('.password-input').value;

    function validatePassword(password) {
        return passwordValidationRegex.test(password);
    }
    if (userFirstName === '') {
        window.alert('Please enter First Name');
    } else if (userLastName === '') {
        window.alert('Please enter your Last Name')
    } /*else if (userEmail === '') {
        window.alert('Please enter your Email.')
    } */else if (userDob === '') {
        window.alert('Please enter your Date of birth.')
    } else if (!document.querySelector('input[name="gender"]:checked')) {
        window.alert('Please select your Gender.')
    } else if (userPassword === '') {
        window.alert('Please create your Password')
    } else if (!validatePassword(userPassword)) {
        window.alert('Password must be at least 8 characters long and include atleast one letter and one number.')
    }
    else {
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
// *! prevent user form entering product page directly , check user is authenticate, or redirect to login page directly
// ** use cookie to check user login and clear cookie after closing browser
// ** user check login through saving user data in cookie
// ** initial login page
//  TODO:  form
