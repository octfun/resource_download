var axios = require('axios')
function JieMa(u) {
    var tArr = u.split("*")
      , str = '';
    for (var i = 0, n = tArr.length; i < n; i++) {
        str += String.fromCharCode(tArr[i]);
    }
    return str;
}




export async function start(start, end, index, foldername, baseurl) {
    console.log('123123xs')
    try {
        for(var i=start; i<=end; i++) {
            const resourceRes = await axios.get(`https://www.ting22.com/api.php?c=Json&id=529&page=${i}&pagesize=10&callback=jQuery21405787544285219408_1&_=1581578784629`,{
                headers: {'sign': '1581578784637'}//设置header信息
            })
            const resJson = JSON.parse(resourceRes.data.slice(29, -2))
            const playlist = resJson.playlist
            console.log(playlist)
            try{
                const path = 'D://Node//ximalaya//' + ( foldername && foldername !== '' ? foldername+'//' : '' )
                if(!fs.existsSync(path)) {
                    util.mkdirsSync(path)
                }
                const res = await util.downloadWithRetry( d, path + names[j]+'.m4a', 3, 1) 
            } catch(e) {
                console.log('downloadWithRetry', e)
                util.appendFile(path+'error.log',`page:${i}, index:${j}, name: ${names[j]}`)
            }
            await util.sleep(5000)
        }
    } catch(e) {
        console.log('===', e)
    }
}