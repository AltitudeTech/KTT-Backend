var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Banner Model
 * =============
 */

var Banner = new keystone.List('Banner', {
	autokey: { from: 'name', path: 'key', unique: true },
	track: true
});

Banner.add({
	name: { type: String, required: true, index: true },
	publishedDate: { type: Date, default: Date.now },
	imageUrl: { type: Types.Text, initial: true },
	HausaImageUrl: { type: Types.Text, initial: true },
	YourubeImageUrl: { type: Types.Text, initial: true },
	igboImageUrl: { type: Types.Text, initial: true },
	description: { type: Types.Text, initial: true },
	/*image: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages },*/
});

Banner.register();
