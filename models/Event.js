const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Event Model
 * ==========
 */
const Event = new keystone.List('Event', {
    track: true
});

Event.add({
  title: { type: String, required: true, index: true, initial: true },
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
