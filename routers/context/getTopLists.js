const {UCommon} = require('../../module');
const {_guid, commonParams} = require('../../module/config');

// -100 默认值 all
// area [1 - 6]
// sex 0 男 1 女 2 组合
// genre [1 - 20]
// index a-z # 1-27
module.exports = async (ctx, next) => {
    const data = {
        comm: {
            ct: 24,
            cv: 0
        },
        topList: {
            module: "musicToplist.ToplistInfoServer",
            method: "GetAll",
            param: {}
        }
    }
    const params = Object.assign(commonParams, {
        format: 'json',
        data: JSON.stringify(data),
    });
    const props = {
        method: 'get',
        params,
        option: {},
    };
    await UCommon(props).then(res => {
        const response = res.data;
        ctx.status = 200;
        ctx.body = {
            status: 200,
            response,
        }
    }).catch(error => {
        console.log(`error`, error);
    });
};
