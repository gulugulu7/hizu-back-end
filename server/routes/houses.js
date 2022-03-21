const router = require('koa-router')();
const House = require('../models/House')
const User = require('../models/User')
const Promotion = require('../models/Promotion')
const AuditFailed = require('../models/AuditFailed')
const Report = require('../models/Report')
const AlipaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const request = require('request')
const SystemCount = require('../models/SystemCount')
const District = require('../models/District')

/*
@route GET /citys/getHouse
@desc 获取房屋列表接口
@access 接口是公开的
*/
router.get('/getHouseList', async(ctx) => {
    let pageNumber = ctx.request.query.pageNumber
    let city = ctx.request.query.city
    let aindex = ctx.request.query.aindex
    let bindex = ctx.request.query.bindex
    let cindex = ctx.request.query.cindex
    let dindex = ctx.request.query.dindex
    let eindex = ctx.request.query.eindex
    let findex = ctx.request.query.findex
    let houseListAll = ''
    let houseList = ''
    await House.find().populate({ path: 'sq_value', populate: { path: 'district_id', populate: { path: 'city_id' } } }).populate({ path: 'subway_station_value', populate: { path: 'subwayLine_id' } }).populate({ path: "user_id" }).sort({ update_time: -1 }).then(docs => {
        houseListAll = docs
    })
    if (city != '') {
        for (i = 0; i < houseListAll.length; i++) {
            if (houseListAll[i].sq_value.district_id.city_id.city_number != city) {
                houseListAll.splice(i, 1)
                i = i - 1
            }
        }
    }
    if (aindex != '') {
        for (i = 0; i < houseListAll.length; i++) {
            if (houseListAll[i].sq_value.district_id.district_number != aindex) {
                houseListAll.splice(i, 1)
                i = i - 1
            }
        }
    }
    if (bindex != '') {
        for (i = 0; i < houseListAll.length; i++) {
            if (houseListAll[i].rental_mode != bindex) {
                houseListAll.splice(i, 1)
                i = i - 1
            }
        }
    }
    if (cindex != '') {
        for (i = 0; i < houseListAll.length; i++) {
            if (houseListAll[i].housing_type != cindex) {
                houseListAll.splice(i, 1)
                i = i - 1
            }
        }
    }
    if (dindex != '') {
        for (i = 0; i < houseListAll.length; i++) {
            if (houseListAll[i].house_orientation != dindex) {
                houseListAll.splice(i, 1)
                i = i - 1
            }
        }
    }
    if (eindex != '') {
        for (i = 0; i < houseListAll.length; i++) {
            if (houseListAll[i].payment_method != eindex) {
                houseListAll.splice(i, 1)
                i = i - 1
            }
        }
    }
    if (findex != '') {
        for (i = 0; i < houseListAll.length; i++) {
            if (houseListAll[i].house_state != findex) {
                houseListAll.splice(i, 1)
                i = i - 1
            }
        }
    }
    let totalCount = houseListAll.length //总数据条数
    let pageSize = 20 //单页数据量
    houseListAll = houseListAll.slice(pageNumber * pageSize - pageSize, pageNumber * pageSize)
    let totalPage = Math.ceil(totalCount / pageSize) //总页数
    ctx.status = 200
    ctx.body = { houseListAll, totalCount, pageSize, totalPage }
})

/*
@route GET /houses/getHouseDetail
@desc 获取房屋详情接口
@access 接口是公开的
*/
router.get('/getHouseDetail', async(ctx) => {
    let house_id = ctx.request.query.house_id
    await House.find({ _id: house_id }).populate({ path: 'sq_value', populate: { path: 'district_id' } }).populate({ path: 'subway_station_value', populate: { path: 'subwayLine_id' } }).then(docs => {
        var houseDetail = docs
        ctx.body = { houseDetail }
    }).catch(error => {
        console.log(error)
    })
})

