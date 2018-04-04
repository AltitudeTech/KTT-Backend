const lastPolls = exports.lastPolls = (TC) => {
	return TC.get('$findMany').wrapResolve(next => async (rp) => {
		rp.args = {
			limit: 2,
			sort: { startDate: -1 },
			filter: {
				_operators: { startDate: { lte: new Date().toISOString() } }
			}
		}
		return next(rp);
	});
}
