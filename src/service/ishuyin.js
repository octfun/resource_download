var request = require('request');
var fs = require('fs');
var axios = require('axios')
import * as util from '../common/util'
const cheerio = require('cheerio')
// https://mip.ishuyin.com
function JieMa(u) {
    var tArr = u.split("*")
      , str = '';
    for (var i = 0, n = tArr.length; i < n; i++) {
        str += String.fromCharCode(tArr[i]);
    }
    return str;
}

export function getHtmlWithRetry(uri, times, delay) {
    return new Promise(function(resolve, reject) {
       function attempt (uri) {
        console.log('>>>>>', uri)
        axios.get(uri, {timeout: 3000}).then(resolve).catch(function(error) {
        console.log(`还有 ${times} 次尝试`)
          if (0 == times) {
            reject(error)
          } else {
            times--
            setTimeout(attempt(uri), delay)
          }
        })
      }
       attempt(uri)
    })
}
export async function start(start, end, foldername) {
    console.log('https://mip.ishuyin.com')
    try {
        for(var i=start; i<=end; i++) {
            const url = `https://mip.ishuyin.com/player.php?mov_id=13642&look_id=${i}&player=mp`
            // console.log('>>>', url)
            const res = await getHtmlWithRetry(url, 3, 5000)
            console.log('>>>> html end')
            try{
                if (res && res.data) {
                    const path = 'D://Node//ishuyin//' + ( foldername && foldername !== '' ? foldername+'//' : '' )
                    if(!fs.existsSync(path)) {
                        util.mkdirsSync(path)
                    }
                    const htmlStr = res.data
                    const s_index = htmlStr.indexOf('var u="*')
                    const e_index = htmlStr.indexOf('*";')
                    console.log(s_index, e_index);
                    const code_url = htmlStr.substring(s_index+8, e_index)
                    
                    const url = JieMa(code_url)
                    // console.log(s_index, e_index);
                    // console.log(code_url)
                    console.log(url)
                    console.log( path +i+'.mp3')
                    await util.downloadWithRetry(url, path +i+'.mp3', 3, 1) 
                }
            } catch(e) {
                console.log('downloadWithRetry', e)
            }
            
        }
    } catch(e) {
        console.log('===', e)
    }
}