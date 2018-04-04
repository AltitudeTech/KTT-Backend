var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Image Model
 * ===========
 * A database model for uploading images to the local file system
 */

var GalleryImage = new keystone.List('GalleryImage', {noedit: true});

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads/gallery/'), // required; path where the files should be stored
    publicPath: '/uploads/gallery/', // path where files will be served
  },
	schema: {
		size: true,
	 	mimetype: true,
		path: true,
		originalname: true,
		url: true,
		}
});

GalleryImage.add({
  name: { type: Types.Key, index: true},
  galleryId: { type: Types.Relationship, ref: 'Gallery', many: false, initial: true, required: true },
  url: {type: String},
  file: {
    type: Types.File,
    storage: myStorage,
    initial: true,
    required: true
  },
  createdTimeStamp: { type: String },
  alt1: { type: String },
  attributes1: { type: String },
  category: { type: String },      //Used to categorize widgets.
  priorityId: { type: String },    //Used to prioritize display order.
  parent: { type: String },
  children: { type: String },
  fileType: {type: String},
});

GalleryImage.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
  this.url = this.file.url;
	next();
});

GalleryImage.schema.post('save', async function () {
	if (this.wasNew){
    try {
  		let gallery = await keystone.list('Gallery').model.findOne({ _id: this.galleryId}).exec();
  		gallery.images.push(this._id);
  		gallery.save();
  	} catch (e) {
      console.log(err);
  	}
  }
});

var fs = require('fs');
GalleryImage.schema.pre('remove', function (next) {
  fs.unlink(keystone.expandPath('/public'+this.url), (err) => console.log(err))
  next();
});

GalleryImage.schema.post('remove',async function() {
	try {
		let gallery = await keystone.list('Gallery').model.findOne({ _id: this.galleryId }).exec();
		if (!gallery) {
			next(new Error('This gallery does not exist'))
		}
		const index = gallery.images.findIndex(image=>(image.toString()===this._id.toString()));
		if (index > -1) {
			gallery.images.splice(index, 1);
			gallery.save();
		}
	} catch (e) {
		throw new Error(e);
	}
});

// GalleryImage.schema.pre('remove', function (next) {
//   console.log('rer');
//   console.log(this);
//   console.log(doc);
//   keystone.list('Gallery').model.findOne({ id: this.galleryId}).exec((err, gallery)=>{
//     if (err) {
//       throw new Error(err);
//       return
//     }
//     console.log(gallery);
//     gallery.images = gallery.images.filter(e => e !== this._id);
//     gallery.save((err, gallery)=>{
//       if (err) {
//         console.log(err);
//       }
//       next()
//     });
//   })
// });

GalleryImage.defaultColumns = 'name, galleryId, file, url';
GalleryImage.register();
