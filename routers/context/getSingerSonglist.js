const { UCommon } = require('../../module');

// area_id=15&version_id=7
module.exports = async (ctx, next) => {
    const {
        singermid,
        page = 1,
        limit = 30
    } = ctx.query;
    const begin = (parseInt(page) - 1 || 0) * parseInt(limit);
    const data = {
        comm: {
            ct: 20,
            format: 'json'
        },
        songList: {
            module: 'musichall.song_list_server',
            method: 'GetSingerSongList',
            param: {
                begin,
                num: parseInt(limit),
                order: 1,
                singerMid: singermid
            }
        }
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
