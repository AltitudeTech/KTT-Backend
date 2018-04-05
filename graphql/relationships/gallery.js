const { GalleryTC, GalleryImageTC } = require('../composers');

module.exports = () => {
  GalleryTC.addRelation('images', {
      resolver: () => GalleryImageTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.images,
      },
      projection: { images: true }, // point fields in source object, which should be fetched from DB
    }
  );
}
