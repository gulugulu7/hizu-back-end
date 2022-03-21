const router = require('koa-router')();
const City = require('../models/City');
const District = require('../models/District')
const Counter = require('../models/Counter')
const Sq = require('../models/Sq')
const SubwayStation = require('../models/SubwayStation')
const SubwayLine = require('../models/SubwayLine')

/*
@route GET /citys/getCity
@desc 获取城市列表接口
@access 接口是公开的
*/
router.get('/getCity', async(ctx) => {
    let cityList = await City.find();
    ctx.status = 200
    ctx.body = { cityList }
})

/*
@route GET /citys/getDistrict
@desc 获取行政区列表接口
@access 接口是公开的
*/
router.get('/getDistrict', async(ctx) => {
    let city = ctx.request.query.city
    let pageNumberDistrict = ctx.request.query.pageNumberDistrict
    var districtListAll = ""
    var districtList = new Array()
    await District.find().populate({ path: 'city_id', match: { city_number: city } })
        .then(docs => {
            districtListAll = docs
        }).catch(error => {
            console.log(error)
        });
    for (i = 0; i < districtListAll.length; i++) {
        if (districtListAll[i].city_id == null) {
            districtListAll.splice(i, 1)
            i = i - 1
        }
    }
    districtList = districtListAll
    let totalCountDistrict = districtList.length //总数据条数
    let pageSizeDistrict = 10 //单页数据量
    districtList = districtList.slice(pageNumberDistrict * pageSizeDistrict - pageSizeDistrict, pageNumberDistrict * pageSizeDistrict)
    let totalPageDistrict = Math.ceil(totalCountDistrict / pageSizeDistrict) //总页数
    ctx.status = 200
    ctx.body = { districtList, districtListAll, totalCountDistrict, pageSizeDistrict, totalPageDistrict }
})


/*
@route GET /citys/getSq
@desc 获取商圈列表接口
@access 接口是公开的
*/
router.get('/getSq', async(ctx) => {
    let district = ctx.request.query.district
    let pageNumberSq = ctx.request.query.pageNumberSq
    var sqListAll = ""
    await Sq.find().populate({ path: 'district_id', match: { district_number: district }, populate: { path: 'city_id' } })
        .then(docs => {
            sqListAll = docs
        }).catch(error => {
            console.log(error)
        });;
    for (i = 0; i < sqListAll.length; i++) {
        if (sqListAll[i].district_id == null) {
            sqListAll.splice(i, 1)
            i = i - 1
        }
    }
    let totalCountSq = sqListAll.length //总数据条数
    let pageSizeSq = 20 //单页数据量
    sqListAll = sqListAll.slice(pageNumberSq * pageSizeSq - pageSizeSq, pageNumberSq * pageSizeSq)
    let totalPageSq = Math.ceil(totalCountSq / pageSizeSq) //总页数
    ctx.status = 200
    ctx.body = { 'sqList': sqListAll, totalCountSq, pageSizeSq, totalPageSq }

})


/*
@route POST /citys/addDistrict
@desc 添加行政区接口
@access 接口是公开的
*/
router.post('/addDistrict', async(ctx) => {
    let counter_number = ""
    let city_id = ""
    await Counter.findOne({ counter_name: 'district' }).then(docs =>
        counter_number = docs.counter_number
    );
    let cityvalue = ctx.request.body.cityvalue;

    await City.findOne({ city_number: cityvalue }).then(docs =>
        city_id = docs._id
    );
    let district = new District({
        district_name: ctx.request.body.districtName,
        district_number: 'a' + counter_number,
        city_id: city_id
    });
    let findDistrict = await District.find({ district_name: district.district_name }).then()
    if (findDistrict.length > 0) {
        ctx.status = 200;
        ctx.body = { "success": false }
    } else {
        await district.save().then(district => {
            ctx.status = 200
            ctx.body = { "success": true }
            Counter.updateOne({ counter_name: 'district' }, { $inc: { counter_number: 1 } }).then()
        }).catch(error => {
            console.log(error)
        });
    }

})

/*
@route POST /citys/addSq
@desc 添加商圈接口
@access 接口是公开的
*/
router.post('/addSq', async(ctx) => {
    let counter_number = ""
    let district_id = ""
    await Counter.findOne({ counter_name: 'sq' }).then(docs => {
        counter_number = docs.counter_number
    });
    let districtvalue = ctx.request.body.districtvalue;
    await District.findOne({ district_number: districtvalue }).then(docs => {
        district_id = docs._id
    });
    let sq = new Sq({
        sq_name: ctx.request.body.sqName,
        sq_number: 'b' + counter_number,
        district_id: district_id
    });

    await sq.save().then(sq => {
            ctx.status = 200
            ctx.body = { "success": true }
            Counter.updateOne({ counter_name: 'sq' }, { $inc: { counter_number: 1 } }).then()
        })
        .catch(error => {
            console.log(error)
        });
})

