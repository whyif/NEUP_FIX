const express=require('express')                        //使用前先npm install
const MongoClient = require('mongodb').MongoClient       //mongoclient用于与MongoDB数据库的客户端进行链接
const app=express();
const bodyParser = require('body-parser')

const mongo_url = 'mongodb://localhost:27017';
const dbname="myproject"                         //测试时使用myproject数据库，成型后使用neup_fix数据库

const client = new MongoClient(mongo_url);      //mongoclient（）创造了一个mongoclient实例，面向过程变成中不采用直接操作数据库，而是操作实例，从而间接操作数据库

//以下为框架
client.connect().then(()=>{
    const db=client.db(dbname)
    const user =db.collection('user')
    const list=db.collection('list')
    const mesg=db.collection('mesg')
    const announcement =db.collection('announcement')
    app.use(bodyParser.urlencoded({ extended: true})) 
    app.get('/home',function(req,res){          //主页,返回所有公告
        announcement.find({}).toArray().then((result)=>{
            if(result==null){
                res.status(404).end()
            }else{
                res.status(200).end()
            }
        })
    })
    
    app.post('/home/signin',function(req,res){     //登录界面
            user.findOne({username:req.body.username}).then((result) =>{     //暂时没有做get请求
                if(result===null){
                    res.sendStatus(405).end()
                }else {
                    if(result.password!=req.body.password){
                    res.sendStatus(400).end()
                    }else{
                    res.sendStatus(200).end()
                    }
                }
            })
    })
    
    app.post('/home/signup',function(req,res){    //注册界面                  
        user.findOne({username:req.body.username}).then((result)=>{
            if(result==null){
                user.insertOne({
                    username:req.body.username,
                    password:req.body.password,
                    /*truename:req.body.truename,
                    tel:req.body.tel,
                    qq:req.body.qq,
                    verfication:req.body.verfication*/
                },function(err){
                    if(err!=null){
                        res.status(400).end()
                    }else{
                        res.status(200).end()
                    }
                })
            }else{
                res.status(405).end()
            }
        })
    })
    
    app.put('/home/signup',function(req,res){    //修改个人信息

    })

    app.post('/home/apply',function(req,res){     //维修申请表                 
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
            },function(err){
                if (err!=null){res.sendStatus(400).end()}
                else{res.sendStatus(200).end()}
            })
    })
   
    app.get('/home/:applyid/apply',function(req,res){       //查看个人预约
            list.find({username:req.query.username}).toArray().then((result)=>{
                if(result==null){
                    res.status(400).end()
                }else{
                    let data ={
                        apply:{
                            device_type:result.apply.device_type,
                            device_model:result.apply.device_model,
                            time:result.apply.time,
                            description:result.apply.description,
                            contact:result.apply.contact,
                            connecttime:result.apply.connecttime,
                            site:result.apply.site
                        },
                        accept:{
                            applyid:result.accept.applyid,
                            status:result.accept.status,
                            description:result.accept.description,
                            member:result.accept.member,
                            confire_site:result.accept.confire_site,
                            comfire_time:result.accept.confire_time
                        }
                    }
                    res.json(data).status(200).end()
                }
            })        
    })
    
    app.put('/home/:applyid/apply',function(req,res){      //修改维修请求
        list.updateOne({applyid:req.params.accept.applyid},{$set:req.body},function(err,result){
            if(err==null){res.sendStatus(200).end()}
            else{res.sendStatus(405).end()}
        })
    })

    app.get('/home/:applyid/mesg',function(req,res){      //查看所有评价      ????????只能查找一个评价，如何查看所有评价??????
        mesg.find({applyid:req.query.applyid}).toArray().then((result)=>{
            if (result==null){
                res.status(400).end()
            }else{
                let data={
                    username:result.username,
                    content:result.username,
                    applyid:result.applyid,
                    time:result.time
                }
                res.json(data).status(200).end()
            }
        })
    })
    
    app.post('/home/:applyid/mesg',function(req,res){     //写评价
        mesg.insertOne({
            time:new Date(),
            username:"", //！！！！！！！！！！！后端自动记录，需要修改！！！！！！！！！  
            userid:"",
            content:req.query.content, 
            applyid:"",    //后端自动记录
            mesgid:""   
        },function(err){
            if(err!=null){res.status(405).end()}
            else{res.status(200).end()}
        })   
    })
    
    app.put('/home/:applyid/mesg',function(req,res){      //修改留言
        mesg.updateOne({mesgid:req.params.mesgid},{$set:req.body},function(err){
            if(err==null){res.sendStatus(200).end()}
            else{res.sendStatus(405).end()}
        })
    })

    app.delete('/home/:applyid/mesg',function(req,res){    //删除留言
        mesg.deleteOne({mesgid:req.params.mesgid},function(err){
            if(err==null){res.sendStatus(200).end()}
            else{res.sendStatus(405).end()}
        })
    })

    app.get('/administer',function(req,res){     //管理员主页
    })
    
    app.put('/administer/accept',function(req,res){    //接受请求，！！！！！建议将管理员主页换成/administer,考虑与前端商量！！！！！
        list.updateOne({applyid:req.params.accept.applyid},{status:"预约成功"},function(err){
            if (err==null){res.sendStatus(200).end()}
            else{res.sendStatus(405).end()}
        })             //!!!!!!!!!!!!可能存在隐形的问题，学习更新数据!!!!!!!!!!!!!!!!!!!!!!!
    })

    app.post('/home/announcement',function(req,res){     //发布公告
        announcement.insertOne({
            time:new Date(),
            text:req.query.text,
            publicid:req.query.publicid   //发布人
        },function(err){
            if (err!=null){
                res.sendStatus(405).end()
            }else{
                res.sendStatus(200).end()
            }
        })
    })
    
    app.get('/home/announcement',function(req,res){    //查看公告
        announcement.find({}).toArray().then((result)=>{
            if(result==null){
                res.status(404).end()
            }else{
                res.status(200).end()
            }
        })
    })

})

app.use(express.static('../www'))
app.listen(8080)                     
 //!!!!!!!考虑使用router进行优化!!!!!!!
 //!!!!!!!!学习数据安全性问题!!!!!!!!!
 //!!!!!!!搞懂api规范中鬼畜的url!!!!!!!