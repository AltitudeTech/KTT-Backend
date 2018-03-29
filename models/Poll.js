var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Poll Model
 * ==========
 */
var Poll = new keystone.List('Poll', {
    track: true
});
Poll.schema.set('usePushEach', true);

Poll.add({
  name: { type: String, required: true, index: true },
  title: { type: String },
  tagLine: { type: Types.Text, required: true, index: true, initial: true, required: true },
  //state: { type: Types.Select, options: 'scheduled, active, archived', default: 'scheduled', index: true },
  startDate: { type: Types.Datetime, index: true, initial: true, required: true },
  //endDate: { type: Types.Datetime, index: true, initial: true, required: true },
  votes: { type: Types.Relationship, ref: 'PollVote', many: true },
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
  totalVotes: {type: Number, index: true}
});

Poll.schema.pre('save', function (next) {
  this.totalVotes = this.votes.length;
  this.title = this.name;
  next();
})

Poll.relationship({ ref: 'PollVote', path: 'pollVotes', refPath: 'poll' });

/**
 * Registration
 */
Poll.defaultSort = '-startDate';
Poll.defaultColumns = 'name, startDate, state, totalVotes';
Poll.register();
