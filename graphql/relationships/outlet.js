const { OutletTC, OutletTypeTC } = require('../composers');

module.exports = () => {
  OutletTC.addRelation('type', {
      resolver: () => OutletTypeTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.type,
      },
      projection: { type: true }, // point fields in source object, which should be fetched from DB
    }
  );
}
