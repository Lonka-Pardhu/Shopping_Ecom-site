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

    fs.access(fileName, (err) => {
        if (err) { // if the file is not readable the following statements executes //
            fs.appendFile(fileName, stringData, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.send({
                        status: 200,
                        message: "Registration Successful"
                    })
                    console.log('user data file created successfully..!')
                }
            })
        } else { // if the file is readable the following statements executes //
            res.send({
                status: 409,
                message: "Account already exists."
            })
        }
    })
});

app.post('/login', function (req, res) {
    console.log(req.body);

    const userLogin = req.body;
    var loginPassword = userLogin.password;
    var userAccount = `${userLogin.email}.json`;

    fs.access(userAccount, (err) => {
        // if the file is not readable it means user does not has an account//
        if (err) {
            res.send({
                status: 401,
                message: 'Account does not exist, please register and try again.'
            })
        } else { // if the file is the readable it means user has an account >> proceeds to check if he/she has entered correct password//
            fs.readFile(userAccount, 'utf8', (err, userData) => {
                if (err) {
                    console.log('Error reading file', err);
                } else {
                    const userCredentials = JSON.parse(userData);
                    const storedPassword = userCredentials.password;
                    if (loginPassword === storedPassword) {
                        res.send({
                            status: 200,
                            message: 'Login Successful.'
                        })
                    } else {
                        res.send({
                            status: 401,
                            message: 'Incorrect password'
                        })
                    }
                }
            })

        }
    })
})

app.listen(3000, () => {
    console.log('server is running at 3000')
})
