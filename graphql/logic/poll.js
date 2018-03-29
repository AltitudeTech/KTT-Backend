const lastPoll = exports.lastPoll = (TC) => {
	return TC.get('$findMany').wrapResolve(next => async (rp) => {
		rp.args = {
			limit: 2,
			sort: 'STARTDATE_DESC',
			filter: {
				_operators: { startDate: { lte: new Date("2019-06-04").toISOString() } }
			}
		}
		return next(rp);
	});
}