/*
@route GET /houses/getPromotion
@desc 获取推广情况接口
@access 接口是公开的
*/
router.get('/getPromotion', async(ctx) => {
    let house_id = ctx.request.query.house_id
    let house_promotion = ''
    await House.findOne({ _id: house_id }, { promotion: 1 }).then(doc => {
        house_promotion = doc.promotion
    })
    if (house_promotion == 'true' || house_promotion == 'wait') {
        await Promotion.findOne({ house_id: house_id }).then(doc => {
            ctx.status = 200;
            ctx.body = {
                'nowPromotion': doc
            }
        })
    }
})

/*
@route GET /houses/checkFailedReason
@desc 查看不通过原因接口
@access 接口是公开的
*/
router.get('/checkFailedReason', async(ctx) => {
    let house_id = ctx.request.query.houseId
    await AuditFailed.findOne({ house_id: house_id }).then(docs => {
        ctx.status = 200
        ctx.body = {
            reason: docs
        }
    })
})

/*
@route GET /houses/getReportList
@desc 查看举报列表接口
@access 接口是公开的
*/
router.get('/getReportList', async(ctx) => {
    let pageNumber = ctx.request.query.pageNumber
    let reportList = []
    await Report.find().then(docs => {
        reportList = docs
    })
    let totalCount = reportList.length //总数据条数
    let pageSize = 20 //单页数据量
    reportList = reportList.slice(pageNumber * pageSize - pageSize, pageNumber * pageSize)
    let totalPage = Math.ceil(totalCount / pageSize) //总页数
    ctx.status = 200
    ctx.body = {
        reportList,
        totalCount,
        pageSize,
        totalPage
    }
})

/*
@route GET /houses/handleReport
@desc 查看举报列表接口
@access 接口是公开的
*/
router.get('/handleReport', async(ctx) => {
    let reportResult = ctx.request.query.reportResult
    let report_id = ctx.request.query.reportId
    if (reportResult == 2) {
        await Report.updateOne({ _id: report_id }, { handle: 2 })
    } else if (reportResult == 3) {
        await Report.updateOne({ _id: report_id }, { handle: 3 })
    }
    ctx.status = 200
    ctx.body = {
        success: 'true'
    }
})

/*
@route GET /houses/getRefundAmount
@desc 获取退款金额接口
@access 接口是公开的
*/
router.get('/getRefundAmount', async(ctx) => {
    let promotion_id = ctx.request.query.promotionId
    let findPromotion = await Promotion.findOne({ _id: promotion_id })
    let refundAmount = ''
    if (moment().isBetween(findPromotion.start_time, findPromotion.end_time) == false) {
        refundAmount = findPromotion.promotion_price
    } else {
        refundAmount = moment(findPromotion.end_time).diff(moment(), 'days') * 3
    }
    ctx.status = 200
    ctx.body = {
        refundAmount
    }
})


/*
@route GET /houses/refund
@desc 退款接口
@access 接口是公开的
*/
router.get('/toRefund', async(ctx) => {
    let promotion_id = ctx.request.query.promotionId
    let findPromotion = await Promotion.findOne({ _id: promotion_id })
    let refundAmount = ''
    if (moment().isBetween(findPromotion.start_time, findPromotion.end_time) == false) {
        refundAmount = findPromotion.promotion_price
    } else {
        refundAmount = moment(findPromotion.end_time).diff(moment(), 'days') * 3
    }
    await Promotion.updateOne({ _id: promotion_id }, { refund: 'true' })
    await House.updateOne({ _id: findPromotion.house_id }, { promotion: 'false' })
    const alipaySdk = new AlipaySdk({
        appId: '2016102100730562',
        privateKey: fs.readFileSync(path.join(__dirname, '../config/pem/private_key.pem'), 'ascii'),
        alipayPublicKey: fs.readFileSync(path.join(__dirname, '../config/pem/alipay_public_key.pem'), 'ascii'),
        gateway: 'https://openapi.alipaydev.com/gateway.do'
    });
    const formData = new AlipayFormData();

    formData.setMethod('get')
    formData.addField('appId', '2016102100730562')
    formData.addField('bizContent', {
        outTradeNo: findPromotion.trade_no,
        outRequestNo: 'HZ01RF001',
        refundAmount: refundAmount
    });
    await alipaySdk.exec(
        'alipay.trade.refund', {}, { formData: formData },
    ).then(result => {
        if (result) {
            return new Promise((resolve, reject) => {
                request(result, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let obj = JSON.parse(body)
                        resolve(obj)
                    } else {
                        reject(error)
                    }
                })
            }).then(response => {
                ctx.status = 200
                ctx.body = {
                    success: 'true'
                }
            })
        }
    })
})

