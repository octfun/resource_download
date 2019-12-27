import {xmla, ttfm} from './controller'
import { Router } from 'express';
var router= new Router();
 
router.get('/ttfm', ttfm)

router.get('/xmla', xmla)

export default router