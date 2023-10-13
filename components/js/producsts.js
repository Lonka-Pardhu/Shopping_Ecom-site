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
function productCard(id) {
    const productElement = createElement(undefined, 'product');
    productElement.id = id;
    const productWrapper = createElement(undefined, 'product-wrapper');
    productElement.appendChild(productWrapper);


    document.getElementById('feed').appendChild(productElement);
    return productWrapper;
}

function createProductCard(productData) {
    productData.forEach(product => {

        const productContainer = productCard(product.id);

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
function isProductUrl() {
    return window.location.href.includes('?product=');
}

function renderProductDetailsPage() {
    storedData = JSON.parse(window.localStorage.getItem('apiData'));
    data = storedData;
    console.log(data)
    var productId = JSON.parse(window.localStorage.getItem('productId'))
    loader.style.display = 'none'
    let productPageContainer = createElement(undefined, 'productPageContainer')

    let productImageContainer = createElement(undefined, 'productImageContainer');
    let productPageImage = createElement('img', 'productPageImage');
    productPageImage.src = data.result[productId].image;
    productImageContainer.appendChild(productPageImage);
    productPageContainer.appendChild(productImageContainer);

    let productPageTitleContainer = createElement(undefined, 'productPageTitleContainer');
    let productPageTitle = createElement('h2', "productPageTitle");
    productPageTitle.innerHTML = data.result[productId].name;
    productPageTitleContainer.appendChild(productPageTitle)
    productPageContainer.appendChild(productPageTitleContainer);

    let productPagePriceContainer = createElement(undefined, 'productPagePriceContainer');
    let productPagePrice = createElement('h1', "productPagePrice");
    productPagePrice.innerHTML = data.result[productId].price;
    productPagePriceContainer.appendChild(productPagePrice)
    productPageContainer.appendChild(productPagePriceContainer);


    document.getElementById('feed').appendChild(productPageContainer)
}
if (isProductUrl()) {
    renderProductDetailsPage();
} else {
    getProducts('https://nextjs-boilerplate-sgunique.vercel.app/api/products', createProductCard)
}

