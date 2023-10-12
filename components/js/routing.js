
var route = '?product=';

function addRouteToProduct() {
    var element = document.querySelectorAll('.product');
    element.forEach(ele => {
        ele.addEventListener('click', () => {
            let url = '';
            let urlComponents = urlLink.split('?');
            url = urlComponents[0] + route + ele.id;
            window.localStorage.setItem('product', ele.id)
            window.location.assign(url)

        })
    });
}
addRouteToProduct()