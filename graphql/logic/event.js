const nextEvent = exports.nextEvent = ( TC ) => {
	return TC.get('$findOne').wrapResolve(next => async (rp) => {
		rp.args = {
			sort: 'DATE_ASC',
			filter: {
				_operators: {
					date: {gte: new Date().toISOString()}
				}
			}
		}
		return next(rp);
	});
}
