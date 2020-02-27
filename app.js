const express = require('express');

const mongoConnect = require('./util/database').mongoConnect;

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
    User.findById("5e5376fd1c9d44000008e438")
        .then(user => {
            req.user = new User(user.email, user.name, user.cart, user._id);
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

mongoConnect(() => {
    app.listen(3000);
})