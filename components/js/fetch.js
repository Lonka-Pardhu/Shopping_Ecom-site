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
        .then(dataResponse => {
            data = dataResponse;
            loader.style.display = 'none';
            moreButton.style.display = 'block';

            productArrayLength = data.result.length;

            initialIndex = 0;
            finalIndex = 30;
            thirtyProducts = data.result.slice(initialIndex, finalIndex);

            callback(thirtyProducts)

            //calling the showMore function after the first thirty products loads
            showMore(callback);
            showLess();
        })
        .catch(error => console.log(error))
}