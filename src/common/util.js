var jsdom = require('jsdom');
var iconv = require('iconv-lite');
var request = require('request');
var fs = require('fs');
var path = require("path");  
export function gbkBufferToUtf8Buffet(gbkBuffer,callBackFunction) {
    
    var decodedBody = iconv.decode(Buffer.concat(gbkBuffer), 'GBK');
    var string = decodedBody.toString();
    callBackFunction(string);
}
export function getHtml(pageUrl){
    const { JSDOM } = jsdom;
    var https = require('https');
    var html = [];
    var htmlStr = ''
    var request = https.get(pageUrl,function(res){
        res.on('data',function(data){
            html.push(iconv.decode(data, "utf-8"));
            htmlStr += iconv.decode(data, "utf-8")
        });
        res.on('end',function(){
            // console.log(html)
            // gbkBufferToUtf8Buffet(html,function(utf8String){
            //     var item = new JSDOM(utf8String);
            //     var document = item.window.document;
            //     analyzeHTMLDListElementList(document.getElementsByClassName('xi2'),function(){});
            // });
        });
    });
    request.on('error',function(error){
        console.log('error is ' + error);
    });

    request.end();
}

export function loadPage(url) {
    var https = require('https');
    var pm = new Promise(function (resolve, reject) {
        https.get(url, function (res) {
            var html = '';
            res.on('data', function (d) {
                html += d.toString()
            });
            res.on('end', function () {
                resolve(html);
            });
        }).on('error', function (e) {
         reject(e)
        });
    });
    return pm;
}


export function loadliulishuoPage(goku_session, authenticity_token, pwd) {
    var https = require('https');
    // var postData = `{
    //     "utf8": "^%^E2^%^9C^%^93^",
    //     "authenticity_token": "${authenticity_token}",
    //     "access_password": "pwd",
    //     "commit": "^%^E9^%^AA^%^8C^%^E8^%^AF^%^81^%^E5^%^B9^%^B6^%^E5^%^A1^%^AB^%^E5^%^86^%^99^%^E8^%^A1^%^A8^%^E5^%^8D^%^95"
    //   }`;
    var postData = `utf8=^%^E2^%^9C^%^93^&authenticity_token=${authenticity_token}&access_password=112345&commit=^%^E9^%^AA^%^8C^%^E8^%^AF^%^81^%^E5^%^B9^%^B6^%^E5^%^A1^%^AB^%^E5^%^86^%^99^%^E8^%^A1^%^A8^%^E5^%^8D^%^95`
    var settings = {
        // url: "https://forms.liulishuo.work/f/dcdzMX/access_password_verify",
        hostname:'forms.liulishuo.work',
        path:'/f/dcdzMX/access_password_verify',
        method: "post",
        headers: {
          "Cookie": `goku_session=${goku_session}; Hm_lvt_44cbe0310f7f2c315fc22c59e6496914=1594991810; Hm_lpvt_44cbe0310f7f2c315fc22c59e6496914=15949918101`,
          "authority": "forms.liulishuo.work",
          "content-type": "application/x-www-form-urlencoded",
          'Content-Length': Buffer.byteLength(postData),
          connection: 'keep-alive',
        }
    };
    var pm = new Promise(function (resolve, reject) {
        var req = https.request(settings, function (res) {
            console.log('状态码:', res.statusCode);
            console.log('请求头:', res.headers);
            var html = '';
            res.on('data', function (d) {
                html += d.toString()
            });
            res.on('end', function () {
                resolve(html);
            });
        }).on('error', function (e) {
         reject(e)
        });
        req.write(postData);
        req.end();
    });
    return pm;
}

export function download(uri, filename, callback){
    var pm = new Promise(function (resolve, reject) {
        var stream = fs.createWriteStream(filename);
        request(uri).pipe(stream).on('close', resolve(filename+uri)).on('error', function (e) {
         reject(e)
        });
    });
    return pm;
   
}
export function downloadWithRetry(uri, filename, times, delay) {
    return new Promise(function(resolve, reject) {
       function attempt (uri, filename) {
        download(uri, filename).then(resolve).catch(function(erro) {
        console.log(`还有 ${times} 次尝试`)
          if (0 == times) {
            reject(erro)
          } else {
            times--
            setTimeout(attempt(), delay)
          }
        })
      }
       attempt(uri, filename)
    })
}
  
//   download("http://.../demo.zip", "demo.zip", function(){
//     console.log("下载成功");
//   });
export function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

// 递归创建目录 同步方法
export function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
}
export function appendFile(path, file, data, callback){
    var pm = new Promise(function (resolve, reject) {
        mkdirsSync(path)
        fs.appendFile(path+'//'+file, data, (err) => {
            if (err) reject(err);
            console.log('数据已追加到文件');
            resolve()
          })
    });
    return pm;
}