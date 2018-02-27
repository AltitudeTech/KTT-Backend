var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * OutletType Model
 * ==========
 */
var OutletType = new keystone.List('OutletType');

OutletType.add({
	name: { type: String, required: true, index: true },
});

/**
 * Relationships
 */
//OutletType.relationship({ ref: 'Outlet', path: 'type', refPath: 'type' });


/**
 * Registration
 */
OutletType.defaultColumns = 'name';
OutletType.register();
