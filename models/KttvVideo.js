var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * KttvVideo Model
 * =============
 */

var KttvVideo = new keystone.List('KttvVideo', {
	autokey: { from: 'title', path: 'key', unique: true },
	track: true,
	noedit: true
});

KttvVideo.add({
	title: { type: String, required: true, index: true, initial: true },
	publishedAt: { type: Types.Datetime, default: Date.now, index: true },
	url: { type: Types.Text, initial: true },
	youtubeId: { type: Types.Text, initial: true },
	description: { type: Types.Text, initial: true },
	thumbnailUrl: { type: Types.Text, initial: true },
	thumbnailMaxResUrl: { type: Types.Text, initial: true },
	// isPrivate: { type: Boolean, default: false }
	/*image: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages },*/
});

KttvVideo.register();
