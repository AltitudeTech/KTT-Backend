var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * News Model
 * ==========
 */
var News = new keystone.List('News', {
    track: true
});

News.add({
  title: { type: String, initial: true, index: true, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  heroImage: { type: Types.CloudinaryImage },
  author: {type: Types.Text, initial: true, index: true},
  isBreaking: {type: Boolean, default: false, initial: true, index: true},
  body: {
    p1: {type: Types.Textarea, initial: true, index: true, height: 200},
    p2: {type: Types.Textarea, initial: true, index: true, height: 200},
    image: { type: Types.CloudinaryImage },
    p3: {type: Types.Textarea, initial: true, index: true, height: 200},
    p4: {type: Types.Textarea, initial: true, index: true, height: 200},
  },
});


/**
 * Registration
 */
News.defaultSort = '-date';
News.defaultColumns = 'publishedDate, title, state, isBreaking';
News.register();
