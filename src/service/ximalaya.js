var request = require('request');
var fs = require('fs');
var axios = require('axios')
import * as util from '../common/util'
const cheerio = require('cheerio')

const baseHtmlUrl = 'https://www.ximalaya.com/youshengshu/3961629/p'
const cookie = '_xmLog=xm_k4de7tffjun2ev; device_id=xm_1576800351741_k4de7u2lx81n4w; 1&remember_me=y; 1&_token=42915969&743633DB940A414C8448C0DB56F33DECNdVC9E628B64DE716F4DDE51E0CECFF30E79EEECC3F78AB5CC80D8532B58966B048; s&e=755ef123d2f79742eeb1abe4e4f3f07c; Hm_lvt_4a7d8ec50cfd6af753c4f8aee3425070=1576768232,1576800244,1576852206,1576893582; Hm_lpvt_4a7d8ec50cfd6af753c4f8aee3425070=1576893582; x_xmly_traffic=utm_source%253A%2526utm_medium%253A%2526utm_campaign%253A%2526utm_content%253A%2526utm_term%253A%2526utm_from%253A; s&a=A^Z%06%04RMT%1E]%05XWXOU%1F%0E%09R%0F%05%1EW%1F_%05T%04S@%04VZ_O^OATVZXYTOAUO'
function gt(t) {
    this._randomSeed = t,
    this.cg_hun()
}
gt.prototype = {
    cg_hun: function() {
        this._cgStr = "";
        var t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890"
          , e = t.length
          , n = 0;
        for (n = 0; n < e; n++) {
            var r = this.ran() * t.length
              , o = parseInt(r);
            this._cgStr += t.charAt(o),
            t = t.split(t.charAt(o)).join("")
        }
    },
    cg_fun: function(t) {
        t = t.split("*");
        var e = ""
          , n = 0;
        for (n = 0; n < t.length - 1; n++)
            e += this._cgStr.charAt(t[n]);
        return e
    },
    ran: function() {
        return this._randomSeed = (211 * this._randomSeed + 30031) % 65536,
        this._randomSeed / 65536
    },
    cg_decode: function(t) {
        var e = ""
          , n = 0;
        for (n = 0; n < t.length; n++) {
            var r = t.charAt(n)
              , o = this._cgStr.indexOf(r);
            -1 !== o && (e += o + "*")
        }
        return e
    }
};
var K = function(t) {
    if (Array.isArray(t))
        return t
}
  , J = function(t, e) {
    var n = []
      , r = !0
      , o = !1
      , i = void 0;
    try {
        for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value),
        !e || n.length !== e); r = !0)
            ;
    } catch (t) {
        o = !0,
        i = t
    } finally {
        try {
            r || null == u.return || u.return()
        } finally {
            if (o)
                throw i
        }
    }
    return n
}
  , Q = function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance")
}
  , Z = function(t, e) {
    return K(t) || J(t, e) || Q()
}
function mt(t, e) {
    for (var n, r = [], o = 0, i = "", a = 0; 256 > a; a++)
        r[a] = a;
    for (a = 0; 256 > a; a++)
        o = (o + r[a] + t.charCodeAt(a % t.length)) % 256,
        n = r[a],
        r[a] = r[o],
        r[o] = n;
    for (var u = o = a = 0; u < e.length; u++)
        o = (o + r[a = (a + 1) % 256]) % 256,
        n = r[a],
        r[a] = r[o],
        r[o] = n,
        i += String.fromCharCode(e.charCodeAt(u) ^ r[(r[a] + r[o]) % 256]);
    return i
}
var bt = mt("xm", "Ä[ÜJ=Û3Áf÷N")
              , wt = [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26],
_t = function(t) {
    var e = mt(function(t, e) {
        for (var n = [], r = 0; r < t.length; r++) {
            for (var o = "a" <= t[r] && "z" >= t[r] ? t[r].charCodeAt() - 97 : t[r].charCodeAt() - 48 + 26, i = 0; 36 > i; i++)
                if (e[i] == o) {
                    o = i;
                    break
                }
            n[r] = 25 < o ? String.fromCharCode(o - 26 + 48) : String.fromCharCode(o + 97)
        }
        return n.join("")
    }("d" + bt + "9", wt), function(t) {
        if (!t)
            return "";
        var e, n, r, o, i, a = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
        for (o = (t = t.toString()).length,
        r = 0,
        i = ""; r < o; ) {
            do {
                e = a[255 & t.charCodeAt(r++)]
            } while (r < o && -1 == e);if (-1 == e)
                break;
            do {
                n = a[255 & t.charCodeAt(r++)]
            } while (r < o && -1 == n);if (-1 == n)
                break;
            i += String.fromCharCode(e << 2 | (48 & n) >> 4);
            do {
                if (61 == (e = 255 & t.charCodeAt(r++)))
                    return i;
                e = a[e]
            } while (r < o && -1 == e);if (-1 == e)
                break;
            i += String.fromCharCode((15 & n) << 4 | (60 & e) >> 2);
            do {
                if (61 == (n = 255 & t.charCodeAt(r++)))
                    return i;
                n = a[n]
            } while (r < o && -1 == n);if (-1 == n)
                break;
            i += String.fromCharCode((3 & e) << 6 | n)
        }
        return i
    }(t)).split("-")
      , n = Z(e, 4)
      , r = n[0];
    return {
        sign: n[1],
        buy_key: r,
        token: n[2],
        timestamp: n[3]
    }
}

function stringfy(t) {
    var e = [];
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = encodeURIComponent(t[n])
              , o = encodeURIComponent(n);
            e.push("".concat(o, "=").concat(r))
        }
    return e.join("&")
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
            console.log('=============',i)
            const pagehtml = await util.loadPage(baseurl+i+'/')   
            // 加载HTML字符串
            const $ = cheerio.load(pagehtml)
            console.log('=============after load page')
            var ids = []
            var names = []
            $('li[class=_c2]').each(function(i, elem) {
                const a = $(this).children('.text').children()
                console.log(a.html())
                const id = a.attr('href').split('/')[3]
                const name = a.attr('title')
                ids.push(id)
                names.push(name)
                console.log(id)
                console.log(name)
                // console.log( $(this).children('.icon-wrapper').html())
               
            })
            // 从开始页的index开始下载
            let j = i === start ? index : 0
            for (; j< ids.length; j++) {
                const traceres = await axios.get(`https://www.ximalaya.com/revision/play/v1/audio?id=${ids[j]}&ptype=1`,{
                    // params: data,
                    headers: {'Cookie': cookie}//设置header信息
                  })
                console.log('traceres', ids[j],  traceres.data)
                const resourceRes = await axios.get(`https://mpay.ximalaya.com/mobile/track/pay/${traceres.data.data.trackId}?device=pc&isBackend=true&_=${new Date().getTime()}`,{
                    headers: {'Cookie': cookie}//设置header信息
                  })
                console.log('resourceRes', traceres.data.data.trackId, resourceRes.data)
                // var n = new gt(resourceRes.data.seed).cg_fun(resourceRes.data.fileId);
                // console.log(n)
                var t = resourceRes.data
                var d = getUri(t)
                console.log(d)
                // const res = await util.download( d, names[j]+'.m4a', function(){
                //     console.log(d+ names[j]+"下载成功");
                // });
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
        }
        console.log('Hello World');
    } catch(e) {
        console.log('===', e)
    }
}