/*
@route GET /houses/systemCount
@desc 当天系统计数接口
@access 接口是公开的
*/
router.get('/systemCount', async(ctx) => {
    let date = moment().format('YYYY-MM-DD')
    async function systemCountFun(model, classification) {
        let classList = await SystemCount.find({ classification: classification })
        let beforeClassNumber = new Number
        let addClassNumber = new Number
        let allClassNumber = await model.find().countDocuments()
        if (classList.length == 0) {
            let saveClass = new SystemCount({
                date: date,
                number: allClassNumber,
                classification: classification
            })
            await saveClass.save()
        } else {
            let today = await SystemCount.findOne({ date: date })
            if (today) {
                for (let i = 0; i < classList.length - 1; i++) {
                    beforeClassNumber = beforeClassNumber + classList[i].number
                }
                addClassNumber = allClassNumber - beforeClassNumber
                await SystemCount.updateOne({ date: date, classification: classification }, { number: addClassNumber })
            } else {
                for (let i = 0; i < classList.length; i++) {
                    beforeClassNumber = beforeClassNumber + classList[i].number
                }
                let saveClass = new SystemCount({
                    date: date,
                    number: allClassNumber - beforeClassNumber,
                    classification: classification
                })
                await saveClass.save()
            }
        }
    }
    systemCountFun(House, 'houseAdd')
    systemCountFun(Promotion, 'promotionAdd')
    systemCountFun(User, 'userAdd')

    ctx.status = 200
})

/*
@route GET /houses/selectDate
@desc 选择日期接口
@access 接口是公开的
*/
router.get('/selectDate', async(ctx) => {
    var date = ctx.request.query.date
    await SystemCount.find({ date: date }).then(docs => {
        ctx.body = {
            docs
        }
    })
})

