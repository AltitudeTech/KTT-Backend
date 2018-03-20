var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Video Model
 * =============
 */

var Video = new keystone.List('Video', {
	autokey: { from: 'title', path: 'key', unique: true },
	track: true
});

Video.add({
	title: { type: String, required: true, index: true, initial: true },
	publishedDate: { type: Date, default: Date.now },
	videoUrl: { type: Types.Text, initial: true },
	HausaVideoUrl: { type: Types.Text, initial: true },
	YourubeVideoUrl: { type: Types.Text, initial: true },
	igboVideoUrl: { type: Types.Text, initial: true },
	description: { type: Types.Text, initial: true },
	/*image: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages },*/
});

Video.register();
