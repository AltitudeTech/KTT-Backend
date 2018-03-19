const { composeWithMongoose } = require('graphql-compose-mongoose');
const keystone = require('keystone');
const { GQC } = require('graphql-compose');

/**
* Mongoose Models
*/
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

/**
* Config
*/
const UserTCOptions = {
  fields:{
    remove: ['password','isAdmin']
  }
};

const UserTC = exports.UserTC = composeWithMongoose(User, UserTCOptions);
const EventTC = exports.EventTC = composeWithMongoose(Event, {});
const PollTC = exports.PollTC = composeWithMongoose(Poll, {});
const PollVoteTC = exports.PollVoteTC = composeWithMongoose(PollVote, {});
const NewsTC = exports.NewsTC = composeWithMongoose(News, {});
const PollingCenterTC = exports.PollingCenterTC = composeWithMongoose(PollingCenter, {});
const WardTC = exports.WardTC = composeWithMongoose(Ward, {});
const LocalGovernmentTC = exports.LocalGovernmentTC = composeWithMongoose(LocalGovernment, {});
const StateTC = exports.StateTC = composeWithMongoose(State, {});
const OutletTC = exports.OutletTC = composeWithMongoose(Outlet, UserTCOptions);
const OutletTypeTC = exports.OutletTypeTC = composeWithMongoose(OutletType, {});

/**
* Add JWT to user models for login
*/
UserTC.addFields({jwt: 'String'})
OutletTC.addFields({jwt: 'String'})

//Viewer Types for restricted data access
const ViewerTC = exports.ViewerTC = GQC.getOrCreateTC('Viewer');
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

const OutletViewerTC = exports.OutletViewerTC = GQC.getOrCreateTC('OutletViewer');
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
