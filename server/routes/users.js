const router = require('koa-router')();
const Message = require('../models/Message')
const User = require('../models/User')
const Admin = require('../models/Admin')
const House = require('../models/House')
const createToken = require('../api/createToken');

/*
@route GET /users/login
@desc 登录接口
@access 接口是公开的
*/
router.post('/login', async(ctx) => {
    let role = ctx.request.body.role
    let name = ctx.request.body.name
    let password = ctx.request.body.password

    let doc = await Admin.findOne({ name: name })
    if (doc) {
        if (doc.role == role) {
            if (doc.password == password) {
                let token = createToken(doc._id);
                ctx.body = {
                        login: 'success',
                        token
                    }
                    //生成一个新的token,并存到数据库

            } else {
                ctx.body = {
                    login: 'password'
                }
            }
        } else {
            ctx.body = {
                login: 'role'
            }
        }

    } else {
        ctx.body = {
            login: 'name'
        }
    }
})

/*
@route GET /users/newMessage
@desc 新建消息接口
@access 接口是公开的
*/
router.get('/newMessage', async(ctx) => {
    user_id = ctx.request.query.userId
    let message = new Message({
        message_header: ctx.request.query.messageHeader,
        message_content: ctx.request.query.messageContent,
        user_id: user_id,
        message_jump: ctx.request.query.messageJump,
        message_type: ctx.request.query.messageType,
    });
    await message.save().then(doc => {
        ctx.status = 200
        ctx.body = {
            doc
        }
    }).catch(error => console.log(error))
})

/*
@route GET /users/userCheck
@desc 查看用户信息接口
@access 接口是公开的
*/
router.get('/userCheck', async(ctx) => {
    user_id = ctx.request.query.userId
    await User.findOne({ _id: user_id }).then(docs => {
        ctx.status = 200
        ctx.body = {
            userInfo: docs
        }
    })
})

/*
@route GET /users/getUserList
@desc 获取用户列表接口
@access 接口是公开的
*/
router.get('/getUserList', async(ctx) => {
    let pageNumber = ctx.request.query.pageNumber
    let userList = []
    await User.find().then(docs => {
        userList = docs
    })
    let totalCount = userList.length //总数据条数
    let pageSize = 20 //单页数据量
    userList = userList.slice(pageNumber * pageSize - pageSize, pageNumber * pageSize)
    let totalPage = Math.ceil(totalCount / pageSize) //总页数
    ctx.status = 200
    ctx.body = {
        userList,
        totalCount,
        pageSize,
        totalPage
    }
})

/*
@route GET /users/checkPublish
@desc 查看用户发布的房源接口
@access 接口是公开的
*/
router.get('/checkPublish', async(ctx) => {
    let user_id = ctx.request.query.userId
    await House.find({ user_id: user_id }, { house_number: 1, community_name: 1 }).sort({ update_time: -1 }).then(docs => {
        ctx.body = {
            userPublishList: docs
        }
    })
})


module.exports = router.routes()