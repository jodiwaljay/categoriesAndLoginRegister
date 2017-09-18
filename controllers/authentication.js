const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      expires = require('expires'),
      randomstring = require('randomstring'),
      User = require('../models/users'),
      EM = require('./email-dispatcher.js'),
      config = require('../config/main');

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080*8 // in seconds
  });
}

function setUserInfo(request) {
  return {
    _id: request._id,
    //name: request.name,
    email: request.email,
    //role: request.role
  }
}

//========================================
// Login Route
//========================================
exports.postLogin = function(req, res, next) {

  let userInfo = setUserInfo(req.user);
  console.log(req.user);
  res.status(200).json({
    token: 'JWT '+generateToken(userInfo),
    user: userInfo
  });
}


//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  //const name = req.body.name;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  /*if (!name) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }
  */
  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
        emailVerified: false
      });

      user.save(function(err, user) {
        if (err) { console.log(err);
          return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

        let userInfo = setUserInfo(user);
        console.log(userInfo);
        res.status(201).json({
          token: 'JWT '+generateToken(userInfo),
          user: userInfo

        });
      });
  });

}

//========================================
// generateEmailVerification Route
//========================================
exports.generateEmailVerification = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        var emailToken = randomstring.generate();
        existingUser.emailToken = emailToken;
        var timeExp = expires.after('12 hours');
        existingUser.tokenExpire = timeExp;

      existingUser.save(function(err, user) {
        if (err) { console.log(err);
          return next(err);
        }

        console.log(emailToken);
        console.log(timeExp);

        var contentObj = {
          'email': email,
          'emailToken': emailToken
        }

        EM.dispatchResetPasswordLink(contentObj, function(err, m){
				// this callback takes a moment to return //
				// TODO add an ajax loader to give user feedback //
					if (!err){
						// email sent successfully
					}	else{
						for (k in e) console.log('ERROR : ', k, e[k]);
						res.status(400).send('unable to dispatch password reset');
					}
				});

        res.status(201).json({
          msg: 'Email Token Successfully generated and hopefully emailed'
        });
      });
    }

    else{
      return res.status(422).send({ error: 'That email address does not exist.' });
    }
  });

}


//========================================
// acceptEmailVerification Route
//========================================
exports.acceptEmailVerification = function(req, res, next) {
  // Check for registration errors
  console.log(req);
  const email = req.query.email;
  const emailToken = req.query.emailtoken;

  // Return error if no email provided
  if (!email) {
    return res.status(201).json({ error: 'You must enter an email address.'});
  }

  // Return error if no email provided
  if (!emailToken) {
    return res.status(422).send({ error: 'You must enter an email token.'});
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      if (existingUser) {

        if(existingUser.emailVerified){
          return res.status(201).json({
            msg: 'Email already verified !!'
          });
        }

        if(expires.expired(existingUser.tokenExpire)){
          return res.status(422).json({
            error: 'Email Token expired'
          });
        }

        if(emailToken === existingUser.emailToken){
          existingUser.emailVerified = true;
          existingUser.save(function(err, user) {
            if (err) {
              console.log(err);
              return next(err);
            }

            return res.status(201).json({
              msg: 'Email successfully verified'
            });
          });
        }

        else{
          return res.status(201).json({
            msg: 'Token improper. Please resend the email'
          });
        }
      }

      else{
        return res.status(422).json({ error: 'That email address does not exist.' });
      }

  });

}


//========================================
// Authorization Route
//========================================
exports.auth = function(req, res, next) {
  console.log(req);
  let userInfo = setUserInfo(req.user);
  /*
  console.log(req.user);
  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
  */
  res.status(201).json({
    user: userInfo
  });
}


//========================================
// Authorization Middleware
//========================================

// Role authorization check
exports.roleAuthorization = function(role) {
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    });
  }
}
