var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */
var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
});
Gallery.schema.set('usePushEach', true);

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	images: { type: Types.Relationship, ref: 'GalleryImage', many: true },
	/*heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages },*/
});

Gallery.register();