/*
@route POST /citys/editDistrict
@desc 编辑行政区接口
@access 接口是公开的
*/
router.post('/editDistrict', async(ctx) => {
    let editdistrict = new District({
        district_name: ctx.request.body.districtName,
        _id: ctx.request.body._id
    })
    let findDistrictName = await District.find({ district_name: editdistrict.district_name }).then()
    if (findDistrictName.length < 1) {
        await District.updateOne({ _id: editdistrict._id }, { district_name: editdistrict.district_name }).then(docs => {
            ctx.status = 200
            ctx.body = { "success": true }
        }).catch(error => {
            console.log(error)
        });
    } else {
        ctx.status = 200
        ctx.body = { "success": false }
    }

})

/*
@route POST /citys/editSq
@desc 编辑商圈接口
@access 接口是公开的
*/
router.post('/editSq', async(ctx) => {
    let editsq = new Sq({
        sq_name: ctx.request.body.sqName,
        _id: ctx.request.body._id
    })
    let findSqtName = await Sq.find({ sq_name: editsq.sq_name }).then()
    if (findSqtName.length < 1) {
        await Sq.updateOne({ _id: editsq._id }, { sq_name: editsq.sq_name }).then(docs => {
            ctx.status = 200
            ctx.body = { "success": true }
        }).catch(error => {
            console.log(error)
        });
    } else {
        ctx.status = 200
        ctx.body = { "success": false }
    }

})

/*
@route GET /citys/deleteDistrict
@desc 删除行政区接口
@access 接口是公开的
*/
router.delete('/deleteDistrict', async(ctx) => {
    let _id = ctx.request.query.deleteId;
    await District.remove({ _id: _id }).then(() => {
        ctx.body = { "success": true }
    }).catch(error => {
        console.log(error)
    })
})

/*
@route GET /citys/deleteSq
@desc 删除商圈接口
@access 接口是公开的
*/
router.delete('/deleteSq', async(ctx) => {
    let _id = ctx.request.query.deleteId;
    await Sq.remove({ _id: _id }).then(() => {
        ctx.body = { "success": true }
    }).catch(error => {
        console.log(error)
    })
})

/*
@route GET /citys/getSubwayLine
@desc 获取地铁线列表接口
@access 接口是公开的
*/
router.get('/getSubwayLine', async(ctx) => {
    let city = ctx.request.query.city
    let pageNumberSubwayLine = ctx.request.query.pageNumberSubwayLine
    var subwayLineListAll = ""
    var subwayLineList = new Array()
    await SubwayLine.find().populate({ path: 'city_id', match: { city_number: city } })
        .then(docs => {
            subwayLineListAll = docs
        }).catch(error => {
            console.log(error)
        });
    for (i = 0; i < subwayLineListAll.length; i++) {
        if (subwayLineListAll[i].city_id == null) {
            subwayLineListAll.splice(i, 1)
            i = i - 1
        }
    }
    subwayLineList = subwayLineListAll
    let totalCountSubwayLine = subwayLineList.length //总数据条数
    let pageSizeSubwayLine = 10 //单页数据量
    subwayLineList = subwayLineList.slice(pageNumberSubwayLine * pageSizeSubwayLine - pageSizeSubwayLine, pageNumberSubwayLine * pageSizeSubwayLine)
    let totalPageSubwayLine = Math.ceil(totalCountSubwayLine / pageSizeSubwayLine) //总页数
    ctx.status = 200
    ctx.body = { subwayLineList, subwayLineListAll, totalCountSubwayLine, pageSizeSubwayLine, totalPageSubwayLine }
})


/*
@route GET /citys/getSubwayStation
@desc 获取地铁站列表接口
@access 接口是公开的
*/
router.get('/getSubwayStation', async(ctx) => {
    let subwayLine = ctx.request.query.subwayLine
    let pageNumberSubwayStation = ctx.request.query.pageNumberSubwayStation
    var subwayStationListAll = ""
    await SubwayStation.find().populate({ path: 'subwayLine_id', match: { subwayLine_number: subwayLine }, populate: { path: 'city_id' } })
        .then(docs => {
            subwayStationListAll = docs
        }).catch(error => {
            console.log(error)
        });;
    for (i = 0; i < subwayStationListAll.length; i++) {
        if (subwayStationListAll[i].subwayLine_id == null) {
            subwayStationListAll.splice(i, 1)
            i = i - 1
        }
    }
    let totalCountSubwayStation = subwayStationListAll.length //总数据条数
    let pageSizeSubwayStation = 20 //单页数据量
    subwayStationListAll = subwayStationListAll.slice(pageNumberSubwayStation * pageSizeSubwayStation - pageSizeSubwayStation, pageNumberSubwayStation * pageSizeSubwayStation)
    let totalPageSubwayStation = Math.ceil(totalCountSubwayStation / pageSizeSubwayStation) //总页数
    ctx.status = 200
    ctx.body = { 'subwayStationList': subwayStationListAll, totalCountSubwayStation, pageSizeSubwayStation, totalPageSubwayStation }

})


