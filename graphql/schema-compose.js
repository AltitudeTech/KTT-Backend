/*	generates a schema based on the database models for GraphQL using graphql-compose
	NOT YET COMPLETE
*/
const keystone = require('keystone');
const { GQC } = require('graphql-compose');

const {
	UserTC,
	EventTC,
	PollTC,
	PollVoteTC,
	NewsTC,
	PollingCenterTC,
	WardTC,
	LocalGovernmentTC,
	StateTC,
	OutletTC,
	CandidateTC,
	ViewerTC,
	OutletViewerTC
} = require('./composers/index');
const addRelationships = require('./relationships');
const addResolvers = require('./resolvers');
const addViewers = require('./viewers');

//Get logic middleware
const { authAccess, updateSelf, createSelfRelationship, updateSelfRelationship } = require('./logic/common');

//Add relationships and resolvers to schema
addViewers();
addRelationships();
addResolvers();

//Add fields and resolvers to rootQuery
GQC.rootQuery().addFields({
	...authAccess('Outlet', {
		outletViewer: OutletViewerTC.get('$outletAccess')
	}),
	currentTime: {
    type: 'Date',
    resolve: () => (new Date(Date.now())).toISOString(),
  },
	/*eventById: EventTC.get('$findById'),
	eventByIds: EventTC.get('$findByIds'),
	eventOne: EventTC.get('$findOne'),
	eventMany: EventTC.get('$findMany'),
	eventTotal: EventTC.get('$count'),*/
	// outletMany: OutletTC.get('$findMany'),
	// pollMany: PollTC.get('$findMany'),
	// pollById: PollTC.get('$findById'),
	// pollByIds: PollTC.get('$findByIds'),
	// pollOne: PollTC.get('$findOne'),
	// pollMany: PollTC.get('$findMany'),
	// pollTotal: PollTC.get('$count'),
	// pollVoteById: PollVoteTC.get('$findById'),
	// pollVoteByIds: PollVoteTC.get('$findByIds'),
	// pollVoteOne: PollVoteTC.get('$findOne'),
	// pollVoteMany: PollVoteTC.get('$findMany'),
	// pollVoteTotal: PollVoteTC.get('$count'),
	// newsById: NewsTC.get('$findById'),
	// newsByIds: NewsTC.get('$findByIds'),
	// newsOne: NewsTC.get('$findOne'),
	// newsMany: NewsTC.get('$findMany'),
	// newsTotal: NewsTC.get('$count'),
	// pollingCenterById: PollingCenterTC.get('$findById'),
	// pollingCenterByIds: PollingCenterTC.get('$findByIds'),
	// pollingCenterOne: PollingCenterTC.get('$findOne'),
	// pollingCenterMany: PollingCenterTC.get('$findMany'),
	// pollingCenterTotal: PollingCenterTC.get('$count'),
	// wardById: WardTC.get('$findById'),
	// wardByIds: WardTC.get('$findByIds'),
	// wardOne: WardTC.get('$findOne'),
	// wardMany: WardTC.get('$findMany'),
	// wardTotal: WardTC.get('$count'),
	// localGovernmentById: LocalGovernmentTC.get('$findById'),
	// localGovernmentByIds: LocalGovernmentTC.get('$findByIds'),
	// localGovernmentOne: LocalGovernmentTC.get('$findOne'),
	// localGovernmentMany: LocalGovernmentTC.get('$findMany'),
	// localGovernmentTotal: LocalGovernmentTC.get('$count'),
	// stateById: StateTC.get('$findById'),
	// stateByIds: StateTC.get('$findByIds'),
	// stateOne: StateTC.get('$findOne'),
	// stateMany: StateTC.get('$findMany'),
	// stateTotal: StateTC.get('$count'),
});

GQC.rootMutation().addFields({
	login: OutletTC.get('$loginWithEmail')
  // userUpdateById: UserTC.get('$updateById'),
  //userRemoveById: UserTC.get('$removeById'),
  //userRemoveOne: UserTC.get('$removeOne'),
  //userRemoveMany: UserTC.get('$removeMany'),
});

const schema = GQC.buildSchema();
module.exports = schema;
