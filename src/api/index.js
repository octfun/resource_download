import download from './download'
import test from './test'
import { Router } from 'express';
var router= new Router
 
router.use('/download', download)
 
router.use('/test', test)
 
export default router