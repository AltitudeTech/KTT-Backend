const keystone = require('keystone');
const simpleYoutubeApi = require("simple-youtube-api")

const KttvVideo = keystone.list('KttvVideo');
const youtube = new simpleYoutubeApi(process.env.GOOGLE_API_KEY);

//console.log(youtube);
//Channel ID - UCaSM4GqhbaVmRT7fmmFmR1w

exports.processAllVideos = () => {
  let count = 0;
  // lett
  youtube.getPlaylist('https://www.youtube.com/playlist?list=PLDWf6WFfca8OaBsPiR8FEd3090z1CWAG_')
//   youtube.getPlaylist('https://www.youtube.com/playlist?list=LL6-ymYjG0SU0jUWnWh9ZzEQ')
    .then(playlist => {
        // console.log(`The playlist's title is ${playlist.title}`);
        playlist.getVideos()
            .then(async videos => {
              await Promise.all(
                videos.map(async (video)=>{
                  // console.log(video);
                  if (video.title !== 'Private video') {
                    const isDuplicate = await checkDuplicate(video.id);
                    // console.log(video);
                    if (!isDuplicate) {
                      const newVideo = new KttvVideo.model({
                        youtubeId: video.id,
                        title: video.title,
                        description: video.description,
                        thumbnailUrl: video.thumbnails.default.url,
                        publishedAt: video.publishedAt,
                        url: `https://www.youtube.com/watch?v=${video.id}`
                      });
                      try {
                        await newVideo.save();
                        count = count + 1;
                      } catch (e){
                        console.log(e);
                      }
                    } else {
                      //console.log('is duplicate');
                    }
                  } else {
                    //console.log('video is private');
                  }
                })
              )
              console.log(`${(videos.length > 1) ? 'All': ''} ${videos.length} video${(videos.length > 1) ? 's': ''} in the playlist have been processed.`);
              console.log(`${count} videos have been added to the DB.`);
            })
            .catch(console.log);
    })
    .catch(console.log);
}

/*module.export.processAllDuplicateVideos = () => {
  youtube.getPlaylist('https://www.youtube.com/playlist?list=PLDWf6WFfca8OaBsPiR8FEd3090z1CWAG_')
    .then(playlist => {
        // console.log(`The playlist's title is ${playlist.title}`);
        playlist.getVideos()
            .then(videos => {
              videos.forEach(video=>{
                if (!checkDuplicate(video.youtubeId)){

                }
              })
                console.log(`This playlist has ${videos.length === 50 ? '50+' : videos.length} videos.`);
            })
            .catch(console.log);
    })
    .catch(console.log);
}*/

exports.processLatestVideos = () => {
  /*youtube.getPlaylist('https://www.youtube.com/playlist?list=PLDWf6WFfca8OaBsPiR8FEd3090z1CWAG_')
    .then(playlist => {
        console.log(`The playlist's title is ${playlist.title}`);
        playlist.getVideos()
            .then(videos => {
                console.log(`This playlist has ${videos.length === 50 ? '50+' : videos.length} videos.`);
            })
            .catch(console.log);
    })
    .catch(console.log);*/
}

const checkDuplicate = async (youtubeId) => {
  try {
    const video = await KttvVideo.model.findOne({youtubeId}).exec();
    if (!video) {
      return false;
    }
    //is already in db
    return true;
  } catch (e) {
    throw new Error(e);
    return true;
  }
}
