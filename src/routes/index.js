import * as ttfm from '../service/tiantingfm'
import * as xmla from '../service/ximalaya'
import * as liulishuo from '../service/liulishuo'

var express=require('express');
var router=express.Router();
 
router.use('/ttfm',ttfm);//   /login 映射到login这个路由
router.use('/xmla',xmla);//   /product  映射到product这个路由
router.use('/liulishuo',liulishuo);
//如果login  product user  不存在，则会走下面这个
router.use("/",function(req,res){
    res.send("admin/")
})

module.exports =router;


