const express = require('express'),
      app = express(),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      keystone = require('keystone'),
      multer = require('multer'),
      config = require('./config/main'),
      mongoose = require('mongoose');

const server = app.listen(config.port);
const router = require('./router');

console.log('Your server is running on port ' + config.port + '.');

require('coffee-script/register');
penguin = require('penguin');

admin = new penguin.Admin({
    fileManager: true,
    indexTitle: 'Administration Home!',

    menuExtraHTML: '<ul class="nav navbar-nav navbar-right"> <li> <a href="javascript:alert(\'Fake Logout link :)\')">Log Out</a> </li> </ul>',
    menu: [['Administration Home', '/admin'], ['Sections', [['Category', '/admin/categories'], ['Catalogue', '/admin/catalogues'], ['Users', '/admin/users']]]],
    uploadHandler: function(req, res, next) {
      return penguin.fileManager.save(req.files.upload, function(err, file) {
        return res.send("<script type='text/javascript'> window.parent.CKEDITOR.tools.callFunction(" + req.query.CKEditorFuncNum + ", '/" + file.path + "', 'Success!'); </script>");
      });
    },
    preMiddleware: function(req, res, next) {
      console.log('Administration Request:', req.url, req.$p);
      return next();
    },
    beforeMiddleware: function(req, res, next) {
      console.log('beforeMiddleware', req.url, Object.keys(req.$p));
      res.locals.breadcrumbs = [['/admin/', 'Home']];
      res.locals.breadcrumbs = [['/catalogues/', 'Sererfdv']];
      res.locals.breadcrumbs = [['/admin/', 'Home']];
      if (res.locals.model) {
        res.locals.breadcrumbs.push(['', res.locals.model.label]);
      }
      res.$p.viewBlocks['layout.above_content'] = '<div class="clearfix">Welcome to <strong>Penguin</strong> Automated Administration Panel!</div>';
      return next();
    }
  });
app.use(express.static('build')); // to be removed in production and build folder to be renamed public
admin.resLocals.statics.js.push('/admin/ckeditor/ckeditor.js');

admin.resLocals.statics.js.push('/admin/script.js');

admin.resLocals.statics.css.push('/admin/style.css');

mongoose.connect(config.database);

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(app);
admin.setupApp(app);
