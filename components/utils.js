//function that helps creating tag element & adds class name
function createElement(tag = 'div', className) {
    const elem = document.createElement(tag);
    elem.className = className;

    return elem;
}