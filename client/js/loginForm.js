let openRegisterForm = document.querySelector('.register-span');
let registerRedirectBtn = document.querySelector('.register-redirect');
let closeResponseBtn = document.querySelector('.close-response');
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