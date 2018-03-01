const composeWithMongoose = require('graphql-compose-mongoose').composeWithMongoose;
const keystone = require('keystone');

const User = keystone.list('User').model;
const Event = keystone.list('Event').model;
const Poll = keystone.list('Poll').model;
const PollVote = keystone.list('PollVote').model;
const News = keystone.list('News').model;
const PollingCenter = keystone.list('PollingCenter').model;
const Ward = keystone.list('Ward').model;
const LocalGovernment = keystone.list('LocalGovernment').model;
const State = keystone.list('State').model;

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

module.exports = {
  UserTC, EventTC, PollTC, PollVoteTC, NewsTC,
  PollingCenterTC, WardTC, LocalGovernmentTC, StateTC
};
