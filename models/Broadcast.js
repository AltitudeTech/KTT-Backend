const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Broadcast Model
 * ==========
 */
const Broadcast = new keystone.List('Broadcast', {
    track: true
});

Broadcast.add({
	title: { type: String, required: true, index: true, initial: true },
  //description: {type: Types.Textarea, index: true, height: 150, initial: true},
  description: {type: Types.Text, index: true, initial: true},
  state: { type: Types.Select, options: 'draft, published, retracted', default: 'draft', index: true },
  articles: { type: Types.Relationship, ref: 'Article', many: true,  initial: true },
	videos: { type: Types.Relationship, ref: 'Video', many: true,  initial: true },
  logos: { type: Types.Relationship, ref: 'Logo', many: true,  initial: true },
  banners: { type: Types.Relationship, ref: 'Banner', many: true,  initial: true },
}, 'Send To',{
  sendToAll: { type: Boolean, label: 'All Media Outlets', initial: true },
  sendToAllNewspapers: { type: Boolean, label: 'All Newspaper Outlets', initial: true },
  sendToAllTvStations: { type: Boolean, label: 'All Tv Stations', initial: true },
  sendToAllRadioStations: { type: Boolean, label: 'All Radio Stations', initial: true },
  sendToAllBloggers: { type: Boolean, label: 'All Blog Outlets', initial: true },
  outlets: { dependsOn: { all: false }, type: Types.Relationship, ref: 'Outlet', many: true,  initial: true, /*required: true*/ },
});

Broadcast.schema.post('save', function () {
  console.log(this);
  if (this.state === 'published') {
    if (this.sendToAll) {
      console.log('Sending to all outlets');
      //this.sendNotificationEmail();
    }
  }
  console.log('saved mofocker');
});

/**
 * Relationships
 */
//Broadcast.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Broadcast.defaultSort = '-createdAt';
Broadcast.defaultColumns = 'title, description, articles, videos, banners';
Broadcast.register();
