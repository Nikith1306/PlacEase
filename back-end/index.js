const express = require('express');


const app=express();

const queries = require("./routes/queries")

const mongoose = require("mongoose");

const cors = require('cors')
app.use(cors())

//db connection
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>console.log("CONNECTED TO DB"))
.catch((err)=>console.log(err))


//
//  const querySchema = new mongoose.Schema({
//     companyname : String,
//     companyType : String ,
//     queryid : Number ,
//     query:String ,
//     studentName:String
// })


//  const Query = mongoose.model('Query',querySchema);
// app.get("/",(req,res)=>{
//     async function getNames(){
//         const queirs =await Query
//         .find()
//         res.send(queirs)
//  }       
//       getNames()
// })




//using Routes
app.use("/Allqueries",queries)

app.use("/addquery",queries)

app.use("/getQueries",queries)

app.use("/getQueries/names",queries)


app.listen(3000,()=>{
    console.log("3000")
})




