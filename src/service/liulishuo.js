var request = require('request');
var fs = require('fs');
var qs = require('qs');
var axios = require('axios')
import * as util from '../common/util'
const cheerio = require('cheerio')
import pwds from './pwd'
// axios.interceptors.request.use(config => {
// console.log(config.data)
//     return  qs.stringify(config.data)

//   }, (err) =>{
//     return Promise.reject(err);
//   })
export function loadliulishuoPage(goku_session, authenticity_token, pwd) {
    var settings = {
        url: "https://forms.liulishuo.work/f/dcdzMX/access_password_verify",
        method: "post",
        timeout:2000,
        headers: {
          "Cookie": `goku_session=${goku_session}; Hm_lvt_44cbe0310f7f2c315fc22c59e6496914=1594991810; Hm_lpvt_44cbe0310f7f2c315fc22c59e6496914=15949918101`,
          "authority": "forms.liulishuo.work",
          Accept:'*/*',
          'Accept-Encoding': 'gzip, deflate'
        },
        data: {
          utf8: "^%^E2^%^9C^%^93^",
          authenticity_token: authenticity_token,
          access_password: pwd,
          commit: "^%^E9^%^AA^%^8C^%^E8^%^AF^%^81^%^E5^%^B9^%^B6^%^E5^%^A1^%^AB^%^E5^%^86^%^99^%^E8^%^A1^%^A8^%^E5^%^8D^%^95"
        }
      };
    return axios(settings);
}

export async function start() {
    try {
        console.log(pwds[0])
        for(var i=0; i<=0; i++) {
            const pwd =  "Princess"
            const res = await loadliulishuoPage(
                'dXJFMk1aaVJiRDRiUUJlUHdqNlFaNnBlMjczQnJ4d290ZTBxbGlubVRUREh6dW9uMG95Tk1wT0Q0UTV6NzY5ZnlqRSsyclVBM1QxMnhidWFUQy9hOWY3SGlvOEhqbVd0WVBNTmFlRHdDQk9iM2Q0NzI1VCtjVjg2dDlJTm91NU96cW0veC9GS0NwZlRySDJOYXYvQlNRPT0tLTZnQWxhZlNkdUpXeDF5VFlZZHB5RUE9PQ%3D%3D--5ba4c4a16d90351e860537e50b0d591c6b894cad', 
                '7QTllbwyHLwjpFaGW5X+Wlch5/Gpww6yfK6XUgn4ECu9jJMQUeNGq9WjBf8DZJO3K8iNdmFA6e4EEK9yzbPZKg==', 
                pwd
            ).catch(e => console.log(e))  
            if(res) {
                let authenticity_token = 'NULL'
                try {
                    if (res.data.indexOf('html') > 0) {
                        const $ = cheerio.load(res.data)
                        authenticity_token = $('input[name="access_password"]').val()
                    } else {
                        authenticity_token = ''
                    }
                    // console.log(res.data)
                    fs.appendFile('D:/Node/resource_download/src/service/log.txt',i+ '>>>'+authenticity_token+ pwds[i] +'\r\n', (err) => {
                        if (err) throw err;
                        console.log(i, '>>>'+authenticity_token, pwds[i])
                    });
                } catch (e) {
                    console.log('>>>', e)
                }
                

                
                if (!authenticity_token) {
                    console.log(i, '=============', pwd)
                    return
                }
            } 
            
        }
        console.log('>>>>>>>>>>>end')
        // console.log(pagehtml? pagehtml.data : '')
    } catch(e) {
        console.log('===', e)
    }
}
