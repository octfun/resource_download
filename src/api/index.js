import download from './download'
import test from './test'
import { Router } from 'express';
var router= new Router
 
router.use('/download', download)
 
router.use('/test', test)
 
router.use('/test2',  (req,res,next) => {
    res.send('xmla');
})
export default router