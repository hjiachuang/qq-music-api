const axios = require('axios')

module.exports = async (ctx, next) => {
    let { name=null, album=null, artists=null, rawData=false } = ctx.query
    if(name) {
        name = name.trim()
        const token_url = `http://kuwo.cn/search/list?key=${encodeURIComponent(name)}`
        const token_result = await axios.get(token_url)
        const token = token_result.headers['set-cookie'].find(line => line.includes('kw_token')).replace(/;.*/, '').split('=').pop()
        try {
            const search_url = `http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${encodeURIComponent(name)}&pn=1&rn=30`
            const search_result = await axios.get(search_url, {
                headers: {
                    "Cookie": `kw_token=${token}`,
                    "Host": "kuwo.cn",
                    "Referer": token_url,
                    "csrf": token
                }
            })
            if(search_result.status === 200) {
                const { list } = search_result.data.data
                const matchData = list.find(item => {
                    const nameBool = name.toLowerCase().indexOf(item.name.toLowerCase()) !== -1 || item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
                    const albumBool = album? album.trim().toLowerCase().indexOf(item.album.toLowerCase()) !== -1 : true
                    let artistsBool
                    if(artists) {
                        artists = artists.trim().toLowerCase()
                        artistsBool = item.artist.toLowerCase().split("&").reduce((bool, v) => {
                            console.log(artists, v, artists.indexOf(v), v.indexOf(artists))
                            if(artists.indexOf(v) === -1 && v.indexOf(artists) === -1) {
                                bool = false
                            }
                            return bool
                        }, true)
                    }else {
                        artistsBool = true
                    }
                    return nameBool && albumBool && artistsBool
                })
                if(!matchData) {
                    const result = {
                        msg: "没有这首歌诶。"
                    }
                    if(rawData) {
                        result.currentData = matchData
                        result.rawData = search_result.data.data
                    }
                    return returnBody(ctx, 200,{
                        code: 404,
                        result
                    })
                }
                const { musicrid } = matchData
                const musicUrl_url = `http://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=${musicrid}`
                const musicUrl_result = await axios.get(musicUrl_url, {
                    headers: {
                        'User-Agent': 'okhttp/3.10.0'
                    }
                })
                if(musicUrl_result.status === 200) {
                    if(musicUrl_result.data === "") {
                        const result = {
                            msg: "没有这首歌的播放链接诶。"
                        }
                        if(rawData) {
                            result.currentData = matchData
                            result.rawData = search_result.data.data
                        }
                        return returnBody(ctx, 200,{
                            code: 404,
                            result
                        })
                    }
                    const result = {}
                    result.url = musicUrl_result.data
                    if(rawData) {
                        result.currentData = matchData
                        result.rawData = search_result.data.data
                    }
                    return returnBody(ctx, 200,{
                        code: 0,
                        result
                    })
                }else {
                    return returnBody(ctx, 200,{
                        code: 500,
                        msg: "网络错误。"
                    })
                }
            }else {
                return returnBody(ctx, 200,{
                    code: 500,
                    msg: "网络错误。"
                })
            }
        }catch (err) {
            return returnBody(ctx, 200,{
                code: 500,
                msg: err
            })
        }
    }else {
        return returnBody(ctx, 200,{
            code: 500,
            msg: "网络错误。"
        })
    }
}

function returnBody(ctx, code, body) {
    ctx.status = code
    ctx.body = body
}