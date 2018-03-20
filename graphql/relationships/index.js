const stateRel = require('./state');
const pollRel = require('./poll');
const outletRel = require('./outlet');

const addRelationships = module.exports = () => {
  stateRel();
  pollRel();
  outletRel();
};
