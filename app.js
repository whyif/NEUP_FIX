const express=require('express')                        //使用前先npm install
const MongoClient = require('mongodb').MongoClient       //mongoclient用于与MongoDB数据库的客户端进行链接
const assert = require('assert');
const app=express();

const mongo_url = 'mongodb://localhost:27017';
const dbname="myproject"                         //测试时使用myproject数据库，成型后使用neup_fix数据库

const client = new MongoClient(mongo_url);      //mongoclient（）创造了一个mongoclient实例，面向过程变成中不采用直接操作数据库，而是操作实例，从而间接操作数据库

//以下为框架
client.connect().then(()=>{
    const db=client.db(dbname)
    const user =db.collection('user')
    const list=db.collection('list')
    const comment=db.collection('comment')
    const announcement =db.collection('announcement')
    app.get('/home',function(req,res,next){          //主页

    })
    
    app.post('/signin',function(req,res,next){     //登录界面
            user.findOne({username:req.query.username}).then((result) =>{     //暂时没有做get请求
                if(result===null){
                    res.sendStatus(405).end()
                }else if(result.password!=req.query.password){
                    res.sendStatus(400).end()
                }else{
                    res.sendStatus(200).end()
                }
            })
            next();
    })
    
    app.post('/signup',function(req,res,next){    //注册界面                  
            user.find({username:req.query.username}).then((result)=>{
                if(result!=null){
                    res.sendStatus(405).end()
                } else{
                    user.insertOne({
                        username:req.query.username,
                        password:req.query.password,
                        tel:req.query.tel,
                        qq:req.query.qq
                    },function(err,res){
                        if(err!=null)
                        res.sendStatus(400).end()
                        else
                        res.sendStatus(200).end()
                    })
                }
            })
            next();
    })
    
    app.post('/apply',function(req,res,next){     //维修申请表                 
            list.insertOne({
                username:"",    //？？？？？？？？？？？？？？从登录信息直接导入？？？？？？？？？？？？,便于查找
                apply:{
                    device_type:req.query.device_type,
                    device_model:req.query.device_model,
                    description:req.query.description,
                    contact:req.querycontact,
                    time:new Date(),
                    connecttime:req.query.connecttime,
                    site:req.query.site
                },
                accept:{
                    applyid:"",        //系统自动分配唯一申请id
                    status:"预约成功",
                    description:req.query.description,
                    menber:"",
                    confire_site:"",
                    comfire_time:""
                }
            },function(err,res){
                if (err!=null)
                res.sendStatus(400).end()
                else
                res.sendStatus(200).end()
            })
        next();
    })
   
    app.get('/apply',function(req,res,next){       //查看个人预约
            var object=list.find({username:req.query.username}).then(()=>{
                if(object==null){
                    res.sendStatus(400).end()
                }else{
                    let data ={
                        apply:{
                            device_type:object.apply.device_type,
                            device_model:object.apply.device_model,
                            time:object.apply.time,
                            description:object.apply.description,
                            contact:object.apply.contact,
                            connecttime:object.apply.connecttime,
                            site:object.apply.site
                        },
                        accept:{
                            applyid:object.accept.applyid,
                            status:object.accept.status,
                            description:object.accept.description,
                            member:object.accept.member,
                            confire_site:object.accept.confire_site,
                            comfire_time:object.accept.confire_time
                        }
                    }
                    res.json(data).sendStatus(200).end()
                }
            })        
            next();
    })
    
    app.put('/apply',function(req,res,next){      //修改维修请求

    })

    app.get('/comment',function(req,res,next){      //查看所有评价
            comment.find()
            next();
    })
    
    app.post('/comment_w',function(req,res,next){     //写评价
        comment.insertOne({
            time:new Date(),
            username:"", //！！！！！！！！！！！后端自动记录，需要修改！！！！！！！！！  
            text:req.query.text  
        })   
        res.send('插入成功')    //！！！！！！！！！！返回主页所有res.send()都要修改!!!!!!!!!!!!!!!!!!
        next();
    })
    
    app.get('/administer',function(req,res,next){     //管理员主页
        next();
    })
    
    app.post('/administer',function(req,res,next){     //发布公告
        announcement.insertOne({
            time:new Date(),
            text:req.query.text
        })
        res.send('发布公告成功')
        next();
    })
    
    app.get('/announcement',function(req,res,next){    //查看公告
        announcement.find()
        next();
    })

})

app.use(express.static('../www'))
app.listen(8080)