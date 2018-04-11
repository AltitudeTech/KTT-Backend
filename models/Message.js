var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Message Model
 * =============
 */

var Message = new keystone.List('Message', {
	// /*nocreate: true,
	// noedit: true,*/
	// track: true
});

Message.add({
	name: { type: Types.Text, initial: true, required: true},	
	email: { type: Types.Email, initial: true, required: false, index: true },
	phone: { type: String, index: true },
	message: { type: Types.Textarea, initial: true, required: true },
});
/*
Message.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Message.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Message.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== 'function') {
		callback = function (err) {
			if (err) {
				console.error('There was an error sending the notification email:', err);
			}
		};
	}

	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log('Unable to send email - no mailgun credentials provided');
		return callback(new Error('could not find mailgun credentials'));
	}

	var Message = this;
	var brand = keystone.get('brand');

	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
		if (err) return callback(err);
		new keystone.Email({
			templateName: 'Message-notification',
			transport: 'mailgun',
		}).send({
			to: admins,
			from: {
				name: 'Ktt-Backend',
				email: 'contact@ktt-backend.com',
			},
			subject: 'New Message for Ktt-Backend',
			Message: Message,
			brand: brand,
		}, callback);
	});
};*/

Message.defaultSort = '-createdAt';
Message.defaultColumns = 'name, email, MessageType, createdAt';
Message.register();