/*
@route GET /houses/cityHouseNumber
@desc 城市房源比例房源接口
@access 接口是公开的
*/
router.get('/cityHouseNumber', async(ctx) => {
    var list1 = await House.find({ house_state: 1 })
    var list2 = await House.find({ house_state: 2 })
    var list3 = await House.find({ house_state: 3 })
    var list4 = await House.find({ house_state: 4 })

    function filterCity(array, citynumber) {
        return array.filter(item => item.house_number.substring(0, 2) === citynumber).length
    }
    var bjnumber1 = filterCity(list1, 'BJ')
    var shnumber1 = filterCity(list1, 'SH')
    var gznumber1 = filterCity(list1, 'GZ')
    var sznumber1 = filterCity(list1, 'SZ')
    var hznumber1 = filterCity(list1, 'HZ')
    var njnumber1 = filterCity(list1, 'NJ')
    var whnumber1 = filterCity(list1, 'WH')
    var cdnumber1 = filterCity(list1, 'CD')
    var tjnumber1 = filterCity(list1, 'TJ')
    var bjnumber2 = filterCity(list2, 'BJ')
    var shnumber2 = filterCity(list2, 'SH')
    var gznumber2 = filterCity(list2, 'GZ')
    var sznumber2 = filterCity(list2, 'SZ')
    var hznumber2 = filterCity(list2, 'HZ')
    var njnumber2 = filterCity(list2, 'NJ')
    var whnumber2 = filterCity(list2, 'WH')
    var cdnumber2 = filterCity(list2, 'CD')
    var tjnumber2 = filterCity(list2, 'TJ')
    var bjnumber3 = filterCity(list3, 'BJ')
    var shnumber3 = filterCity(list3, 'SH')
    var gznumber3 = filterCity(list3, 'GZ')
    var sznumber3 = filterCity(list3, 'SZ')
    var hznumber3 = filterCity(list3, 'HZ')
    var njnumber3 = filterCity(list3, 'NJ')
    var whnumber3 = filterCity(list3, 'WH')
    var cdnumber3 = filterCity(list3, 'CD')
    var tjnumber3 = filterCity(list3, 'TJ')
    var bjnumber4 = filterCity(list4, 'BJ')
    var shnumber4 = filterCity(list4, 'SH')
    var gznumber4 = filterCity(list4, 'GZ')
    var sznumber4 = filterCity(list4, 'SZ')
    var hznumber4 = filterCity(list4, 'HZ')
    var njnumber4 = filterCity(list4, 'NJ')
    var whnumber4 = filterCity(list4, 'WH')
    var cdnumber4 = filterCity(list4, 'CD')
    var tjnumber4 = filterCity(list4, 'TJ')
    bjnumberlist = ['北京', bjnumber1, bjnumber2, bjnumber3, bjnumber4]
    shnumberlist = ['上海', shnumber1, shnumber2, shnumber3, shnumber4]
    gznumberlist = ['广州', gznumber1, gznumber2, gznumber3, gznumber4]
    sznumberlist = ['深圳', sznumber1, sznumber2, sznumber3, sznumber4]
    hznumberlist = ['杭州', hznumber1, hznumber2, hznumber3, hznumber4]
    njnumberlist = ['南京', njnumber1, njnumber2, njnumber3, njnumber4]
    whnumberlist = ['武汉', whnumber1, whnumber2, whnumber3, whnumber4]
    cdnumberlist = ['成都', cdnumber1, cdnumber2, cdnumber3, cdnumber4]
    tjnumberlist = ['天津', tjnumber1, tjnumber2, tjnumber3, tjnumber4]

    ctx.body = {
        bjnumberlist,
        shnumberlist,
        gznumberlist,
        sznumberlist,
        hznumberlist,
        njnumberlist,
        whnumberlist,
        cdnumberlist,
        tjnumberlist
    }
})

/*
@route GET /houses/districtHouseNumber
@desc 行政区显示中房源接口
@access 接口是公开的
*/
router.get('/districtHouseNumber', async(ctx) => {
    let city = ctx.request.query.city
    let districtList = ""
    var districtHouseNumber = []
    await District.find().populate({ path: 'city_id', match: { city_number: city } })
        .then(docs => {
            districtList = docs
        }).catch(error => {
            console.log(error)
        });
    for (i = 0; i < districtList.length; i++) {
        if (districtList[i].city_id == null) {
            districtList.splice(i, 1)
            i = i - 1
        }
    }
    let list1 = await House.find({ house_state: 1 }).populate({ path: 'sq_value', populate: { path: 'district_id', populate: { path: 'city_id' } } })
    for (i = 0; i < list1.length; i++) {
        if (list1[i].sq_value.district_id.city_id.city_number != city) {
            list1.splice(i, 1)
            i = i - 1
        }
    }
    for (i = 0; i < districtList.length; i++) {
        let district_count = list1.filter(item => item.sq_value.district_id.district_name == districtList[i].district_name).length
        var obj = { "value": district_count, "name": districtList[i].district_name }
        districtHouseNumber.push(obj)
    }
    ctx.body = {
        districtHouseNumber
    }
})

/*
@route GET /houses/pendingNumber
@desc 等待处理信息数量接口
@access 接口是公开的
*/
router.get('/pendingNumber', async(ctx) => {
    let pendingHouse = await House.find({ house_state: 2 }).countDocuments()
    let pendingPromotion = await Promotion.find({ refund: 'apply' }).countDocuments()
    let pendingReport = await Report.find({ handle: 1 }).countDocuments()
    ctx.body = {
        pendingHouse,
        pendingPromotion,
        pendingReport
    }

})


module.exports = router.routes()