var data;
var storedData;
var initialIndex = 0;
var finalIndex = 30;
var productArrayLength;
var thirtyProducts;
const loader = document.querySelector('.spinner');
var blockLayer = document.querySelector('.block-layer');
var formDisplay = document.querySelector('.form-display');
var submitForm = document.querySelector('.submit-button')
var formSubmitted = false;
var isFormSubmitted = JSON.parse(window.localStorage.getItem('formSubmitted'));

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
            window.localStorage.setItem('formSubmitted', JSON.stringify(formSubmitted))
            displayForm();
        })
        .catch(error => console.log(error))
}

function displayForm() {
    if (isFormSubmitted) {
        blockLayer.style.display = 'none';
        formDisplay.style.display = 'none';
    } else {
        setTimeout(() => {
            blockLayer.style.display = 'block';
            formDisplay.style.display = 'block';
        }, 5000)
    }
}

let closeForm = document.querySelector('.ask-me-later-btn')
closeForm.addEventListener('click', () => {
    blockLayer.style.display = 'none';
    formDisplay.style.display = 'none';
});

submitForm.addEventListener('click', () => {
    window.localStorage.setItem('formSubmitted', 'true');
})