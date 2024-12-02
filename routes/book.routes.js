const express=require('express');
const router=express.Router();
const bookController=require('../controlles/book.controller');

router.get('/allbooks',bookController.getBooks);
router.post('/insertbook',bookController.getBooks);

module.exports=router;