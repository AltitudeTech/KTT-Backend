var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PollingCenter Model
 * ==========
 */
var PollingCenter = new keystone.List('PollingCenter', {
    //track: true
});

PollingCenter.add({
  name: { type: String, required: true, index: true },
  address: { type: Types.Location, initial: true, index: true, required: true },
});

PollingCenter.relationship({ ref: 'Ward', path: 'Ward', refPath: 'pollingCenters' });
/**
 * Registration
 */
//PollingCenter.defaultSort = 'name';
PollingCenter.defaultColumns = 'address';
PollingCenter.register();
