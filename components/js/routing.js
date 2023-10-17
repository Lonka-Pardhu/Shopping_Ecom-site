addRouteToProduct()

function renderProductDetailsPage() {
    document.getElementById('feed').style.display = 'none';
    document.querySelector('.productPage').style.display = 'block';
    storedData = JSON.parse(window.localStorage.getItem('apiData'));
    data = storedData;

    var productId = JSON.parse(window.localStorage.getItem('productId'))
    loader.style.display = 'none'

    const pageProductImage = document.getElementById('pageProductImage');
    pageProductImage.src = data.result[productId].image;

    const pageProductName = document.getElementById('pageProductName');
    pageProductName.innerHTML = data.result[productId].name;

    const pageProductDescription = document.getElementById('pageProductDescription');
    pageProductDescription.innerHTML = data.result[productId].description;

    const pageProductPrice = document.getElementById('pageProductPrice');
    pageProductPrice.innerHTML = data.result[productId].price;

    const pageProductRating = document.getElementById('pageProductRating');
    pageProductRating.innerHTML = data.result[productId].rating;

    const pageProductReviews = document.getElementById('pageProductReviews');
    pageProductReviews.innerHTML = data.result[productId].reviews;

}