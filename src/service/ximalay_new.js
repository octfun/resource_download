var request = require('request');
var fs = require('fs');
var axios = require('axios')
import * as util from '../common/util'
const cheerio = require('cheerio')

const baseHtmlUrl = 'https://www.ximalaya.com/youshengshu/3961629/p'
const cookie = '_xmLog=xm_k4de7tffjun2ev; device_id=xm_1576800351741_k4de7u2lx81n4w; 1&remember_me=y; 1&_token=42915969&743633DB940A414C8448C0DB56F33DECNdVC9E628B64DE716F4DDE51E0CECFF30E79EEECC3F78AB5CC80D8532B58966B048; s&e=755ef123d2f79742eeb1abe4e4f3f07c; Hm_lvt_4a7d8ec50cfd6af753c4f8aee3425070=1576768232,1576800244,1576852206,1576893582; Hm_lpvt_4a7d8ec50cfd6af753c4f8aee3425070=1576893582; x_xmly_traffic=utm_source%253A%2526utm_medium%253A%2526utm_campaign%253A%2526utm_content%253A%2526utm_term%253A%2526utm_from%253A; s&a=A^Z%06%04RMT%1E]%05XWXOU%1F%0E%09R%0F%05%1EW%1F_%05T%04S@%04VZ_O^OATVZXYTOAUO'
function decode(t) {
    Dt.AES.decrypt({
        ciphertext: Rt.enc.Base64url.parse(t)
    }, Dt.enc.Hex.parse("aaad3e4fd540b0f79dca95606e72bf93"), {
        mode: Dt.mode.ECB,
        padding: Dt.pad.Pkcs7
    }).toString(Dt.enc.Utf8)
}

function getUri(t){
    var o = t.seed
        , i = t.fileId
        , a = t.ep
        , u = t.duration
        , s = t.domain
        , c = t.apiVersion
        , l = function(t, e) {
        var n = new gt(t).cg_fun(e);
        return "/" === n[0] ? n : "/".concat(n)
    }(o, i)
        , f = _t(a);
    f.duration = u;
    var p = function(t) {
        return t.indexOf("audio.pay.xmcdn.com") > -1 ? "https://vod.xmcdn.com" : t
    }(s)
        , h = "".concat(p, "/download/").concat(c).concat(l)
        , d = "".concat(h, "?").concat(stringfy(f));
    return d
}
export async function start(start, end, index, foldername, baseurl) {
    try {
        for(var i=start; i<=end; i++) {
            const resourceRes = await axios.get(`https://www.ximalaya.com/revision/album/v1/getTracksList?albumId=51653099&pageNum=${i}&sort=0`,{
                headers: {'Cookie': cookie}//设置header信息
            })
            const tracks = resourceRes.data.data.tracks
            // 从开始页的index开始下载
            for (let j = 0; j< tracks.length; j++) {
                
                const resourceRes = await axios.get(`https://mobile.ximalaya.com/mobile-playpage/track/v3/baseInfo/${new Date().getTime()}?device=web&trackId=${tracks[j].trackId}`,{
                    headers: {'Cookie': cookie}//设置header信息
                  })
                var trackInfo = resourceRes.data.trackInfo
                console.log('resourceRes', tracks[j].trackId, trackInfo)
                // var n = new gt(resourceRes.data.seed).cg_fun(resourceRes.data.fileId);
                // console.log(n)
                const encodedUrl = trackInfo && trackInfo.playUrlList && trackInfo.playUrlList[0]
                if (!encodedUrl) {
                    continue
                }
                var d = getUri(encodedUrl)
                console.log(d)
                
                // try{
                //     const path = 'D://Node//ximalaya//' + ( foldername && foldername !== '' ? foldername+'//' : '' )
                //     if(!fs.existsSync(path)) {
                //         util.mkdirsSync(path)
                //     }
                //     const res = await util.downloadWithRetry( d, path + names[j]+'.m4a', 3, 1) 
                // } catch(e) {
                //     console.log('downloadWithRetry', e)
                //     util.appendFile(path+'error.log',`page:${i}, index:${j}, name: ${names[j]}`)
                // }
                // await util.sleep(5000)
            }
        }
        console.log('Hello World');
    } catch(e) {
        console.log('===', e)
    }
}
