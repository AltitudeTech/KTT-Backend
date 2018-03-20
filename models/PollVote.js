var keystone = require('keystone');
var Types = keystone.Field.Types;

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
	poll: { type: Types.Relationship, ref: 'Poll', many: false },
});

PollVote.relationship({ ref: 'Poll', path: 'polls', refPath: 'votes' });

PollVote.register();
