const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const expressLayout = require('express-ejs-layouts');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//Config express layout ejs
app.use(expressLayout);

app.set('view engine', 'ejs');

//--import from route module--

const adminRoute = require('./routes/admin');

const shopRoute = require('./routes/shop');

//--use from route--

app.use('/admin', adminRoute);// first method to use export route

// app.use('/admin', adminRoute.routes);// second method to use export route

app.use('/', shopRoute);

app.use('', (req, res, next) => {
    res.render('404', { pageTitle: 'Page Not Found!!', 'path': '' });
});

app.listen(3000);