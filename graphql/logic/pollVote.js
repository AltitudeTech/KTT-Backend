const keystone = require('keystone');

const createPollVote = exports.createPollVote = ( TC ) => {
	return TC.get('$createOne').wrapResolve(next => async (rp) => {
		const { record: { phoneNumber, vote , poll } } = rp.args;
		// console.log('00000000000000');
		// console.log(phoneNumber);
		// console.log(vote);
		// console.log(poll);
		// console.log('result');
		try {
			const result = await next(rp);
			return result;
		} catch(e){
			try {
				let pollVote = await keystone.list('PollVote').model.findOne({ phoneNumber, poll, isVerified: false }).exec();
				// console.log(pollVote);
				if (pollVote) {
					return {
						recordId: pollVote._id,
						record: pollVote
					};
				} else {
					return new Error('This phone number has already been used in this poll');
				}
			} catch (e) {
				return e;
			}
			return (e)
		}
	});
}
