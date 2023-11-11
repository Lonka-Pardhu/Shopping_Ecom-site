const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client'))

app.post('/register', function (req, res) {
    console.log(req.body);

    const data = req.body;
    let stringData = JSON.stringify(data);
    var fileName = `${data.email}.json`


    fs.appendFile(fileName, stringData, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('user data file created successfully..!')
        }
    })
    // res.redirect('/products.html');
    res.send({
        status: 200,
        message: "Registration Successful"
    })
});

app.get('/login', function (req, res) {
    console.log('LOGIN SUCCESSFUL')
})

app.listen(3000, () => {
    console.log('server is running at 3000')
})
