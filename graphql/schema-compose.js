/*	generates a schema based on the database models for GraphQL using graphql-compose
	NOT YET COMPLETE
*/
const keystone = require('keystone');
const { GQC } = require('graphql-compose');
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
	StateTC,
	OutletTC,
	CandidateTC,
	ViewerTC,
	OutletViewerTC,
	ViewerCandidateTC
} = typeComposers;

//Add fields and resolvers to rootQuery
GQC.rootQuery().addFields({
	...adminAccess({
		viewer: ViewerTC.get('$adminAccess'),
	}),
	...outletAccess({
		outletViewer: OutletViewerTC.get('$outletAccess')
	}),
	...candidateAccess({
		ViewerCandidate: ViewerCandidateTC.get('$candidateAccess')
	})
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

const User = keystone.list('User').model;
const Outlet = keystone.list('Outlet').model;
GQC.rootMutation().addFields({
	//userCreate: UserTC.get('$createOne'),
	/*login: {
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
	},*/
	login: {
		type: OutletTC.getType(),
    description: 'login an outlet',
		args: {username: 'String', password: 'String'},
    resolve: (_,  args, context ) => {
			console.log('outlet login this ----');
			const { username, password } = args;
			//console.log(context);
			return Outlet.findOne({username}).then((outlet) => {
        if (outlet) {
          // validate password
					//return user;
          return bcrypt.compare(password, outlet.password).then((res) => {
            if (res) {
              // create jwt
              const token = jwt.sign({
                id: outlet.id,
                email: outlet.email,
              }, process.env.JWT_SECRET);
              outlet.jwt = token;
              context.outlet = Promise.resolve(outlet);
              return outlet;
            }
            return Promise.reject('password incorrect');
          });
        }
        return Promise.reject('username not found');
      });
		},
	},
	loginCandidate: {
		type: CandidateTC.getType(),
    description: 'login a candidate',
		args: {phone: 'String', password: 'String'},
    resolve: (_,  args, context ) => {
			console.log('candidate login this ----');
			const { phone, password } = args;
			//console.log(context);
			return Outlet.findOne({phone}).then((candidate) => {
        if (candidate) {
          // validate password
					//return user;
          return bcrypt.compare(password, candidate.password).then((res) => {
            if (res) {
              // create jwt
              const token = jwt.sign({
                id: candidate.id,
                email: candidate.email,
								phone: candidate.phone,
								passwordVersion: candidate.passwordVersion,
              }, process.env.JWT_SECRET);
              candidate.jwt = token;
              context.candidate = Promise.resolve(candidate);
              return candidate;
            }
            return Promise.reject('password incorrect');
          });
        }
        return Promise.reject('phone not found');
      });
		},
	},
  // userUpdateById: UserTC.get('$updateById'),
  //userRemoveById: UserTC.get('$removeById'),
  //userRemoveOne: UserTC.get('$removeOne'),
  //userRemoveMany: UserTC.get('$removeMany'),
});

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

function outletAccess(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => async (rp) => {
      //const { source, args, context, info } = resolveParams = rp
			try {
				const outlet = await rp.context.outlet;
				if (!outlet){
					console.log('Unauthorized request');
					return new Error('You must be signed in, to have access to this action.');
				}
				//console.log('authorized');
				//add signed-In outlet to the resolver parameters
				rp.contextOutlet = outlet || null;
	      return next(rp);
			} catch (e) {
				return e;
			}
    });
  });
  return resolvers;
}

function candidateAccess(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => async (rp) => {
      //const { source, args, context, info } = resolveParams = rp
			try {
				const candidate = await rp.context.candidate;
				if (!candidate){
					console.log('Unauthorized request');
					return new Error('You must be signed in as a candidate, to have access to this action.');
				}
				//console.log('authorized');
				//add signed-In candidate to the resolver parameters
				rp.contextCandidate = candidate || null;
	      return next(rp);
			} catch (e) {
				return e;
			}
    });
  });
  return resolvers;
}

const schema = GQC.buildSchema();

module.exports = schema;
