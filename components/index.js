const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://nextjs-boilerplate-sgunique.vercel.app/api/products');

xhr.onload = function () {
    const response = JSON.parse(this.response);
    for (let i = 0; i < 30; i++) {
        createProductCard(response.result[i])
    }
}
xhr.send();


//tag and class name adding function
function createElement(tag = 'div', className) {
    const elem = document.createElement(tag);
    elem.className = className;

    return elem;
}

//product image function
function productImage(imageSource) {
    const imgContainer = createElement(undefined, 'img-container');
    const image = createElement('img', 'product-img');
    image.src = imageSource;
    imgContainer.appendChild(image);

    return imgContainer;
}

function productName(title) {
    const productTitle = createElement('h5', 'product-title');
    productTitle.innerHTML = title;

    return productTitle;
}
function productPrice(price) {
    const productPrice = createElement('h3', 'product-title');
    productPrice.innerHTML = price;

    return productPrice;
}

//product reviews function
function getReviews(rating, reviews) {
    const productRatingContainer = createElement(undefined, 'product-rating-container');

    const productRating = createElement('h4', 'product-rating');
    productRating.innerHTML = rating;
    productRatingContainer.appendChild(productRating);

    const ratingImage = createElement('img', 'star-img');
    ratingImage.src = 'https://cdn-icons-png.flaticon.com/128/9715/9715468.png';
    productRatingContainer.appendChild(ratingImage);

    const productReviews = createElement('p', undefined);
    productReviews.innerHTML = `(${reviews})`;
    productRatingContainer.appendChild(productReviews);

    return productRatingContainer;
}


const createProductCard = function (product) {

    const productElement = createElement(undefined, 'product');

    const productWrapper = createElement(undefined, 'product-wrapper');

    const productImageElement = productImage(product.image);

    const productTitleElement = productName(product.name);

    const productPriceElement = productPrice(product.price)

    const productRatingElement = getReviews(product.rating, product.reviews);


    productElement.appendChild(productWrapper);
    productWrapper.appendChild(productImageElement);
    productWrapper.appendChild(productTitleElement);
    productWrapper.appendChild(productPriceElement);
    productWrapper.appendChild(productRatingElement);
    document.getElementById('feed').appendChild(productElement);
}