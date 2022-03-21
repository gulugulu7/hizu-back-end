const router = require('koa-router')();
const Promotion = require('../models/Promotion')
const moment = require('moment')
const User = require('../models/User')
const House = require('../models/House')

/*
@route GET /promotions/getPromotionList
@desc 获取推广列表接口
@access 接口是公开的
*/
router.get('/getPromotionList', async(ctx) => {
    let pageNumber = ctx.request.query.pageNumber
    let promotionList = []
    await Promotion.find().then(docs => {
        promotionList = docs
    })
    let totalCount = promotionList.length //总数据条数
    let pageSize = 20 //单页数据量
    promotionList = promotionList.slice(pageNumber * pageSize - pageSize, pageNumber * pageSize)
    let totalPage = Math.ceil(totalCount / pageSize) //总页数
    ctx.status = 200
    ctx.body = {
        promotionList,
        totalCount,
        pageSize,
        totalPage
    }
})

/*
@route GET /promotions/modifyPromotion
@desc 修改推广接口
@access 接口是公开的
*/
router.get('/modifyPromotion', async(ctx) => {
    let promotionList = ""
    let truePromotionList = []
    let falsePromotionList = []
    await Promotion.find().populate({ path: 'house_id', select: 'house_number' }).then(docs => {
        promotionList = docs
    })
    for (var i = 0; i < promotionList.length; i++) {
        await House.findOne({ _id: promotionList[i].house_id }).then(doc => {
            if (doc.promotion != 'true') {
                if (moment().isBetween(promotionList[i].start_time, promotionList[i].end_time) == true && promotionList[i].refund != 'true') {
                    House.updateOne({ _id: promotionList[i].house_id }, { promotion: 'true' }).then(doc => {
                        truePromotionList.push(promotionList[i])
                    })
                }
            } else if (doc.promotion == 'true') {
                if (moment().isBetween(promotionList[i].start_time, promotionList[i].end_time) == false) {
                    House.updateOne({ _id: promotionList[i].house_id }, { promotion: 'false' }).then(doc => {
                        falsePromotionList.push(promotionList[i])
                    })

                }
            }
        })
    }
    ctx.status = 200
    ctx.body = {
        truePromotionList,
        falsePromotionList
    }
})


module.exports = router.routes()