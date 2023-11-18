let openRegisterForm = document.querySelector('.register-span');
const loginForm = document.getElementById('form-login');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let userLoginEmail = document.querySelector('.login-email-input').value;
    let userLoginPassword = document.querySelector('.login-password-input').value;

    if (userLoginEmail === '') {
        window.alert('Please enter your Email.')
    } else if (userLoginPassword === '') {
        window.alert('Please enter your Password')
    }
    else {
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
                    document.querySelector('.login-response-message-container').style.visibility = 'visible';
                    document.getElementById('login-response-message').innerHTML = data.message;
                }
                else if (data.status === 401) {
                    document.querySelector('.login-response-layer').style.display = 'block';
                    document.querySelector('.login-response-message-container-two').style.visibility = 'visible';
                    document.getElementById('login-response-message-two').innerHTML = data.message;
                } else {
                    console.log("something went wrong")
                }
            })
            .catch(err => console.log(err))
    }
})

openRegisterForm.addEventListener('click', () => {
    window.location.href = '/register.html'
})
