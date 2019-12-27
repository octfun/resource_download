import {test} from './controller'
import { Router } from 'express';
var router= new Router();

router.get('/', test)

export default router