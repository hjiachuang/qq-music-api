const { UCommon } = require('../../module');

// area_id=15&version_id=7
module.exports = async (ctx, next) => {
    const {
        singermid,
        page = 1,
        limit = 40,
        tagid = 0
    } = ctx.query;
    const start = (parseInt(page) - 1 || 0) * parseInt(limit);
    const data = {
        comm: {
            ct: 20,
            format: 'json'
        },
        mvList: {
            module: 'MvService.MvInfoProServer',
            method: 'GetSingerMvList',
            param: {
                start,
                count: parseInt(limit),
                order: 0,
                singermid: singermid,
                tagid: parseInt(tagid)
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
