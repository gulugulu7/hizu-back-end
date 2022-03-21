const router = require('koa-router')();
const Appointment = require('../models/Appointment')
const User = require('../models/User')
const Comment = require('../models/Comment');
const moment = require('moment')

/*
@route GET /appointments/getAppointmentList
@desc 获取预约列表接口
@access 接口是公开的
*/
router.get('/getAppointmentList', async(ctx) => {
    let pageNumber = ctx.request.query.pageNumber
    let appointmentList = []
    await Appointment.find().sort({ appointment_date: -1 }).then(docs => {
        appointmentList = docs
    })
    let totalCount = appointmentList.length //总数据条数
    let pageSize = 20 //单页数据量
    appointmentList = appointmentList.slice(pageNumber * pageSize - pageSize, pageNumber * pageSize)
    let totalPage = Math.ceil(totalCount / pageSize) //总页数
    ctx.status = 200
    ctx.body = {
        appointmentList,
        totalCount,
        pageSize,
        totalPage
    }
})

/*
@route GET /appointments/noticeAppointment
@desc 通知预约接口
@access 接口是公开的
*/
router.get('/noticeAppointment', async(ctx) => {
    let appointmentList = ""
    let noticeList = []
    await Appointment.find({ house_owner_confirm: true, appointment_user_confirm: true }).populate({ path: 'house_id', select: 'house_number' }).then(docs => {
        appointmentList = docs
    })
    for (var i = 0; i < appointmentList.length; i++) {
        if (moment().add(1, 'd').isSame(appointmentList[i].appointment_date, 'day')) {
            noticeList.push(appointmentList[i])
        }
    }
    ctx.status = 200
    ctx.body = {
        noticeList
    }
})

/*
@route GET /appointments/noticeComment
@desc 通知评论接口
@access 接口是公开的
*/
router.get('/noticeComment', async(ctx) => {
    let commentList = ""
    let noticeList = []
    await Appointment.find({ house_owner_confirm: true, appointment_user_confirm: true }).populate({ path: 'house_id', select: 'house_number' }).then(docs => {
        commentList = docs
    })
    for (var i = 0; i < commentList.length; i++) {
        if (moment().subtract(1, 'd').isSame(commentList[i].appointment_date, 'day') && commentList[i].comment == false) {
            noticeList.push(commentList[i])
        }
    }
    ctx.status = 200
    ctx.body = {
        noticeList
    }
})

/*
@route GET /appointments/checkComment
@desc aid取消预约接口
@access 接口是公开的
*/
router.get('/checkComment', async(ctx) => {
    let appointment_id = ctx.request.query.appointmentId
    await Comment.findOne({ appointment_id: appointment_id }).then(docs => {
        ctx.status = 200
        ctx.body = {
            commentResult: docs
        }
    })
})

module.exports = router.routes()