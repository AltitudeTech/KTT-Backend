const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Delegate Model
 * ==========
 */
const Delegate = new keystone.List('Delegate', {
    track: true
});

Delegate.add({
	name: { type: Types.Text, required: true, index: true },
	//email: { type: Types.Email, initial: true, index: true },
	//phone: { type: Types.Text, initial: true, unique: true, index: true },
	password: { type: Types.Password, index: true },
	position: { type: Types.Relationship, ref: 'DelegatePosition', many: false,  initial: true },
	subPosition: { type: Types.Relationship, ref: 'DelegateSubPosition', many: false,  initial: true },
	localGovernment: { type: Types.Relationship, ref: 'LocalGovernment', many: true,  initial: true },
	locals: { type: Types.Text, initial: true, index: true},
	state: { type: Types.Relationship, ref: 'State', many: false,  initial: true },
	//candidates: {}
});

/**
 * Relationships
 */
//Delegate.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Delegate.defaultSort = '-createdAt';
Delegate.defaultColumns = 'name, state, position, localGovernment, email, phone';
Delegate.register();
