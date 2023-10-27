var data;
var storedData;
var initialIndex = 0;
var finalIndex = 30;
var productArrayLength;
var thirtyProducts;
const loader = document.querySelector('.spinner');

function getProducts(url, callback) {
    storedData = JSON.parse(window.localStorage.getItem('apiData'));

    if (storedData) {
        data = storedData;
        thirtyProducts = data.result.slice(initialIndex, finalIndex);
        callback(thirtyProducts);
        loader.style.display = 'none';
        moreButton.style.display = 'block';
        showMore(callback);
        showLess();
        displayForm();
        return;
    }

    fetch(url)
        .then(response => {
            loader.style.display = 'block';
            if (response.ok) {
                return response.json();
            } else {
                console.log("error occurred" + response.status)
            }
        })
        .then(dataResponse => {
            data = dataResponse;

            productArrayLength = data.result.length;
            thirtyProducts = data.result.slice(initialIndex, finalIndex);

            callback(thirtyProducts);
            loader.style.display = 'none';
            moreButton.style.display = 'block';

            //calling the showMore function after the first thirty products loads
            showMore(callback);
            showLess();

            window.localStorage.setItem('apiData', JSON.stringify(data));
            displayForm();
        })
        .catch(error => console.log(error))
}

var blockLayer = document.querySelector('.block-layer');
var formDisplay = document.querySelector('.form-display');
function displayForm() {
    setTimeout(() => {
        blockLayer.style.display = 'block';
        formDisplay.style.display = 'block';
    }, 5000)
}
let closeForm = document.querySelector('.ask-me-later-btn')
closeForm.addEventListener('click', () => {
    blockLayer.style.display = 'none';
    formDisplay.style.display = 'none';
});

// document.getElementById('account-form').addEventListener('submit', function (e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     fetch('http://localhost:3000/formData', {
//         method: 'POST',
//         body: formData,
//     })
//         .then(response => response.text())
//         .then(data => {
//             console.log(data);
//             window.location.href = 'http://127.0.0.1:5500/Ecom_site/components/index.html';
//         })
//         .catch(error => console.error(error));
//     // debugger;
// });

// let submitButton = document.getElementById('submit-button');
// submitButton.addEventListener('click', () => {
//     let blockForm = document.querySelector('.form-display');
//     document.querySelector('.block-layer').style.display = 'none';
//     blockForm.style.display = 'none';
// })

// const form = document.getElementById('account-form');
// form.addEventListener('submit', function (event) {
//     alert('Form submitted!');
// });