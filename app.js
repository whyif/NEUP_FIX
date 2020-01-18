const express=require('express')                        //使用前先npm install
const MongoClient = require('mongodb').MongoClient       //mongoclient用于与MongoDB数据库的客户端进行链接
const assert = require('assert');
const app=express();

const mongo_url = 'mongodb://localhost:27017';
const dbname="myproject"                         //测试时使用myproject数据库，成型后使用neup_fix数据库

const client = new MongoClient(mongo_url);      //mongoclient（）创造了一个mongoclient实例，面向过程变成中不采用直接操作数据库，而是操作实例，从而间接操作数据库

//以下为框架
app.get('/',function(req,res,next){          //主页

})

app.post('/signin',function(req,res,next){     //登录界面
    client.connect().then(() =>{
        const db = client.db(dbname);                       //？？？？？？？能否不用每次连接数据？？？？？？？
        const user=db.collection('user')
        user.findOne({username:req.query.username}).then((result) =>{
            if(result===null||result.password!=req.query.password){
                res.send('错误的用户名或密码')//转到主页
            }else{
                res.send('登陆成功')
            }
        })
    })
})

app.post('/signup',function(req,res,next){    //注册界面
    client.connect().then(() =>{
        const db = client.db(dbname);                   
        const user=db.collection('user')
        user.find({username:req.query.username}).then((result)=>{
            if(result!=null){
                res.send('该用户名已被占用')
            } else{
                user.insertOne({
                    username:req.query.username,
                    password:req.query.username,
                    tel:req.query.tel,
                    qq:req.query.qq
                })
                res.send('注册成功')
            }
        })
    })
})

app.post('/list',function(req,res,next){     //维修申请表
    client.connect().then(() =>{
        const db = client.db(dbname);                   
        const list=db.collection('list')
        list.insertOne({
            username:"",    //？？？？？？？？？？？？？？从登录信息直接导入？？？？？？？？？？？？
            name:req.query.name,
            device:req.query.device,
            type:req.query.type,
            problem:req.query.problem,
            time_fix:req.query.time_fix,
            time_contact:req.query.time_contact,
            time:new Date(),
            place:req.query.place
        })
    res.send('预约成功')
})

app.get('/reservation',function(req,res,next){       //查看个人预约
    client.connect().then(()=>{
        const db=client.db(dbname)
        const list=db.collection('list')
        return(list.find({username:req.query.username}))            //！！！！！！！！！！！所有都要修改,不确定是否用return！！！！！！！！！！！！
    })
})

app.get('/comment',function(req,res,next){      //查看所有评价
    client.connect().then(()=>{
        const db=client.db(dbname)
        const comment=db.collection('comment')
        return(comment.find())
})

app.post('/comment_w',function(req,res,next){     //写评价
    client.connect().then(()=>{
        const db=client.db(dbname)
        const comment=db.collection('comment')
        comment.insertOne({
            time:new Date(),
            username:"", //！！！！！！！！！！！后端自动记录，需要修改！！！！！！！！！  
            text:req.query.text     
    })
    res.send('插入成功')    //！！！！！！！！！！返回主页所有res.send()都要修改!!!!!!!!!!!!!!!!!!
 })

app.get('/administer',function(req,res,next){     //管理员主页
})

app.post('/administer',function(req,res,next){     //发布公告
    client.connect().then(()=>{
        const db =client.db(dbname)
        const announcement =db.collection('announcement')
        announcement.insertOne({
            time:new Date(),
            text:req.query.text
        })
    })
    res.send('发布公告成功')
})

app.get('/announcement',function(req,res,next){    //查看公告
    client.connect().then(()=>{
        const db=client.db(dbname)
        const announcement=db.collection('announcement')
        return(announcement.find())
    })
})

app.use(express.static('../www'))
app.listen(8080)