const nextEvent = exports.nextEvent = ( TC ) => {
	return TC.get('$findOne').wrapResolve(next => async (rp) => {
		rp.args = {
			sort: 'DATE_ASC',
			filter: {
				_operators: {
					date: {gte: new Date().toISOString()}
					// date: {gte: '2020-03-19T14:00:35.316Z'}
				}
			}
		}
		return next(rp);
	});
}
