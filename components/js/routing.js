var urlLink = window.location.href;

var route = '/?product=';

function addRouteToProduct() {
    var element = document.querySelectorAll('.product');
    element.forEach(ele => {
        ele.addEventListener('click', (event) => {
            // event.preventDefault();
            window.history.pushState(null, null, urlLink + route + ele.id);

            updatePageContent()
        })
    });
}
addRouteToProduct()

function updatePageContent() {
    var productId = window.location.search.replace('?product=', '');

    if (storedData && productId) {
        var productData = data.result[productId];
        console.log(productData)
        // window.location.assign(location.href)
        // var pageProduct = createElement(undefined, 'productPhoto');
        // pageProduct.innerHTML = productData;
        // document.getElementById('feed').appendChild(pageProduct);
    }
}
updatePageContent()