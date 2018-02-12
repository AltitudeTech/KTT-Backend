/*	generates a schema based on the database models for GraphQL using graphql-compose
	NOT YET COMPLETE
*/
const GQC = require('graphql-compose').GQC;

const typeComposers = require('./composers/index');

const {
	EventTC,
	PollTC,
	PollVoteTC,
	NewsTC,
	PollingCenterTC,
	WardTC,
	LocalGovernmentTC,
	StateTC
} = typeComposers;

//Add fields and resolvers to rootQuery
GQC.rootQuery().addFields({
	eventById: EventTC.get('$findById'),
	eventByIds: EventTC.get('$findByIds'),
	eventOne: EventTC.get('$findOne'),
	eventMany: EventTC.get('$findMany'),
	eventTotal: EventTC.get('$count'),
	pollById: PollTC.get('$findById'),
	pollByIds: PollTC.get('$findByIds'),
	pollOne: PollTC.get('$findOne'),
	pollMany: PollTC.get('$findMany'),
	pollTotal: PollTC.get('$count'),
	pollVoteById: PollVoteTC.get('$findById'),
	pollVoteByIds: PollVoteTC.get('$findByIds'),
	pollVoteOne: PollVoteTC.get('$findOne'),
	pollVoteMany: PollVoteTC.get('$findMany'),
	pollVoteTotal: PollVoteTC.get('$count'),
	newsById: NewsTC.get('$findById'),
	newsByIds: NewsTC.get('$findByIds'),
	newsOne: NewsTC.get('$findOne'),
	newsMany: NewsTC.get('$findMany'),
	newsTotal: NewsTC.get('$count'),
	pollingCenterById: PollingCenterTC.get('$findById'),
	pollingCenterByIds: PollingCenterTC.get('$findByIds'),
	pollingCenterOne: PollingCenterTC.get('$findOne'),
	pollingCenterMany: PollingCenterTC.get('$findMany'),
	pollingCenterTotal: PollingCenterTC.get('$count'),
	wardById: WardTC.get('$findById'),
	wardByIds: WardTC.get('$findByIds'),
	wardOne: WardTC.get('$findOne'),
	wardMany: WardTC.get('$findMany'),
	wardTotal: WardTC.get('$count'),
	localGovernmentById: LocalGovernmentTC.get('$findById'),
	localGovernmentByIds: LocalGovernmentTC.get('$findByIds'),
	localGovernmentOne: LocalGovernmentTC.get('$findOne'),
	localGovernmentMany: LocalGovernmentTC.get('$findMany'),
	localGovernmentTotal: LocalGovernmentTC.get('$count'),
	stateById: StateTC.get('$findById'),
	stateByIds: StateTC.get('$findByIds'),
	stateOne: StateTC.get('$findOne'),
	stateMany: StateTC.get('$findMany'),
	stateTotal: StateTC.get('$count'),
	/*feedMany: FeedTC.get('$findMany'),
	feed: FeedTC.get('$recentFeed'),*/
});

/*GQC.rootMutation().addFields({
  //createCity: CityTC.get('$createOne'),
  //updateCity: CityTC.get('$updateById'),
	userCreate: UserTC.get('$createOne'),
  userUpdateById: UserTC.get('$updateById'),
  //userRemoveById: UserTC.get('$removeById'),
  //userRemoveOne: UserTC.get('$removeOne'),
  //userRemoveMany: UserTC.get('$removeMany'),
	gistCreate: GistTC.get('$createOne'),
  gistUpdateById: GistTC.get('$updateById'),
	gistRemoveById: GistTC.get('$removeById'),
  /*...adminAccess({
    removeCity: CityTC.get('$removeById'),
  }),
});*/

/*function adminAccess(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => (rp) => {
      // rp = resolveParams = { source, args, context, info }
      if (!rp.context.isAdmin) {
        throw new Error('You should be admin, to have access to this action.');
      }
      return next(rp);
    });
  });
  return resolvers;
}*/

const schema = GQC.buildSchema();

module.exports = schema;
