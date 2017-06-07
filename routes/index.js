  var
  express              = require('express'),
  router               = express.Router();

// Models
var User = require('../models/User');
var jwt = require('jsonwebtoken');
// Controllers
var userController  = require('../controllers/user');
var eventController =  require('../controllers/eventController')
var emailController =  require('../controllers/emailController.js')



router.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, "somesecret124389");
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});


router.get('/api/getAttendees/:eventName', eventController.getlist);
router.post('/api/checkIn/:eventName', eventController.checkIn);
router.post('/api/attend/:eventName', userController.signupPost);
router.post('/api/updateAttendee/:eventName',  eventController.updateAttendeeDetails)


router.put('/account', userController.ensureAuthenticated, userController.accountPut);
router.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
router.post('/login', userController.loginPost);
router.post('/forgot', userController.forgotPost);
router.post('/reset/:token', userController.resetPost);
router.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);



module.exports = router;