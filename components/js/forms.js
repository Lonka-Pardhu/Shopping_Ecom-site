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
// function validateFrom() {
//     var form = document.getElementById('account-form');
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         window.alert('something went wrong.!')
//     })
// }
// validateFrom();