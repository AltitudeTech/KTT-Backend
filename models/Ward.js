var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Ward Model
 * ==========
 */
var Ward = new keystone.List('Ward', {
    //track: true
});

Ward.add({
  name: { type: String, initial: true, index: true, required: true },
  pollingCenters: { type: Types.Relationship, ref: 'PollingCenter', many: true },
});

Ward.relationship({ ref: 'LocalGovernment', path: 'wards', refPath: 'ward' });
/**
 * Registration
 */
Ward.defaultSort = 'name';
Ward.defaultColumns = 'name, pollingCenters';
Ward.register();
