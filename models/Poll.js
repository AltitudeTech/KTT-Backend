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
  title: { type: String, noedit: true },
  tagLine: { type: Types.Text, required: true, index: true, initial: true, required: true },
  //state: { type: Types.Select, options: 'scheduled, active, archived', default: 'scheduled', index: true },
  startDate: { type: Types.Date, index: true, initial: true, required: true },
  //endDate: { type: Types.Datetime, index: true, initial: true, required: true },
  // votes: { type: Types.Relationship, ref: 'PollVote', many: true, unique: true, hidden: true },
  option1: {
    text: {type: Types.Text, initial: true, index: true, required: true },
    votes: { type: Number, index: true, noedit: true }
  },
  option2: {
    text: {type: Types.Text, initial: true, index: true, required: true },
    votes: { type: Number, index: true, noedit: true }
  },
  option3: {
    text: {type: Types.Text, initial: true, index: true },
    votes: { type: Number, index: true, noedit: true }
  },
  option4: {
    text: {type: Types.Text, initial: true, index: true },
    votes: { type: Number, index: true, noedit: true }
  },
  //image: { type: Types.CloudinaryImage },
  totalVotes: {type: Number, index: true, noedit: true}
});

Poll.schema.pre('save', async function (next) {
  this.title = this.name;
  this.option1.votes = await keystone.list('PollVote').model.count({vote: 'a', poll: this._id, isVerified: true}).exec();
  this.option2.votes = await keystone.list('PollVote').model.count({vote: 'b', poll: this._id, isVerified: true}).exec();
  this.option3.votes = await keystone.list('PollVote').model.count({vote: 'c', poll: this._id, isVerified: true}).exec();
  this.option4.votes = await keystone.list('PollVote').model.count({vote: 'd', poll: this._id, isVerified: true}).exec();
  this.totalVotes = this.option1.votes + this.option2.votes + this.option3.votes + this.option4.votes;
  next();
})

Poll.relationship({ ref: 'PollVote', path: 'pollVotes', refPath: 'poll' });

/**
 * Registration
 */
Poll.defaultSort = '-startDate';
Poll.defaultColumns = 'name, startDate, state, totalVotes';
Poll.register();
