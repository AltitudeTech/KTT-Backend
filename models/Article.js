var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Article Model
 * ==========
 */
var Article = new keystone.List('Article', {
    track: true
});

Article.add({
  title: { type: String, required: true, index: true, initial: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  //heroImage: { type: Types.CloudinaryImage },
  author: {type: Types.Text, initial: true, index: true},
  isBreaking: {type: Boolean, default: false, initial: true, index: true},
  brief: {type: Types.Textarea, index: true, height: 150},
  content: {
    p1: {type: Types.Textarea, index: true, height: 200},
    p2: {type: Types.Textarea,  index: true, height: 200},
    //image: { type: Types.CloudinaryImage },
    p3: {type: Types.Textarea, index: true, height: 200},
    p4: {type: Types.Textarea, index: true, height: 200},
  },
});


/**
 * Registration
 */
Article.defaultSort = '-date';
Article.defaultColumns = 'publishedDate, title, state, isBreaking';
Article.register();
