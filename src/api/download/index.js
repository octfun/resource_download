import {xmla, ttfm, ting22} from './controller'
import { Router } from 'express';
var router= new Router();
 
router.get('/ttfm', ttfm)

router.get('/xmla', xmla)

router.get('/ting22', ting22)

export default router