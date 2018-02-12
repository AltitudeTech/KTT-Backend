var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * LocalGovernment Model
 * ==========
 */
var LocalGovernment = new keystone.List('LocalGovernment', {
    //track: true
});

LocalGovernment.add({
  name: { type: String, initial: true, index: true, required: true },
  wards: { type: Types.Relationship, ref: 'Ward', many: true },
});

LocalGovernment.relationship({ ref: 'State', path: 'state', refPath: 'locals' });
/**
 * Registration
 */
LocalGovernment.defaultSort = 'name';
LocalGovernment.defaultColumns = 'name, locals';
LocalGovernment.register();
