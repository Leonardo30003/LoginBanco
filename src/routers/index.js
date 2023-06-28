const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, nex) => {
    res.render('index');
});
router.get('/signup', (req, res, nex) => {
    res.render('signup');
});
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true

}));
router.get('/signin', (req, res, nex) => {
    res.render('signin');
});
router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout',(req,res,next)=>{
    req.logout();
    res.redirect('/signin');
});

router.get('/profile',(req, res, nex) => {
    res.render('profile');
});

function isAutenticated(req,res,next){
    if(req.isAutenticate()){
        return next();
    }
    res.redirect('/signin');
};

module.exports = router;