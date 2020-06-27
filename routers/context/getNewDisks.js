const { UCommon } = require('../../module');
const { commonParams } = require('../../module/config');

module.exports = async (ctx, next) => {
  const page = +ctx.query.page || 1;
  const num = +ctx.query.limit || 30;
  const area = +ctx.query.area || 1;
  const getTag = ctx.query.getTag || false;
  const start = (page - 1) * num;
  let data = {
    new_album: {
      module: 'newalbum.NewAlbumServer',
      method: 'get_new_album_info',
      param: {
        area,
        start,
        num,
      }
    },
    comm: {
      ct: 24,
      cv: 0
    }
  }
  if (getTag) {
    data = {
      new_album_tag: {
        module: 'newalbum.NewAlbumServer',
        method: 'get_new_album_area',
        param: {}
      },
      comm: {
        ct: 24,
        cv: 0
      }
    }
  }
  const params = Object.assign({
    format: 'json',
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    option: {}
  };
  await UCommon(props).then((res) => {
    const response = res.data;
    ctx.status = 200;
    ctx.body = {
      status: 200,
      response,
    }
  }).catch(error => {
    console.log(`error`, error);
  });
}
;