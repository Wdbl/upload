const express=require("express");
const http=express();
const mongodb=require("mongodb");
const dbb=require("./js/db.js");
const MongoClient=mongodb.MongoClient;
const bodyParser=require("body-parser");
const postparse=bodyParser.urlencoded({extended:false});
const db= new dbb("bala")

http.listen(8080,()=>{
	console.log("run")
})

//跨域
http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	next()
})

//添加
http.post("/add",postparse,(req,res)=>{
	var data=req.body;
	console.log(data)
	db.insertOne("shopping",data,function(err){
		if(err) throw err
		res.send("添加成功")
	})
})

//渲染
http.get("/msg",(req,res)=>{
	db.find("shopping",{},function(err,data){
		if(err) throw err
		res.send(data)
	})
})

//删除
http.post("/del",postparse,(req,res)=>{
	var data=req.body.id;
	db.deleteById("shopping",data,function(err){
		if(err) throw err
		res.send("删除成功")
	})
})

//修改
http.post("/sure",postparse,(req,res)=>{
	var data=req.body;
	var id=req.body.id;
//	console.log(id)
	db.updateById("shopping",id,data,function(err){
		if(err) throw err
		res.send("修改成功")
	})
})




