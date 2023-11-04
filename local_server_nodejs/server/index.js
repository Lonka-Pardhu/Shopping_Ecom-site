const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: false }));

app.post('/formData', function (req, res) {

    const data = req.body;
    let stringData = JSON.stringify(data);
    var fileName = `${data.first_name}.json`


    fs.appendFile(fileName, stringData, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('user data file created successfully..!')
        }
    })

    res.redirect('http://127.0.0.1:5500/components/products.html');
});

app.listen(3000, () => {
    console.log('server is running at 3000')
})
