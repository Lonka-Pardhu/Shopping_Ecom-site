const loader = document.querySelector('.spinner');
const moreButton = document.querySelector('.more-button');
const lessButton = document.querySelector('.less-button')

lessButton.style.display = 'none'
function getProducts(url, type, callback) {
    moreButton.style.display = 'none'
    fetch(url)
        .then(response => {
            loader.style.display = 'block';
            if (response.ok) {
                return response[type]();
            } else {
                console.log("error occurred" + response.status)
            }
        })
        .then(data => {
            moreButton.style.display = 'block';
            loader.style.display = 'none';

            let productArrayLength = data.result.length;

            var initialIndex = 0;
            var finalIndex = 30;
            var thirtyProducts = data.result.slice(initialIndex, finalIndex);

            callback(thirtyProducts)

            function showMore() {
                moreButton.addEventListener('click', () => {
                    if (finalIndex !== productArrayLength) {
                        initialIndex += 30;
                        finalIndex += 30;
                        thirtyProducts = data.result.slice(initialIndex, finalIndex);
                        callback(thirtyProducts);
                        lessButton.style.display = 'block'

                    } else {
                        finalIndex = productArrayLength;
                        initialIndex = finalIndex - 30;
                    }
                })
            }

            function showLess() {
                lessButton.addEventListener('click', () => {

                    initialIndex = initialIndex - 30;
                    finalIndex = finalIndex - 30;
                    // Remove the products beyond the first 30
                    const productsToRemove = document.querySelectorAll('.product');
                    for (let i = initialIndex + 30; i < productsToRemove.length; i++) {
                        productsToRemove[i].remove();
                    }

                    // Hiding "Show Less" button if we're at the beginning
                    if (initialIndex === 0) {
                        lessButton.style.display = 'none';
                    }
                });
            }

            //calling the showMore function after the first thirty products loads
            showMore();
            showLess();
        })
        .catch(error => console.log(error))
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