
import * as xmlaService from '../../service/ximalaya'

import * as ting22Service from '../../service/ting22'
import * as liulishuoService from '../../service/liulishuo'
import * as ishuyinService from '../../service/ishuyin'

var axios = require('axios')
export const ttfm = (req,res,next) => {
    res.send('ttfm' + req.query);
}


export const xmla = (req,res,next) => {
    console.log(req.query)
    const  {
        start = 1,
        end = 1,
        index = 0,
        name = '',
        baseurl = ''
    } = req.query
    xmlaService.start(parseInt(start),parseInt(end), parseInt(index), name, baseurl)
    console.log(start)
    res.send('xmla');
}

export const ting22 = (req,res,next) => {
    const  {
        start = 1,
        end = 1,
        index = 0,
        name = '黄金瞳',
        baseurl = ''
    } = req.query
    ting22Service.start(parseInt(start),parseInt(end), parseInt(index), name, baseurl)
    res.send('ting22');
}

export const liulishuo = (req,res,next) => {

    liulishuoService.start()
    res.send('ting22');
}

export const ishuyin = (req,res,next) => {
    const  {
        start = 1,
        end = 1,
        name = '簪中录'
    } = req.query
    ishuyinService.start(parseInt(start),parseInt(end),name)
    res.send('ishuyin: 簪中录 ');
}
