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
const { nextEvent } = require('./logic/event');

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
    resolve: () => (new Date().toISOString()),
  },
	eventById: EventTC.get('$findById'),
	eventOne: EventTC.get('$findOne'),
	nextEvent: nextEvent(EventTC),
	outletMany: OutletTC.get('$findMany'),
	pollById: PollTC.get('$findById'),
	pollOne: PollTC.get('$findOne'),
	pollVoteByIds: PollVoteTC.get('$findByIds'),
	pollVoteTotal: PollVoteTC.get('$count'),
	newsById: NewsTC.get('$findById'),
	newsMany: NewsTC.get('$findMany'),
	newsTotal: NewsTC.get('$count'),
	localGovernmentMany: LocalGovernmentTC.get('$findMany'),
	stateMany: StateTC.get('$findMany'),
});

GQC.rootMutation().addFields({
	login: OutletTC.get('$loginWithEmail')
});

const schema = GQC.buildSchema();
module.exports = schema;
