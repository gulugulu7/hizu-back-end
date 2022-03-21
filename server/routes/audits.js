const router = require('koa-router')();
const House = require('../models/House')
const AuditFailed = require('../models/AuditFailed')

/*
@route GET /audits/violation
@desc 违规处理接口
@access 接口是公开的
*/
router.get('/violation', async(ctx) => {
    let house_id = ctx.request.query.houseId
    let reason = ctx.request.query.reason
    let find = await AuditFailed.findOne({ house_id: house_id }).then()
    if (find) {
        await AuditFailed.updateOne({ house_id: house_id }, { reason: reason }).then()
    } else {
        let auditFailed = new AuditFailed({
            house_id: house_id,
            reason: reason
        })
        await auditFailed.save().then()
    }
    await House.updateOne({ _id: house_id }, { house_state: 3 }).then()
    ctx.status = 200
    ctx.body = {
        success: "true",
        reason: reason
    }
})


/*
@route GET /audits/auditPass
@desc 违规处理接口
@access 接口是公开的
*/
router.get('/auditPass', async(ctx) => {
    let house_id = ctx.request.query.houseId
    await House.updateOne({ _id: house_id }, { house_state: 1 }).then(docs => {
        ctx.status = 200
        ctx.body = {
            success: 'true'
        }
    })
})


module.exports = router.routes()