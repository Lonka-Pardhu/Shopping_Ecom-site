
let urlLink = window.location.href;

var route = '/?product=';

function getId() {
    var element = document.querySelectorAll('.product');
    element.forEach(ele => {
        ele.addEventListener('click', () => {
            window.location.assign(urlLink + route + ele.id);
        })
    });
}
getId()