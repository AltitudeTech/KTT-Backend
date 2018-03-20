var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Outlet Model
 * ==========
 */
var Outlet = new keystone.List('Outlet', {
	track: true
});

Outlet.add({
	name: { type: String, required: true, index: true },
	description: {type: Types.Text, index: true, initial: true },
	phone: {type: Types.Text, initial: true, index: true},
	website: {type: Types.Text, initial: true, index: true},
	email: { type: Types.Email, required: false, unique: false, initial: true },
	//emailAddress: { type: Types.Email, initial: true, required: false, unique: true, index: true },
	username: {type: Types.Text, index: true},
	password: { type: Types.Password, required: false },
	type: { type: Types.Relationship, ref: 'OutletType', many: true,  initial: true },
	messages: { type: Types.Relationship, ref: 'Message', many: true },
	//broadcasts: { type: Types.Relationship, ref: 'Broadcast', many: true,  initial: true },
});

/**
 * Relationships
 */
 //TODO relationship messages
//Outlet.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Outlet.defaultSort = '-createdAt';
Outlet.defaultColumns = 'name, email, type';
Outlet.register();
