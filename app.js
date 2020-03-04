const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const expressLayout = require('express-ejs-layouts');

//import from model
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//Config express layout ejs
app.use(expressLayout);

app.set('view engine', 'ejs');

//--import from route module--

const adminRoute = require('./routes/admin')

const shopRoute = require('./routes/shop');

app.use((req, res, next) => {
    User.findById("5e5e1d7b18c83815440b90c0")
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

//--use from route--

app.use('/admin', adminRoute);// first method to use export route

// app.use('/admin', adminRoute.routes);// second method to use export route

app.use('/', shopRoute);

app.use('', (req, res, next) => {
    res.render('404', { pageTitle: 'Page Not Found!!', 'path': '' });
});

mongoose.connect('mongodb+srv://Yabuto:Yabuto[6101997]@cluster0-t9d6d.mongodb.net/shop', { useNewUrlParser: true })
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Yabuto',
                        email: 'Yabuto@gmail.com'
                    })
                    user.save();
                }
            })
        console.log("connected DB...");
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })