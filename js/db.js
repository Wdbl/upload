const mongodb = require("mongodb");//连接mogondb数据库
const url = "mongodb://localhost:27017";
const MongoClient = mongodb.MongoClient;//连接
const ObjectId = mongodb.ObjectId;
function Db(name){
	this.dbName = name;//保存连接数据库名称
	//连接数据库方法
	this.connect = function(fun){  
		
//		this=>实例
		MongoClient.connect(url,{ useNewUrlParser: true },(err,db)=>{
			if(err) throw err;
			let dbase = db.db(this.dbName)//数据库对象
			fun(dbase)
		})
	}
}

Db.prototype = {
	constructor:Db,
	/*
	 * api
	 * 插入一条数据s
	 * collection_name:集合名称，
	 * data:插入的数据对象
	 * backFn:完成插入后的回调函数
	 */
	insertOne(collection_name,data,backFn){
		this.connect((dbase)=>{
			dbase.collection(collection_name).insertOne(data,backFn)
		})
	},
	/*
	 * api
	 * 插入多条数据
	 * collection_name:集合名称，
	 * data:插入的数据数组型对象[{},{},{}]
	 * backFn:完成插入后的回调函数
	 */
	insertMany(collection_name,data,backFn){
		this.connect((dbase)=>{
			dbase.collection(collection_name).insertMany(data,backFn)
		})
	},
	//删除
	/*
	 * api
	 * 删除一条数据
	 * collection_name:集合名称，
	 * query:删除的筛选条件
	 * backFn:完成插入后的回调函数
	 */
	deleteOne(collection_name,query,backFn){
		this.connect((dbase)=>{
			dbase.collection(collection_name).deleteOne(query,backFn)
		})
	},
	/*
	 * api
	 * 删除多条数据
	 * collection_name:集合名称，
	 * query:删除的筛选条件
	 * backFn:完成插入后的回调函数
	 */
	deleteMany(collection_name,query,backFn){
		this.connect((dbase)=>{
			dbase.collection(collection_name).deleteMany(query,backFn)
		})
	},
	/*
	 * api
	 * 通过id删除数据
	 * collection_name:集合名称，
	 * id:删除的id
	 * backFn:完成插入后的回调函数
	 */
	deleteById(collection_name,id,backFn){
		console.log(Object(id))
		this.connect((dbase)=>{
			dbase.collection(collection_name).deleteOne({_id:ObjectId(id)},backFn)
		})
	},
	//改
	/*
	 * api
	 * 修改一条数据
	 * collection_name:集合名称，
	 * query:修改的筛选条件
	 * data:修改后的内容
	 * backFn:完成插入后的回调函数
	 */
	updateOne(collection_name,query,data,backFn){
		this.connect((dbase)=>{
			dbase.collection(collection_name)
			.updateOne(query,{$set:data},backFn)
		})
	},
	/*
	 * api
	 * 更改多条数据
	 * collection_name:集合名称，
	 * query:筛选条件
	 * data:修改的值
	 * backFn:完成插入后的回调函数
	 */
	updateMany(collection_name,query,data,backFn){
		this.connect((dbase)=>{
			dbase.collection(collection_name)
			.updateMany(query,{$set:data},backFn)
		})
	},
	/*
	 * api
	 * 通过id更改数据
	 * collection_name:集合名称，
	 * id:id
	 * data:修改的值
	 * backFn:完成插入后的回调函数
	 */
	updateById(collection_name,id,data,backFn){
		this.connect((dbase)=>{
			dbase.collection(collection_name)
			.updateOne({_id:ObjectId(id)},{$set:data},backFn)
		})
	},
	//查
	/*
	 * api
	 * 通过id查询数据
	 * collection_name:集合名称，
	 * id:id
	 * backFn:完成插入后的回调函数
	 */
	findById(collection_name,id,backFn){
		this.connect((dbase)=>{
			console.log(id);
			dbase.collection(collection_name)
			.find({_id:ObjectId(id)}).toArray(function(err,data){
				backFn(err,data[0])
			});
		})
	},
	//查
	/*
	 * api
	 * 通过查询数据
	 * collection_name:集合名称，
	 * obj
	 * 	{
	 * 		query:筛选条件
	 * 		limit:返回数据量
	 * 		skip:跳过数据量
	 * 	}
	 * backFn:完成插入后的回调函数
	 */
	find(collection_name,obj,backFn){
		obj.skip = obj.skip || 0;
		obj.limit = obj.limit || 0; //limit值为0是代表所有数据
		this.connect((dbase)=>{
			dbase.collection(collection_name)
			.find(obj.query)
			.skip(obj.skip)
			.limit(obj.limit)
			.toArray(backFn)
		})
	},
	//返回符合条件的数量   速度>find搜索速度
	/*
	 * api
	 * 返回符合条件的数据数量；
	 * collection_name:集合名词
	 * query:筛选条件
	 * backFn:回调函数
	 */
	count(collection_name,query,backFn){
		this.connect((dbase)=>{
			dbase.collection(collection_name)
			.count(query,backFn)
		})
	}
}

module.exports = Db;



