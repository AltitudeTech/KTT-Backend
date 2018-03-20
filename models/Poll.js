var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Poll Model
 * ==========
 */
var Poll = new keystone.List('Poll', {
    track: true
});

Poll.add({
  title: { type: String, required: true, index: true, initial: true },
  votes: { type: Types.Relationship, ref: 'PollVote', many: true },
  //state: { type: Types.Select, options: 'scheduled, active, archived', default: 'scheduled', index: true },
  startDate: { type: Types.Datetime, index: true, initial: true},
  endDate: { type: Types.Datetime, index: true, initial: true},
  option1: {
    text: {type: Types.Text, initial: true, index: true, required: true },
    votes: {type: Number, index: true}
  },
  option2: {
    text: {type: Types.Text, initial: true, index: true, required: true },
    votes: {type: Number, index: true}
  },
  option3: {
    text: {type: Types.Text, initial: true, index: true },
    votes: {type: Number, index: true}
  },
  option4: {
    text: {type: Types.Text, initial: true, index: true },
    votes: {type: Number, index: true}
  },
  //image: { type: Types.CloudinaryImage },
  isActive: {type: Boolean, default: false, index: true},
  totalVotes: {type: Number, index: true}
});


/**
 * Registration
 */
Poll.defaultSort = '-startDate';
Poll.defaultColumns = 'startDate, title, state, totalVotes';
Poll.register();
