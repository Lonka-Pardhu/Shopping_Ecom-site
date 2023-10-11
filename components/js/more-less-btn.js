const moreButton = document.querySelector('.more-button');
const lessButton = document.querySelector('.less-button')

lessButton.style.display = 'none'
moreButton.style.display = 'none'

function showMore(callback) {
    moreButton.addEventListener('click', () => {
        if (finalIndex !== productArrayLength) {
            initialIndex += 30;
            finalIndex += 30;
            thirtyProducts = data.result.slice(initialIndex, finalIndex);
            callback(thirtyProducts);
            addRouteToProduct()
            lessButton.style.display = 'block';
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