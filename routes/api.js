var express = require('express');
var router = express.Router();
var middleware = require('../middlewares/index');
var apiController = require('../controllers/apiController');

router.use(middleware.apiAuth);

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.json({})
})
router.post('/idp', apiController.createIdentityProvider); //create identityProvider
router.post('/group', apiController.createGroup); // create group


module.exports = router;
