var config = require('../config/main.js');

var EM = {};
module.exports = EM;

EM.server = require('emailjs/email').server.connect(
{
	host 	    : 'smtp.gmail.com',
	user 	    : 'jodiwaljay@gmail.com',
	password  : 'jay59914021',
	ssl		    : true
});

EM.dispatchResetPasswordLink = function(contentObj, callback)
{
	EM.server.send({
		from         : process.env.EMAIL_FROM || 'Node Login <do-not-reply@gmail.com>',
		to           : contentObj.email,
		subject      : 'Password Reset',
		text         : 'something went wrong... :(',
		attachment   : EM.composeEmail(contentObj)
	}, callback );
}

EM.composeEmail = function(contentObj)
{
	var link = config.link + 'api/emailVerification?email=' + contentObj.email+'&emailtoken='+contentObj.emailToken;
	var html = "<html><body>";
		/*html += "Hi "+o.name+",<br><br>";
		html += "Your username is <b>"+o.user+"</b><br><br>";*/
		html += "<a href='"+link+"'>Click here to reset your password</a><br><br>";
		/*html += "Cheers,<br>";
		html += "<a href='https://twitter.com/braitsch'>braitsch</a><br><br>";*/
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}
