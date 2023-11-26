addRouteToProduct()

function renderProductDetailsPage() {
    document.getElementById('feed').style.display = 'none';
    document.querySelector('.productPage').style.display = 'block';
    storedData = JSON.parse(window.localStorage.getItem('apiData'));
    data = storedData;

    var productId = JSON.parse(window.localStorage.getItem('productId'))
    loader.style.display = 'none';

    let clickedProduct = data.result.filter(function (product) {
        return product.id == productId;
    });
    clickedProduct = clickedProduct[0];
    const pageProductImage = document.getElementById('pageProductImage');
    pageProductImage.src = clickedProduct.image;

    const pageProductName = document.getElementById('pageProductName');
    pageProductName.innerHTML = clickedProduct.name;

    const pageProductDescription = document.getElementById('pageProductDescription');
    pageProductDescription.innerHTML = clickedProduct.description;

    const pageProductPrice = document.getElementById('pageProductPrice');
    pageProductPrice.innerHTML = clickedProduct.price;

    const pageProductRating = document.getElementById('pageProductRating');
    pageProductRating.innerHTML = clickedProduct.rating;

    const pageProductReviews = document.getElementById('pageProductReviews');
    pageProductReviews.innerHTML = clickedProduct.reviews;

}