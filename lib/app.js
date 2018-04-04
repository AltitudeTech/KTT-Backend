const { processAllVideos, processLatestVideos } = require('./fetchVideos');

module.exports.run = () => {
  //articles.retrieveArticles({sourceName: 'Pulse'});
  console.log('----Processing All Videos----');
  processAllVideos();
  setInterval(()=>{
    console.log('----Processing Latest Videos----');
    processAllVideos();
    //processLatestVideos();
  }, 60*1000);//Every Minute
};
