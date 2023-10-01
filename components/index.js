const loader = document.querySelector('.spinner');
const moreProducts = document.querySelector('.more-products');

function showMore() {
    var showMoreButton = createElement('button', 'show-more');
    showMoreButton.innerHTML = 'show more...';
    showMoreButton.addEventListener('click', () => {
        console.log('test passed')
    })
    moreProducts.appendChild(showMoreButton);
}

function getProducts(url, type, callback) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = type;
    //displaying the loader while it takes time to render data/products
    loader.style.display = 'block';

    xhr.open('GET', url);

    xhr.onload = function () {
        //disabling the loader when the data/products starts to render
        loader.style.display = 'none'
        const response = xhr.response;
        callback(response.result);
        //displaying the show more button only after the feed gets rendered
        showMore();
    }
    xhr.send();
}
//function that helps creating tag element & adds class name
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

function createProductCard(productData) {
    productData.forEach(product => {

        const productContainer = productCard();

        const productImageElement = productImage(product.image);

        const productTitleElement = productName(product.name);

        const productPriceElement = productPrice(product.price)

        const productRatingElement = productReviews(product.rating, product.reviews);

        productContainer.appendChild(productImageElement);
        productContainer.appendChild(productTitleElement);
        productContainer.appendChild(productPriceElement);
        productContainer.appendChild(productRatingElement);
    });
}
getProducts('https://nextjs-boilerplate-sgunique.vercel.app/api/products', 'json', createProductCard)