const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * DelegatePosition Model
 * ==========
 */
const DelegatePosition = new keystone.List('DelegatePosition');

DelegatePosition.add({
	name: { type: Types.Text, required: true, index: true },
});

/**
 * Relationships
 */
DelegatePosition.relationship({ ref: 'Delegate', path: 'delegates', refPath: 'position' });


/**
 * Registration
 */
DelegatePosition.defaultColumns = 'name';
DelegatePosition.register();
