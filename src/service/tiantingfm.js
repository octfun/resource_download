import * as util from '../common/util'
const cheerio = require('cheerio')
export async function start() {
    let array = []
    // for(let i=0; i<3; i++){
    //     array.push(this.testForPromise(i))
    // }
    // Promise.all(array).then((res) => {
    //     console.log(res)   // [ 0, 1, 2 ]
    // })
    for(var index=29; index<=36; index++) {
        console.log('=============',index)
        const pagehtml = await util.loadPage(`https://m.tiantingfm.com/xuanhuanqihuan1/fanrenxiuxianchuansangzibojiang/0-${index}0.html`)
        // console.log(res)
        // var parser = new DOMParser()
        // var el = parser.parseFromString(res, "text/xml");
        // console.log(el.getElementsByName('path').length)
        
        // 加载HTML字符串
        const $ = cheerio.load(pagehtml)
        console.log('=============after load page',index)
        var uris = []
        var names = []
        $('input[name=path]').each(function(i, elem) {
            const uri = $(this).attr('value')
            uris.push(uri)
            // const name = $(this).attr('name')
            
            // download(uri,'D:\\Node\\Test\\'+i+'.m4a',  console.log(uri))
            // download(uri,((index-1) + i)+'.m4a', function(){
            //     console.log(uri+"下载成功");
            // });
        })
        $('input[name=name]').each(function(i, elem) {
            const name = $(this).attr('value')
            names.push(name)
        })
        console.log('=============start download',index)
        for(var j=0; j<uris.length; j++){
            console.log(uris[j]+ names[j]+"开始下载成功");
            const res = await util.download(uris[j], names[j]+'.m4a', function(){
                console.log(uris[j]+ names[j]+"下载成功");
            });
            console.log(res+"下载成功");
        }
        console.log('=============end',index)
        await sleep(60000)
        // })
    }
    console.log('Hello World');
}