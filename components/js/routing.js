
var route = '?product=';

function addRouteToProduct() {
    var element = document.querySelectorAll('.product');
    element.forEach(ele => {
        ele.addEventListener('click', () => {
            let url = '';
            let urlComponents = urlLink.split('?');
            url = urlComponents[0] + route + ele.id;
            window.localStorage.setItem('productId', ele.id)
            window.location.assign(url)
            productId = urlLink.slice(-1);
            return productId;
        })
    });
}
addRouteToProduct()