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

//product title function
function productName(title) {
    const productTitle = createElement('h5', 'product-title');
    productTitle.innerHTML = title;

    return productTitle;
}

//product price function
function productPrice(price) {
    const productPrice = createElement('h3', 'product-title');
    productPrice.innerHTML = price;

    return productPrice;
}

//product reviews function
function productReviews(rating, reviews) {
    const productRatingContainer = createElement(undefined, 'product-rating-container');

    const productRating = createElement('h4', 'product-rating');
    productRating.innerHTML = rating;
    productRatingContainer.appendChild(productRating);

    const ratingImage = createElement('img', 'star-img');
    ratingImage.src = 'https://cdn-icons-png.flaticon.com/128/9715/9715468.png';
    productRatingContainer.appendChild(ratingImage);

    const productReviewedPeople = createElement('p', undefined);
    productReviewedPeople.innerHTML = `(${reviews})`;
    productRatingContainer.appendChild(productReviewedPeople);

    return productRatingContainer;
}

//product div main function
function productCard() {
    const productElement = createElement(undefined, 'product');
    const productWrapper = createElement(undefined, 'product-wrapper');
    productElement.appendChild(productWrapper);

    document.getElementById('feed').appendChild(productElement);
    return productWrapper;
}

const createProductCard = function (product) {
    const productContainer = productCard();

    const productImageElement = productImage(product.image);

    const productTitleElement = productName(product.name);

    const productPriceElement = productPrice(product.price)

    const productRatingElement = productReviews(product.rating, product.reviews);

    productContainer.appendChild(productImageElement);
    productContainer.appendChild(productTitleElement);
    productContainer.appendChild(productPriceElement);
    productContainer.appendChild(productRatingElement);
}