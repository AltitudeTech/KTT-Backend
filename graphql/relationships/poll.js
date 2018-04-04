const { PollTC, PollVoteTC } = require('../composers');

module.exports = () => {
  PollTC.addRelation('votes', {
      resolver: () => PollVoteTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.votes,
      },
      projection: { votes: true }, // point fields in source object, which should be fetched from DB
    }
  );
  PollTC.addRelation('aVotes', {
      resolver: () => PollVoteTC.getResolver('count'),
      prepareArgs: {
        filter: (source) => ({vote: 'a', poll: source._id}),
      },
      projection: { votes: true }, // point fields in source object, which should be fetched from DB
    }
  );
  PollTC.addRelation('bVotes', {
      resolver: () => PollVoteTC.getResolver('count'),
      prepareArgs: {
        filter: (source) => ({vote: 'b', poll: source._id}),
      },
      projection: { votes: true }, // point fields in source object, which should be fetched from DB
    }
  );
  PollTC.addRelation('cVotes', {
      resolver: () => PollVoteTC.getResolver('count'),
      prepareArgs: {
        filter: (source) => ({vote: 'c', poll: source._id}),
      },
      projection: { votes: true }, // point fields in source object, which should be fetched from DB
    }
  );
  PollTC.addRelation('dVotes', {
      resolver: () => PollVoteTC.getResolver('count'),
      prepareArgs: {
        filter: (source) => ({vote: 'd', poll: source._id}),
      },
      projection: { votes: true }, // point fields in source object, which should be fetched from DB
    }
  );
}
