const express=require('express')                        //使用前先npm install
const MongoClient = require('mongodb').MongoClient       //mongoclient用于与MongoDB数据库的客户端进行链接
const app=express();

const mongo_url = 'mongodb://localhost:27017';
const dbname="myproject"                         //测试时使用myproject数据库，成型后使用neup_fix数据库

const client = new MongoClient(mongo_url);      //mongoclient（）创造了一个mongoclient实例，面向过程变成中不采用直接操作数据库，而是操作实例，从而间接操作数据库
client.connect(function(error){
    if(error!=null){
        console.log(error);
    }else{
        console.log("connnect with "+dbname+" successfully")
    }
    const db = client.db(dbname);                //db()创造了一个database实例

});

//以下为框架
app.get('/',function(req,res,next){          //主页
})

app.post('/signin',function(req,res,next){     //登录界面
})

app.post('/signup',function(req,res,next){    //注册界面
})

app.post('/list',function(req,res,next){     //维修申请表
})

app.get('/reservation',function(req,res,next){       //个人预约
})

app.get('/comment',function(req,res,next){      //查看评价
})

app.post('/comment_w',function(req,res,next){     //写评价
})

app.get('/administer',function(req,res,next){     //管理员主页
})

app.post('/administer',function(req,res,next){     //发布公告
})

app.get('/announcement',function(req,res,next){    //查看公告
})

app.use(express.static('../www'))
app.listen(8080)