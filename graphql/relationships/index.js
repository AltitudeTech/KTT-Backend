const stateRel = require('./state');
const pollRel = require('./poll');
const outletRel = require('./outlet');
// const galleryRel = require('./gallery');

const addRelationships = module.exports = () => {
  stateRel();
  pollRel();
  outletRel();
  // galleryRel();
};
