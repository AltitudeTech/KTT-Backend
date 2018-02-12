var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * State Model
 * ==========
 */
var State = new keystone.List('State', {
    //track: true
});

State.add({
  name: { type: String, initial: true, index: true, required: true },
  locals: { type: Types.Relationship, ref: 'LocalGovernment', many: true },
});


/**
 * Registration
 */
State.defaultSort = 'name';
State.defaultColumns = 'name, locals';
State.register();
