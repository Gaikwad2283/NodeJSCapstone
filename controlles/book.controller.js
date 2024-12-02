const bookModel = require("../models/Books");


module.exports.getBooks=async(req,res,next)=>{
    const allBooks=await bookModel.find({});
    res.status(200).json({allBooks});
}

module.exports.insertbook=async(req,res,next)=>{
    const{name,author,gener,isAvailable}=req.body;
    const book=new bookModel({
        "name":name,
        "author":author,
        "gener":gener,
        "isAvailable":isAvailable
    });
    await book.save();
    res.status(201).json({message:"book added successfully"});
}