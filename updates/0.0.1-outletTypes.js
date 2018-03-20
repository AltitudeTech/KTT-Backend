/**
 * This script automatically creates The default Outlet Types when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	OutletType: [
		{ 'name': 'TV Station' },
		{ 'name': 'Newspaper' },
		{ 'name': 'Radio Station' },
		{ 'name': 'Blog' },
		{ 'name': 'Other' },
	],
};
