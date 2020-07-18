var request = require('request');
var fs = require('fs');
var axios = require('axios')
import * as util from '../common/util'
const cheerio = require('cheerio')

function JieMa(u) {
    var tArr = u.split("*")
      , str = '';
    for (var i = 0, n = tArr.length; i < n; i++) {
        str += String.fromCharCode(tArr[i]);
    }
    return str;
}
"104*116*116*112*58*47*47*115*116*97*116*105*99*46*108*105*97*111*108*105*97*111*121*46*99*111*109*47*97*117*100*105*111*47*50*48*49*55*48*49*49*52*47*49*48*51*49*50*52*120*116*110*49*102*108*121*101*46*109*112*51"
104*116*116*112*115*58*47*47*99*46*116*105*110*103*50*50*46*99*111*109*47*52*48*52*46*109*112*51



export async function start(start, end, index, foldername, baseurl) {
    console.log('123123xs')
    try {
        for(var i=start; i<=end; i++) {
            const url = `https://www.ting22.com/api.php?c=Json&id=529&page=${i}&pagesize=10&callback=jQuery21405787544285219408_1&_=${new Date()-200}`
            console.log(url, new Date().valueOf(),)
            const resourceRes = await axios.get(url,{
                headers: {'sign': new Date().valueOf(),
                referer: `https://www.ting22.com/ting/529-${i}.html`}//设置header信息
            })
            const resJson = JSON.parse(resourceRes.data.slice(29, -2))
            const playlist = resJson.playlist
            console.log(playlist)
            try{
                const path = 'D://Node//ximalaya//' + ( foldername && foldername !== '' ? foldername+'//' : '' )
                if(!fs.existsSync(path)) {
                    util.mkdirsSync(path)
                }
                for(let j=0; j<playlist.length; j++){
                    console.log(JieMa(playlist[j].file))
                    const res = await util.downloadWithRetry( JieMa(playlist[j].file), path +playlist[j].trackName+'.mp3', 3, 1) 
                    await util.sleep(5000)
                }
            } catch(e) {
                console.log('downloadWithRetry', e)
                util.appendFile(path+'error.log',`page:${i}, index:${j}, name: ${names[j]}`)
            }
            
        }
    } catch(e) {
        console.log('===', e)
    }
}