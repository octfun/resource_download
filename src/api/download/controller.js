
import * as xmlaService from '../../service/ximalaya'
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