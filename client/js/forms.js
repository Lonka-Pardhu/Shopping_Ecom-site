const formEle = document.getElementById('account-form');

formEle.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formEle);
    const details = new URLSearchParams(formData);

    fetch('/register', {
        method: 'POST',
        body: details
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                document.getElementById('response').innerHTML = data.message;
                setTimeout(() => {
                    window.location.href = '/products.html'
                }, 3000)
            }
            else {
                console.log('something went wrong')
            }
        })
        .catch(err => console.log(err))
})


// *? take control of form
// *! prevent user form entering product page directly , check user is authenticate, or redirect to login page directly
// ** use FormData object to append data to form data
// ** make files by email in server
// ** use cookie to check user login and lcear cookie after closing borwser
// ** user check login through saving user data in cookie
// ** initial login page
//  TODO:  form



















// var accountForm = document.querySelector('.register-form');
// var openLoginForm = document.querySelector('.login-span')
// var loginForm = document.querySelector('.login-form');
// var openCreateAccForm = document.querySelector('.register-span')

// var popup = document.getElementById('response');

// openLoginForm.addEventListener('click', () => {
//     loginForm.style.display = 'block';
//     accountForm.style.display = 'none';
// })

// openCreateAccForm.addEventListener('click', () => {
//     accountForm.style.display = 'block';
//     loginForm.style.display = 'none';
// })