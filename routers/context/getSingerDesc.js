const { UCommon } = require('../../module');

// area_id=15&version_id=7
module.exports = async (ctx, next) => {
      const { singermid } = ctx.query;
    const data = {
        comm: {
            ct: 20,
            format: 'json'
        },
        singerDetail: {
            module: 'musichall.singer_info_server',
            method: 'GetSingerDetail',
            param: {
                ex_singer: 1,
                group_singer: 1,
                pic: 1,
                singer_mids: [singermid],
                wiki_singer: 1
            }
        },
        // songList:{
        //     module: "musichall.song_list_server",
        //     method: "GetSingerSongList",
        //     param: {
        //         singerMid: singermid,
        //         begin: 0,
        //         num: 10,
        //         order: 1
        //     }
        // },
        // albumList: {
        //     module: "music.musichallAlbum.AlbumListServer",
        //     method: "GetAlbumList",
        //     param: {
        //         singerMid: singermid,
        //         order: 1,
        //         num: 30,
        //         begin: 0
        //     }
        // },
        // selectedAlbumList: {
        //     module: "music.musichallAlbum.SelectedAlbumServer",
        //     method: "SelectedAlbumList",
        //     param :{
        //         singerMid: singermid
        //     }
        // },
        // similarSingerList: {
        //     module: "music.SimilarSingerSvr",
        //     method: "GetSimilarSingerList",
        //     param: {
        //         singerMid: singermid,
        //         num: 6
        //     }
        // },
        // mvList: {
        //     module: "MvService.MvInfoProServer",
        //     method: "GetSingerMvList",
        //     param: {
        //         singerid: 0,
        //         singermid: singermid,
        //         tagid: 0,
        //         start: 0,
        //         count: 6,
        //         order: 1
        //     }
        // }
    }
    const params = Object.assign({
        // format: 'json',
        data: JSON.stringify(data),
    });
    const props = {
        method: 'get',
        params,
        option: {}
    };
    if (singermid) {
        await UCommon(props).then((res) => {
          const response = res.data;
          ctx.status = 200;
          ctx.body = {
            response,
          }
        }).catch(error => {
          console.log(`error`, error);
        });
      } else {
        ctx.status = 400;
        ctx.body = {
          response: 'singermid is null',
        }
      }
};
