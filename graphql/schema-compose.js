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
	OutletViewerTC,
	GalleryTC,
	KttvVideoTC,
	MessageTC
} = require('./composers/index');
const addRelationships = require('./relationships');
const addResolvers = require('./resolvers');
const addViewers = require('./viewers');

//Get logic middleware
const { authAccess, updateSelf, createSelfRelationship, updateSelfRelationship } = require('./logic/common');
const { nextEvent } = require('./logic/event');
const { lastPolls } = require('./logic/poll');
const { createPollVote } = require('./logic/pollVote');

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
	// eventById: EventTC.get('$findById'),
	// eventOne: EventTC.get('$findOne'),
	lastPolls: lastPolls(PollTC),
	nextEvent: nextEvent(EventTC),
	outletMany: OutletTC.get('$findMany'),
	// pollById: PollTC.get('$findById'),
	// pollOne: PollTC.get('$findOne'),
	// pollMany: PollTC.get('$findMany'),
	// pollVoteByIds: PollVoteTC.get('$findByIds'),
	// pollVoteTotal: PollVoteTC.get('$count'),
	KttvPagination: KttvVideoTC.get('$pagination'),
	newsById: NewsTC.get('$findById'),
	newsMany: NewsTC.get('$findMany'),
	newsTotal: NewsTC.get('$count'),
	localGovernmentMany: LocalGovernmentTC.get('$findMany'),
	stateMany: StateTC.get('$findMany'),
	galleryOne: GalleryTC.get('$findOne'),
	// galleryMany: GalleryTC.get('$findMany'),
	// KttvVideoMany: KttvVideoTC.get('$findMany'),
	// KttvPagination: KttvVideoTC.get('$pagination'),
});

GQC.rootMutation().addFields({
	login: OutletTC.get('$loginWithEmail'),
	// pollVoteCreate: PollVoteTC.get('$createOne'),
	messageCreate: MessageTC.get('$createOne'),
	pollVoteVerify: PollVoteTC.get('$updateById'),
	pollVoteCreate: createPollVote(PollVoteTC),
});

const schema = GQC.buildSchema();
module.exports = schema;

/*var fs = require('fs');
fs.writeFile("./graphql/schema.txt", JSON.stringify(schema, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("\nThe schema was saved to schema.json!");
});*/
