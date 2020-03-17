const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const path = require('path');

const csrf = require('csurf');

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

const expressLayout = require('express-ejs-layouts');

const app = express();

const csrfProtection = csrf();

//import from model
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//Config express layout ejs
app.use(expressLayout);

app.set('view engine', 'ejs');

//--import from route module--

const authRoute = require('./routes/auth');

const adminRoute = require('./routes/admin')

const shopRoute = require('./routes/shop');

const MONGODB_URI = 'mongodb+srv://Yabuto:Yabuto[6101997]@cluster0-t9d6d.mongodb.net/shop';
const store = new MongoDBStore({
        uri: MONGODB_URI,
        collection: 'sessions'
    },
    function(error) {
        // Should have gotten an error
    });

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(csrfProtection);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

//--use from route--

app.use('/admin', adminRoute); // first method to use export route

// app.use('/admin', adminRoute.routes);// second method to use export route

app.use('/', shopRoute);

app.use(authRoute);

app.use('', (req, res, next) => {
    res.render('404', {
        pageTitle: 'Page Not Found!!',
        'path': '',
        isAuthenticated: req.isLoggedIn
    });
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(result => {
        console.log("connected DB...");
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })