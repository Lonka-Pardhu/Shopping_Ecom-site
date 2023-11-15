const formEle = document.getElementById('account-form');
const passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

formEle.addEventListener('submit', (e) => {
    e.preventDefault();

    let userFirstName = document.querySelector('.fname-input').value;
    let userLastName = document.querySelector('.lname-input').value;
    let userEmail = document.querySelector('.email-input').value;
    let userDob = document.querySelector('.date-input').value;
    let userPassword = document.querySelector('.password-input').value;

    function validatePassword(password) {
        return passwordValidation.test(password);
    }
    if (userFirstName === '') {
        window.alert('Please enter First Name');
    } else if (userLastName === '') {
        window.alert('Please enter your Last Name')
    } else if (userEmail === '') {
        window.alert('Please enter your Email.')
    } else if (userDob === '') {
        window.alert('Please enter your Date of birth.')
    } else if (!document.querySelector('input[name="gender"]:checked')) {
        window.alert('Please select your Gender.')
    } else if (userPassword === '') {
        window.alert('Please create your Password')
    } else if (!validatePassword(userPassword)) {
        window.alert('Password must be at least 8 characters long and include atleast one letter and one number.')
    }
    else {
        const formData = new FormData(formEle);
        const details = new URLSearchParams(formData);

        fetch('/register', {
            method: 'POST',
            body: details
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    document.getElementById('response-message').innerHTML = data.message;
                    document.querySelector(".block-layer").style.display = 'block';
                    document.querySelector(".response-message-container").style.visibility = 'visible';
                    setTimeout(() => {
                        window.location.href = '/login.html'
                    }, 3000)
                }
                else if (data.status === 409) {
                    document.getElementById('response-message-two').innerHTML = data.message;
                    document.querySelector(".block-layer").style.display = 'block';
                    document.querySelector(".response-message-container-two").style.visibility = 'visible';
                    setTimeout(() => {
                        window.location.href = '/login.html'
                    }, 3000)
                } else {
                    console.log("something went wrong")
                }
            })
            .catch(err => console.log(err))
    }
})

// *! prevent user form entering product page directly , check user is authenticate, or redirect to login page directly
// ** use cookie to check user login and clear cookie after closing browser
// ** user check login through saving user data in cookie
// ** initial login page
//  TODO:  form
