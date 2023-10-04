const loader = document.querySelector('.spinner');
const moreProducts = document.querySelector('.more-products');


function getProducts(url, type, callback) {
    fetch(url)
        .then(response => {

            //displaying the loader while it takes time to render data/products
            loader.style.display = 'block';
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response[type](); // Convert the response to the specified type (e.g., 'json')
        })
        .then(object => {

            //disabling the loader when the data/products starts to render
            loader.style.display = 'none'

            let productArrayLength = object.result.length;

            var initialIndex = 0;
            var finalIndex = 30;
            var thirtyProducts = object.result.slice(initialIndex, finalIndex);

            callback(thirtyProducts)

            function showMore() {
                var showMoreButton = createElement('button', 'show-more');
                showMoreButton.innerHTML = 'show more...';
                showMoreButton.addEventListener('click', () => {
                    initialIndex += 30;
                    finalIndex += 30;

                    thirtyProducts = object.result.slice(initialIndex, finalIndex);
                    callback(thirtyProducts);
                    if (finalIndex >= productArrayLength) {
                        showMoreButton.innerHTML = 'Go to top <span class="up-arrow">&#9650;</span>';
                        showMoreButton.addEventListener('click', () => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                        })
                    }
                })
                moreProducts.appendChild(showMoreButton);
            }

            //displaying the show more button only after the feed gets rendered
            showMore();
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
        // for (let i = 0; i < 30; i++) {
        //     let product = productData[i]

        const productContainer = productCard();

        const productImageElement = productImage(product.image);

        const productTitleElement = productName(product.name);

        const productPriceElement = productPrice(product.price)

        const productRatingElement = productReviews(product.rating, product.reviews);

        productContainer.appendChild(productImageElement);
        productContainer.appendChild(productTitleElement);
        productContainer.appendChild(productPriceElement);
        productContainer.appendChild(productRatingElement);
        // }
    });
}
getProducts('https://nextjs-boilerplate-sgunique.vercel.app/api/products', 'json', createProductCard)