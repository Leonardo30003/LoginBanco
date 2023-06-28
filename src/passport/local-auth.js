const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, email, password, done) => {

    const user = await User.findOne({ email: email });
    if(user){
        return done (null, false,req.flash('signupMessage','El email ya ha sido registrado'))
    }else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password); //encryptada - sin encryptar  newUser.password=passwoord
        await newUser.save();
        done(null, newUser);
    }
}));
passport.use('local-signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req,email,passwoord,done)=>{
    const user = await User.findOne({email:email});
    if(!user){
        return done(null,false,req.flash('signinMessage','Usuario No Encontrado'));
    }
    if(!user.comparePassword(passwoord)){
        return done(null,false,req.flash('signinMessage','Contraseña Incorrecta'));
    }
    done(null,user);
}));
