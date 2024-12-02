const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const mongoose = require("mongoose");
const dbUrl=process.env.dbURL
const app=express();
const userRoute=require('./routes/user.routes');
const bookRoute=require('./routes/book.routes');
const borrowRoute = require('./routes/borrow.routes');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

main().then(()=>{
    console.log("connect to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

app.use('/users',userRoute);
app.use('/books',bookRoute);
app.use('/borrow',borrowRoute);











app.listen(3000,()=>{
    console.log("server is listening to port 3000");
});

