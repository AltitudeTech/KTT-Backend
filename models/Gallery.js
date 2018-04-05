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
	// heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages },
});

// Gallery.relationship({ ref: 'GalleryImage', path: 'Gallery Images', refPath: 'galleryId' });

/**
 * Registration
 */
Gallery.defaultSort = 'name';
Gallery.defaultColumns = 'name, publishedDate';
Gallery.register();
