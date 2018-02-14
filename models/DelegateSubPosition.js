const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * DelegateSubPosition Model
 * ==========
 */
const DelegateSubPosition = new keystone.List('DelegateSubPosition');

DelegateSubPosition.add({
	name: { type: Types.Text, required: true, index: true },
});

/**
 * Relationships
 */
DelegateSubPosition.relationship({ ref: 'Delegate', path: 'delegates', refPath: 'subPosition' });


/**
 * Registration
 */
DelegateSubPosition.defaultColumns = 'name';
DelegateSubPosition.register();
