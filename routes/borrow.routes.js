const express=require('express');
const router=express.Router();
const borrowController=require('../controlles/borrow.controller');

router.post("/borrowbook",borrowController.borrowbooks);
router.post("/returnbook",borrowController.returnBook);
router.post("/updatebook",borrowController.updateBook);

module.exports=router;