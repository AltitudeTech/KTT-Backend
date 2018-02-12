/*	generates a schema based on the database models for GraphQL using graphql-compose
	NOT YET COMPLETE
*/
const GQC = require('graphql-compose').GQC;

const typeComposers = require('./composers/eventTC');

//console.log(typeComposers);

var {
	EventTC,
	PollTC,
	PollVoteTC,
	NewsTC,
	PollingCenterTC,
	WardTC,
	LocalGovernmentTC,
	StateTC
} = typeComposers;

console.log(PollVoteTC);
console.log(EventTC);
//console.log(PollTC.get('$findById'));
//Add fields and resolvers to rootQuery
GQC.rootQuery().addFields({
	eventById: EventTC.get('$findById'),
	eventByIds: EventTC.get('$findByIds'),
	eventOne: EventTC.get('$findOne'),
	eventMany: EventTC.get('$findMany'),
	eventTotal: EventTC.get('$count'),
	pollById: PollTC.get('$findById'),
	/*pollByIds: PollTC.get('$findByIds'),
	pollOne: PollTC.get('$findOne'),
	pollMany: PollTC.get('$findMany'),
	pollTotal: PollTC.get('$count'),
	pollVoteById: PollVoteTC.get('$findById'),
	pollVoteByIds: PollVoteTC.get('$findByIds'),
	pollVoteOne: PollVoteTC.get('$findOne'),
	pollVoteMany: PollVoteTC.get('$findMany'),
	pollVoteTotal: PollVoteTC.get('$count')*/
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
//console.log(schema);

module.exports = schema;