/*
@route POST /citys/addSubwayLine
@desc 添加地铁线接口
@access 接口是公开的
*/
router.post('/addSubwayLine', async(ctx) => {
    let counter_number = ""
    let city_id = ""
    await Counter.findOne({ counter_name: 'subwayLine' }).then(docs =>
        counter_number = docs.counter_number
    );
    let cityvalue = ctx.request.body.cityvalue;

    await City.findOne({ city_number: cityvalue }).then(docs =>
        city_id = docs._id
    );
    let subwayLine = new SubwayLine({
        subwayLine_name: ctx.request.body.subwayLineName,
        subwayLine_number: 'a' + counter_number,
        city_id: city_id
    });
    await subwayLine.save().then(subwayLine => {
        ctx.status = 200
        ctx.body = { "success": true }
        Counter.updateOne({ counter_name: 'subwayLine' }, { $inc: { counter_number: 1 } }).then()
    }).catch(error => {
        console.log(error)
    });


})

/*
@route POST /citys/addSubwayStation
@desc 添加地铁站接口
@access 接口是公开的
*/
router.post('/addSubwayStation', async(ctx) => {
    let counter_number = ""
    let subwayLine_id = ""
    await Counter.findOne({ counter_name: 'subwayStation' }).then(docs => {
        counter_number = docs.counter_number
    });
    let subwayLinevalue = ctx.request.body.subwayLinevalue;
    await SubwayLine.findOne({ subwayLine_number: subwayLinevalue }).then(docs => {
        subwayLine_id = docs._id
    });
    let subwayStation = new SubwayStation({
        subwayStation_name: ctx.request.body.subwayStationName,
        subwayStation_number: 'b' + counter_number,
        subwayLine_id: subwayLine_id
    });

    await subwayStation.save().then(subwayStation => {
            ctx.status = 200
            ctx.body = { "success": true }
            Counter.updateOne({ counter_name: 'subwayStation' }, { $inc: { counter_number: 1 } }).then()
        })
        .catch(error => {
            console.log(error)
        });

})

/*
@route POST /citys/editSubwayLine
@desc 编辑地铁线接口
@access 接口是公开的
*/
router.post('/editSubwayLine', async(ctx) => {
    let editsubwayLine = new SubwayLine({
        subwayLine_name: ctx.request.body.subwayLineName,
        _id: ctx.request.body._id
    })


    await SubwayLine.updateOne({ _id: editsubwayLine._id }, { subwayLine_name: editsubwayLine.subwayLine_name }).then(docs => {
        ctx.status = 200
        ctx.body = { "success": true }
    }).catch(error => {
        console.log(error)
    });


})

/*
@route POST /citys/editSubwayStation
@desc 编辑地铁站接口
@access 接口是公开的
*/
router.post('/editSubwayStation', async(ctx) => {
    let editsubwayStation = new SubwayStation({
        subwayStation_name: ctx.request.body.subwayStationName,
        _id: ctx.request.body._id
    })

    await SubwayStation.updateOne({ _id: editsubwayStation._id }, { subwayStation_name: editsubwayStation.subwayStation_name }).then(docs => {
        ctx.status = 200
        ctx.body = { "success": true }
    }).catch(error => {
        console.log(error)
    });


})

/*
@route GET /citys/deleteSubwayLine
@desc 删除地铁线接口
@access 接口是公开的
*/
router.delete('/deleteSubwayLine', async(ctx) => {
    let _id = ctx.request.query.deleteId;
    await SubwayLine.remove({ _id: _id }).then(() => {
        ctx.body = { "success": true }
    }).catch(error => {
        console.log(error)
    })
})

/*
@route GET /citys/deleteSubwayStation
@desc 删除地铁站接口
@access 接口是公开的
*/
router.delete('/deleteSubwayStation', async(ctx) => {
    let _id = ctx.request.query.deleteId;
    await SubwayStation.remove({ _id: _id }).then(() => {
        ctx.body = { "success": true }
    }).catch(error => {
        console.log(error)
    })
})



module.exports = router.routes()