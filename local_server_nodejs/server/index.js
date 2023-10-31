const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: false }));

app.post('/formData', function (req, res) {
    const data = JSON.parse(JSON.stringify(req.body));

    fs.readFile('userData.json', 'utf8', function (err, fileData) {

        if (err) {
            console.error('Error reading data file:', err);
        }
        let userData = JSON.parse(fileData);

        userData.push(data);

        fs.writeFile('userData.json', JSON.stringify(userData), (err) => {
            if (err) {
                console.error(err);
            }
        })
    })
    console.log('Received Form Data:', data);
    console.log('user data/details successfully added to userData.json file')

    res.redirect('http://127.0.0.1:5500/Ecom_site/components/index.html');
    // res.redirect('https://shopping-website-99.vercel.app/');
});

app.listen(3000, () => {
    console.log('server is running at 3000')
})
