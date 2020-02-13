
import * as xmlaService from '../../service/ximalaya'

import * as ting22Service from '../../service/ting22'
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
    ting22Service.start(1, 1, 0, 1, '')
    res.send('ting22');
}
