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
}
