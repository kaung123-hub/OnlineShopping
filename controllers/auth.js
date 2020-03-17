const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    res.render('auth/login.ejs', {
        pageTitle: 'Log In',
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postLogin = (req, res, next) => {
    // res.setHeader('set-Cookie', 'loggedIn = true; HttpOnly;'); // max-Age = 10 is for using the cookies duration
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        req.session.save(err => {
                            console.log(err);
                        })
                        return res.redirect('/');
                    } else {
                        res.redirect('/login');
                    }
                })
        })
        .catch(err => {
            console.log(err);
        });
    // req.session.cookie.maxAge = 10000;
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}

exports.getRegister = (req, res, next) => {
    res.render('auth/register.ejs', {
        pageTitle: 'Register',
        path: '/register',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postRegister = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(existUser => {
            if (existUser) {
                return res.redirect('/register');
            }
            bcrypt.hash(password, 12)
                .then(hashPassword => {
                    const user = new User({
                        email: email,
                        password: hashPassword,
                        cart: {
                            items: []
                        }
                    })
                    user.save().then(result => {
                        return res.redirect('/login ');
                    })
                })
        })
        .then(result => {
            res.redirect('/login')
        })
        .catch(err => {
            console.log(err);
        })
}