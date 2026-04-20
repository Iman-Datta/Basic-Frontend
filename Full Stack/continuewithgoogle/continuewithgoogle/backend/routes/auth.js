const router  = require('express').Router(); 
const passport = require('passport'); 
const jwt = require('jsonwebtoken'); 
 
// Step 1: redirect user to Google 
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] }) 
); 
// Step 2: Google redirects back here 
router.get('/google/callback', 
  passport.authenticate('google', { session: false }), 
  (req, res) => { 
    // Create JWT and redirect to React with token 
    const token = jwt.sign( 
      { id: req.user._id, email: req.user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' } 
    ); 
    res.redirect(`http://localhost:5173/auth?token=${token}`); 
  } 
); 
 
module.exports = router;