const Router = require('koa-router');
const router = new Router();
const context = require('./context');

// downloadQQMusic
router.get('/downloadQQMusic', context.getDownloadQQMusic);

router.get('/getHotkey', context.getHotKey);

router.get('/getSearchByKey/:key?/:limit?/:page?/:catZhida?', context.getSearchByKey);

// search smartbox
router.get('/getSmartbox/:key?', context.getSmartbox);

// 1
router.get('/getSongListCategories', context.getSongListCategories);

router.get('/getSongLists/:page?/:limit?/:categoryId?/:sortId?', context.getSongLists);

router.post('/batchGetSongLists', context.batchGetSongLists);

// getSongInfo
router.get('/getSongInfo/:songmid?/:songid?', context.getSongInfo);
router.post('/batchGetSongInfo', context.batchGetSongInfo);

// 4
// disstid=7011264340
router.get('/getSongListDetail/:disstid?', context.getSongListDetail);

// newDisk
router.get('/getNewDisks/:page?/:limit?', context.getNewDisks);

// getMvByTag
router.get('/getMvByTag/:singermid?', context.getMvByTag);

// MV
// area_id=15&version_id=7
router.get('/getMv/:area_id?/:version_id?/:limit?/:page?', context.getMv);

// getSingerList
router.get('/getSingerList/:area?/:sex?/:genre?/:index?/:page?', context.getSingerList);

// getSimilarSinger
// singermid=0025NhlN2yWrP4
router.get('/getSimilarSinger/:singermid?', context.getSimilarSinger);

// getSingerAlbum
// singermid=0025NhlN2yWrP4
router.get('/getSingerAlbum/:singermid?/:limit?/:page?', context.getSingerAlbum);

/**
 * @description: getSingerMv
 * @param order: time(fan upload) || listen(singer all)
 */
router.get('/getSingerMv/:singermid?/:limit?/:order?', context.getSingerMv);

router.get('/getSingerDesc/:singermid?', context.getSingerDesc);

router.get('/getSingerSonglist/:singermid?/:page?/:limit?', context.getSingerSonglist);

router.get('/getSingerStarNum/:singermid?', context.getSingerStarNum);

// radio
router.get('/getRadioLists', context.getRadioLists);

// DigitalAlbum
router.get('/getDigitalAlbumLists', context.getDigitalAlbumLists);

// music
// getLyric
// songmid=003rJSwm3TechU
router.get('/getLyric/:songmid?/:isFormat?', context.getLyric);

// songmid=003rJSwm3TechU
router.get('/getMusicVKey/:songmid?', context.getMusicVKey);

// album
// albummid=0016l2F430zMux
router.get('/getAlbumInfo/:albummid?', context.getAlbumInfo);

router.get('/getComments/:id?/:rootcommentid?/:cid?/:pagesize?/:pagenum?/:cmd?/:reqtype?/:biztype?', context.getComments);

// recommend
router.get('/getRecommend', context.getRecommend);

// mv play
router.get('/getMvPlay/:vid?', context.getMvPlay);

// rankList: getTopLists
router.get('/getTopLists', context.getTopLists);

// ranks
router.get('/getRanks/:topId?/:limit?/:page?', context.getRanks);

// ticket
router.get('/getTicketInfo', context.getTicketInfo);

// getImageUrl
router.get('/getImageUrl', context.getImageUrl);

// getUrl
router.get('/getUrl/:name?/:album?/:artists?/:rawData?', context.getUrl);

module.exports = router;