const AuthenticationController = require('./controllers/authentication'),
      DatabaseController = require('./controllers/databaseQueries'),
      express = require('express'),
      passportService = require('./config/passport'),   // Not an import but execution, contains actual login Strategy (jwt and local)
      passport = require('passport'),
      path = require('path'),
      keystone = require('keystone'),
      match = require('react-router').match,
      RouterContext = require('react-router').RouterContext;
      //routes = require('./src/routes/routes.js');

  // Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  /*var mongo_express = require('mongo-express/lib/middleware');
  var mongo_express_config = require('./mongo_express_config.js');

  app.use('/mongo_express', mongo_express(mongo_express_config));*/
  //app.use('/keystone', require('keystone/admin/server/app/createStaticRouter.js')(keystone));
  //app.use('/keystone', require('keystone/admin/server/app/createDynamicRouter.js')(keystone));
  app.get('/api/auth', requireAuth, function(req, res) {
    res.send('It worked! User is: ' + req.user + '.');
  });

  app.use('/api/login', requireLogin, AuthenticationController.postLogin);
  app.use('/api/register', AuthenticationController.register);
  app.post('/api/emailVerification', AuthenticationController.generateEmailVerification);
  app.get('/api/emailVerification', AuthenticationController.acceptEmailVerification);
  app.get('/api/category', requireAuth, DatabaseController.getCategory);
  app.get('/api/category/:id',requireAuth, DatabaseController.getCatalogues);
  
};
