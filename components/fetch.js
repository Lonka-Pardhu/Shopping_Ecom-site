function getProducts(url, type, callback) {
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
            loader.style.display = 'none';
            moreButton.style.display = 'block';

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
                        // lessButton.style.display = 'block'

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