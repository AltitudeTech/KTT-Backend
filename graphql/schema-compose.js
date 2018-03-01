/*	generates a schema based on the database models for GraphQL using graphql-compose
	NOT YET COMPLETE
*/
const keystone = require('keystone');
const GQC = require('graphql-compose').GQC;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const typeComposers = require('./composers/index');

const {
	UserTC,
	EventTC,
	PollTC,
	PollVoteTC,
	NewsTC,
	PollingCenterTC,
	WardTC,
	LocalGovernmentTC,
	StateTC
} = typeComposers;

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
UserTC.addResolver({
  kind: 'query',
  name: 'getContextUser',
	args: {
    id: 'String!',
  },
  type: UserTC,
  resolve: async (rp) => {
		//console.log(rp);
		//console.log(context.user);
		return {};
  },
});

//Add fields and resolvers to rootQuery
GQC.rootQuery().addFields({
	...adminAccess({
		viewer: ViewerTC.get('$adminAccess'),
	}),
	/*eventById: EventTC.get('$findById'),
	eventByIds: EventTC.get('$findByIds'),
	eventOne: EventTC.get('$findOne'),
	eventMany: EventTC.get('$findMany'),
	eventTotal: EventTC.get('$count'),*/
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

const fields = {
	eventById: EventTC.get('$findById'),
	eventByIds: EventTC.get('$findByIds'),
	eventOne: EventTC.get('$findOne'),
	eventMany: EventTC.get('$findMany'),
	eventTotal: EventTC.get('$count'),
	user: UserTC.getType()
}
ViewerTC.addFields(fields);

const User = keystone.list('User').model;
GQC.rootMutation().addFields({
  //createCity: CityTC.get('$createOne'),
  //updateCity: CityTC.get('$updateById'),
	userCreate: UserTC.get('$createOne'),
	login: {
		type: UserTC.getType(),
    description: 'login a user',
		args: {email: 'String', password: 'String'},
    resolve: (_,  args, context ) => {
			console.log('login this ----');
			const { email, password} = args;
			//console.log(context);
			return User.findOne({email}).then((user) => {
        if (user) {
          // validate password
					//return user;
          return bcrypt.compare(password, user.password).then((res) => {
            if (res) {
              // create jwt
							console.log('res');
              const token = jwt.sign({
                id: user.id,
                email: user.email,
								version: user.version,
              }, process.env.JWT_SECRET);
              user.jwt = token;
              context.user = Promise.resolve(user);
              return user;
            }
            return Promise.reject('password incorrect');
          });
        }
        return Promise.reject('email not found');
      });
		},
	},
  userUpdateById: UserTC.get('$updateById'),
  //userRemoveById: UserTC.get('$removeById'),
  //userRemoveOne: UserTC.get('$removeOne'),
  //userRemoveMany: UserTC.get('$removeMany'),
	/*gistCreate: GistTC.get('$createOne'),
  gistUpdateById: GistTC.get('$updateById'),
	gistRemoveById: GistTC.get('$removeById'),*/
  /*...adminAccess({
    removeCity: CityTC.get('$removeById'),
  }),*/
});

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

function adminAccess(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => async (rp) => {
      //const { source, args, context, info } = resolveParams = rp
			try {
				const user = await rp.context.user;
				if (!user){
					console.log('Unauthorized request');
					return new Error('You must be signed in, to have access to this action.');
				}
				//console.log('authorized');
				//add signed-In user to the resolver parameters
				rp.contextUser = user || null;
	      return next(rp);
			} catch (e) {
				return e;
			}
    });
  });
  return resolvers;
}

function getAuthenticatedUser(ctx) {
  return ctx.user.then((user) => {
    if (!user) {
			console.log('Unauthorized');
      return Promise.reject('Unauthorized');
    }
		console.log('authorized');
    return user;
  });
}

const schema = GQC.buildSchema();

module.exports = schema;
