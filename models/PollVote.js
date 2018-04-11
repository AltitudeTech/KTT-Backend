var keystone = require('keystone');
var Types = keystone.Field.Types;

const { PHONE_REGEX } = require('../lib/common');

/**
 * PollVote Model
 * ==================
 */

var PollVote = new keystone.List('PollVote', {
	track: true,
	noedit: true,
});

voteOptions = [
	{ value: "a", label: '1' },
	{ value: "b", label: '2' },
	{ value: "c", label: '3' },
	{ value: "d", label: '4' },
]

PollVote.add({
	phoneNumber: {type: Types.Text, initial: true, index: true, required: true },
	vote: {type: Types.Select, options: voteOptions, index: true, required: true, initial: true},
	isVerified: {type: Boolean, default: false, initial: true, index: true},
	poll: { type: Types.Relationship, ref: 'Poll', many: false, required: true, initial: true },
});

PollVote.schema.pre('save', async function(next) {
	if (PHONE_REGEX.test(this.phoneNumber)){
		try {
			let poll = await keystone.list('Poll').model.findOne({ _id: this.poll }).exec();
			if (!poll) {
				next(new Error('This poll does not exist'))
			}
			//Checks to make sure answer is not an option
			if (this.vote === "c" && !poll.option3.text )
			next(new Error('This specified option C is not available on this poll'))
			if (this.vote === "d" && !poll.option4.text )
			next(new Error('This specified option D is not available on this poll'))

			let pollVote = await keystone.list('PollVote').model.findOne({ phoneNumber: this.phoneNumber, poll: this.poll }).exec();
			if (!pollVote) {
					next();
			} else {
				if (this.isNew) {
					next(new Error('This phone number has already been used in this poll'))
				}
				if (pollVote.isVerified === true)
					next(new Error('This phone number has already been used in this poll'))
				next();
			}
		} catch (e) {
			next(new Error(e))
		}
  } else {
		next(new Error('Invalid Phone Number'));
	}
})

PollVote.schema.post('save', async function() {
	try {
		let poll = await keystone.list('Poll').model.findOne({ _id: this.poll}).exec();
		poll.save();
	} catch (e) {
		throw new Error(e);
	}
});

PollVote.schema.post('remove', async function() {
	try {
		let poll = await keystone.list('Poll').model.findOne({ _id: this.poll}).exec();
		poll.save();
	} catch (e) {
		throw new Error(e);
	}
});

// PollVote.relationship({ ref: 'Poll', path: 'polls', refPath: 'votes' });

PollVote.defaultColumns = 'phoneNumber, vote, poll, isVerified';

PollVote.register();
