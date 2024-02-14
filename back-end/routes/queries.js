const express = require("express")
const router = express.Router();
const mongoose = require('mongoose');
router.use(express.json())

//DB Schema for connection 
const querySchema = new mongoose.Schema({
    companyname : String,
    companyType : String ,
    queryid : Number ,
    query:String ,
    studentemail:String,
    studentName:String
})



const Query = mongoose.model('Query',querySchema);




router.get("/",(req,res)=>{
    async function getNames(){
        const queirs =await Query
        .find()
        res.send(queirs)
 }       
      getNames()
})

//routing 
router.post("/",(req,res)=>{
    async function  getQuerie(){
    const query =new Query({
        studentName :req.body.studentName,
        studentemail:req.body.studentemail,
        companyname:req.body.companyname,
        companyType:req.body.companyType,
        queryid:req.body.queryid,
        query : req.body.query
    })
    console.log(query)
    const res = await query.save()
    
    }
    getQuerie()
})
//get all queires

router.get("/",(req,res)=>{
    async function getNames(){
        const queirs =await Query
        .find()
        res.send(queirs)
 }       
      getNames()
})


//get company types
router.get("/:companyType",(req,res)=>{
    async function getNames(){
        const queirs =await Query
        .find({companyType:req.params.companyType})
        res.send(queirs)
 }       
      getNames()
})


//get issues of custom companies of type 
router.get("/:companyType/:companyname/",(req,res)=>{
    async function getNames(){
        const queirs =await Query
        .find({companyType:req.params.companyType , companyname:req.params.companyname})
        res.send(queirs)
 }       
      getNames()
})

router.get("/:companyname/:queryid",(req,res)=>{
    async function getNames(){
        const queirs =await Query
        .find({ companyname:req.params.companyname , queryid:req.params.queryid})
        res.send(queirs)
 }       
      getNames()
})



router.get("/:companyType/:companyname/:queryid",(req,res)=>{
    async function getNames(){
        const queirs =await Query
        .find({companyType:req.params.companyType , companyname:req.params.companyname , queryid:req.params.queryid})
        .limit(10)
        .sort({studentName:1})
        .select({studentName:1})
        res.send(queirs)
 }       
      getNames()
})



module.exports = router