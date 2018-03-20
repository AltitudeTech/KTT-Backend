const simpleYoutubeApi = require("simple-youtube-api")
const youtube = new simpleYoutubeApi('AIzaSyDqOg0997GmawkD1u1jKdXfqULYx5t7kbs');

//console.log(youtube);
//Channel ID - UCaSM4GqhbaVmRT7fmmFmR1w

youtube.searchVideos('', 10, {channelID: 'UCaSM4GqhbaVmRT7fmmFmR1w'})
 .then(results => {
   console.log(results);
 })
 .catch(console.error);;
