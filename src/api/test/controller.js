
import * as util from '../../common/util'

export const test = (req,res,next) => {
    util.appendFile('D://Node//ximalaya//error//error//', 'error.log', '123')
    res.send('xmla');
}