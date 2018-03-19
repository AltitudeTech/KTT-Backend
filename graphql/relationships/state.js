const {StateTC, LocalGovernmentTC, WardTC, PollingCenterTC} = require('../composers');

module.exports = () => {
	StateTC.addRelation('locals', {
		resolver: () => LocalGovernmentTC.getResolver('findByIds'),
		prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
			_ids: (source) => source.locals
		},
		projection: {
			locals: true
		}, // point fields in source object, which should be fetched from DB
	});

	LocalGovernmentTC.addRelation('wards', {
		resolver: () => WardTC.getResolver('findByIds'),
		prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
			_ids: (source) => source.wards
		},
		projection: {
			wards: true
		}, // point fields in source object, which should be fetched from DB
	});

	WardTC.addRelation('pollingCenters', {
		resolver: () => PollingCenterTC.getResolver('findByIds'),
		prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
			_ids: (source) => source.pollingCenters
		},
		projection: {
			pollingCenters: true
		}, // point fields in source object, which should be fetched from DB
	});

}
