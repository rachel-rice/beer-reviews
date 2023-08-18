const express = require('express')
const passport = require('passport')
const router = express.Router()

//  @desc   Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google',{ scope: ['profile']} ))

//  @desc   Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/'}), 
(req, res) => {
    res.redirect('/dashboard')
})

// @desc    Logout user
// @route /auth/logout

// this doesn't work anymore
// router.get('/logout', (req, res) => {
//     req.logout()
//     res.redirect('/')
// })

router.get('/logout', function (req, res) {
    req.logout(function(err){
        if(err) {return (err);}
        res.redirect('/');
    });
    
});




module.exports = router