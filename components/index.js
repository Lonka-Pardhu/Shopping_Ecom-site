let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://nextjs-boilerplate-sgunique.vercel.app/api/products');

xhr.onload = function () {
    let response = JSON.parse(this.response);
    for (let i = 0; i < 30; i++) {
        createPrdt(response.result[i])
    }
}
xhr.send();

const createPrdt = function (product) {
    let item = document.createElement('div');
    item.className = "product";

    let prdtWrapper = document.createElement('div');
    prdtWrapper.className = "prdt-wrapper";

    let imgContainer = document.createElement('div');
    imgContainer.className = "img-container";

    let image = document.createElement('img');
    image.className = "prdt-img";
    image.src = product.image;

    let prdtName = document.createElement('h5');
    prdtName.className = "prdt-title";
    prdtName.innerHTML = product.name;

    let prdtPrice = document.createElement('h3');
    prdtPrice.className = "prdt-price";
    prdtPrice.innerHTML = product.price;

    let prdtRatingContainer = document.createElement('div');
    prdtRatingContainer.className = 'prdt-rating-container';

    let prdtRating = document.createElement('h4');
    prdtRating.className = "prdt-rating";
    prdtRating.innerHTML = product.rating;
    let ratingImg = document.createElement('img');
    ratingImg.className = "star-img";
    ratingImg.src = 'https://cdn-icons-png.flaticon.com/128/9715/9715468.png';

    let prdtReviews = document.createElement('p');
    prdtReviews.innerHTML = `(${product.reviews})`;

    item.appendChild(prdtWrapper);
    prdtWrapper.appendChild(imgContainer);
    imgContainer.appendChild(image);
    prdtWrapper.appendChild(prdtName);
    prdtWrapper.appendChild(prdtPrice);
    prdtRatingContainer.appendChild(prdtRating);
    prdtRatingContainer.appendChild(ratingImg);
    prdtRatingContainer.appendChild(prdtReviews);
    prdtWrapper.appendChild(prdtRatingContainer);
    document.getElementById('feed').appendChild(item);
}