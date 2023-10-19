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

function displayForm() {
    setTimeout(() => {
        let blockLayer = document.querySelector('.block-layer');
        blockLayer.style.display = 'block';
        let form = document.querySelector('.form-display');
        form.style.display = 'block';
    }, 5000)
}