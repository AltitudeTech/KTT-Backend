var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Event Model
 * ==========
 */
var Event = new keystone.List('Event', {
    track: true
});

Event.add({
  title: { type: String, initial: true, index: true, required: true },
  date: { type: Types.Datetime, initial: true, index: true},
  description: {type: Types.Text, initial: true, index: true},
  isActive: {type: Boolean, default: false, initial: true, index: true},
});


/**
 * Registration
 */
Event.defaultSort = '-date';
Event.defaultColumns = 'date, title, isActive, description';
Event.register();
