// var formSubmitted = false;
// window.localStorage.setItem('formSubmitted', JSON.stringify(formSubmitted))


// var formDisplay = document.querySelector('.form-display');
// var submitForm = document.querySelector('.submit-button')
// var isFormSubmitted = JSON.parse(window.localStorage.getItem('formSubmitted'));

// function displayForm() {
//     if (isFormSubmitted) {
//
//         formDisplay.style.display = 'none';
//     } else {
//         blockLayer.style.display = 'block';
//         formDisplay.style.display = 'block';
//     }
// }
// displayForm();

// let closeForm = document.querySelector('.ask-me-later-btn')
// closeForm.addEventListener('click', () => {
//
//     formDisplay.style.display = 'none';
// });

// submitForm.addEventListener('click', () => {
//     window.localStorage.setItem('formSubmitted', 'true');
// })
var accountForm = document.querySelector('.register-form');
var openLoginForm = document.querySelector('.login-span')
var loginForm = document.querySelector('.login-form');
var openCreateAccForm = document.querySelector('.register-span')

var popup = document.getElementById('response');

openLoginForm.addEventListener('click', () => {
    loginForm.style.display = 'block';
    accountForm.style.display = 'none';
})

openCreateAccForm.addEventListener('click', () => {
    accountForm.style.display = 'block';
    loginForm.style.display = 'none';
})

function validateForm(event) {
    // let firstName = document.getElementById('first-name');
    // let lastName = document.getElementById('last-name');
    event.preventDefault();
    // console.log('stopping form from submission')
    debugger;
    fetch('/register')
        .then(response => { response.json() })
        .then(data => {
            popup.innerHTML = data;
        })
        .catch(err => console.log(err))
    // return true;
}
// validateFrom();
