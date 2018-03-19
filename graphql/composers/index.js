const { composeWithMongoose } = require('graphql-compose-mongoose');
const keystone = require('keystone');
const { GQC } = require('graphql-compose');

const User = keystone.list('User').model;
const Event = keystone.list('Event').model;
const Poll = keystone.list('Poll').model;
const PollVote = keystone.list('PollVote').model;
const News = keystone.list('News').model;
const PollingCenter = keystone.list('PollingCenter').model;
const Ward = keystone.list('Ward').model;
const LocalGovernment = keystone.list('LocalGovernment').model;
const State = keystone.list('State').model;
const Outlet = keystone.list('Outlet').model;
const OutletType = keystone.list('OutletType').model;
const Candidate = keystone.list('Candidate').model;

const UserTCOptions = {
  fields:{
    remove: ['password','isAdmin']
  }
};

const UserTC = composeWithMongoose(User, UserTCOptions);
UserTC.addFields({jwt: 'String'})
const EventTC = composeWithMongoose(Event, {});
const PollTC = composeWithMongoose(Poll, {});
const PollVoteTC = composeWithMongoose(PollVote, {});
const NewsTC = composeWithMongoose(News, {});
const PollingCenterTC = composeWithMongoose(PollingCenter, {});
const WardTC = composeWithMongoose(Ward, {});
const LocalGovernmentTC = composeWithMongoose(LocalGovernment, {});
const StateTC = composeWithMongoose(State, {});
const OutletTC = composeWithMongoose(Outlet, {});
OutletTC.addFields({jwt: 'String'})
const OutletTypeTC = composeWithMongoose(OutletType, {});
const CandidateTC = composeWithMongoose(Candidate, {});
CandidateTC.addFields({jwt: 'String'})


OutletTC.addRelation('type', {
    resolver: () => OutletTypeTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.type,
    },
    projection: { type: true }, // point fields in source object, which should be fetched from DB
  }
);

PollTC.addRelation('votes', {
    resolver: () => PollVoteTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.votes,
    },
    projection: { votes: true }, // point fields in source object, which should be fetched from DB
  }
);

WardTC.addRelation('pollingCenters', {
    resolver: () => PollingCenterTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.pollingCenters,
    },
    projection: { pollingCenters: true }, // point fields in source object, which should be fetched from DB
  }
);

LocalGovernmentTC.addRelation('wards', {
    resolver: () => WardTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.wards,
    },
    projection: { wards: true }, // point fields in source object, which should be fetched from DB
  }
);

StateTC.addRelation('locals', {
    resolver: () => LocalGovernmentTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.locals,
    },
    projection: { locals: true }, // point fields in source object, which should be fetched from DB
  }
);

//Viewer Types for restricted data access
const ViewerTC = GQC.getOrCreateTC('Viewer');
ViewerTC.addResolver({
	kind: 'query',
  name: 'adminAccess',
  type: ViewerTC,
  resolve: ({ args, context , contextUser}) => {
		console.log('this user');
		//console.log(context.user);
    return { user: contextUser }
  },
})

const ViewerTCfields = {
	eventById: EventTC.get('$findById'),
	eventByIds: EventTC.get('$findByIds'),
	eventOne: EventTC.get('$findOne'),
	eventMany: EventTC.get('$findMany'),
	eventTotal: EventTC.get('$count'),
	user: UserTC.getType()
}
ViewerTC.addFields(ViewerTCfields);

const OutletViewerTC = GQC.getOrCreateTC('OutletViewer');
OutletViewerTC.addResolver({
	kind: 'query',
  name: 'outletAccess',
  type: OutletViewerTC,
  resolve: ({ args, context , contextOutlet}) => {
		console.log('this outlet');
		//console.log(context.user);
    return { outlet: contextOutlet }
  },
})

const OutletViewerTCFields = {
	outlet: OutletTC.getType()
	//add other exclusive to outlet fields here
}
OutletViewerTC.addFields(OutletViewerTCFields);

const ViewerCandidateTC = GQC.getOrCreateTC('ViewerCandidate');
ViewerCandidateTC.addResolver({
	kind: 'query',
  name: 'candidateAccess',
  type: ViewerCandidateTC,
  resolve: ({ args, context , contextCandidate}) => {
		console.log('this outlet');
		//console.log(context.user);
    return { candidate: contextCandidate }
  },
})

const ViewerCandidateTCFields = {
	candidate: CandidateTC.getType()
	//add other exclusive to outlet fields here
}
ViewerCandidateTC.addFields(ViewerCandidateTCFields);

module.exports = {
  UserTC, EventTC, PollTC, PollVoteTC, NewsTC,
  PollingCenterTC, WardTC, LocalGovernmentTC, StateTC,
  OutletTC, CandidateTC,
  ViewerTC, OutletViewerTC, ViewerCandidateTC
};
