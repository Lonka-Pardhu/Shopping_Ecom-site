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

                }
                else if (data.status === 401) {

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
