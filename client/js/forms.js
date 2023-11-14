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
})

// *? take control of form
// *! prevent user form entering product page directly , check user is authenticate, or redirect to login page directly
// ** use FormData object to append data to form data
// ** make files by email in server
// ** use cookie to check user login and clear cookie after closing browser
// ** user check login through saving user data in cookie
// ** initial login page
//  TODO:  form
