var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Eventoken' });
});

/* GET Account page. */
router.get('/account', function(req, res, next) {
  res.render('account', { title: 'Eventoken - Account', name:null });
});

/* GET Events page. */
router.get('/events', function(req, res, next) {
  res.render('events', { title: 'Eventoken - Events', name:null });
});

/* GET Ticket page. */
router.get('/tickets', function(req, res, next) {
  res.render('tickets', { title: 'Eventoken - My Tickets', name:null });
});

/* GET Manag - Addevent page. */
router.get('/manag/addevent', function(req, res, next) {
  res.render('manag/addevent', { title: 'Eventoken - Create an Event' });
});

/* GET and POST Manag - Adduser page. */
router.get('/manag/adduser', function(req, res, next) {
  res.render('manag/adduser', { title: 'Eventoken - Add User' });
});

router.post('/manag/adduser', async (req, res) => {
  const { userMetamaskAdr, userNickname } = req.body;
  try {
    // Check if the user already exist useing the MetaMask address.
    let user = await User.findOne({ userMetamaskAdr });

    if (user) {
      console.log("User already exist")
      // redirect to account page.
      res.redirect('/account');
    } else {
      // If the user don't exist, create a new one.
      const newUser = await User.create({
        userMetamaskAdr,
        userID: 'useridtest01', // UserID example
        userNickname,
        userName: 'TestUser', // Name example
        userCity: 'Test City', // City example
        userEmail: 'test@example.com' // Email example
      });
      console.log("New user created")
      // redirect to account page.
      res.redirect('/account');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* GET Manag - Addevent page. */
router.get('/manag/addevent', function(req, res, next) {
  res.render('manag/addevent', { title: 'Eventoken - Create Event' });
});

module.exports = router;
