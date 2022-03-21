const koa = require('koa'),
    router = require('koa-router')(),
    bodyParser = require('koa-bodyparser'),
    mongoose = require('mongoose');

//引入模块
const citys = require('./routes/citys.js');
const houses = require('./routes/houses.js');
const audits = require('./routes/audits.js');
const users = require('./routes/users.js');
const promotions = require('./routes/promotions')
const appointments = require('./routes/appointments')

//实例化koa
const app = new koa();


//配置post提交数据的中间件
app.use(bodyParser());


//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/hizu', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log('Mongodb Connectd...')
    })
    .catch((err) => {
        console.log(err)
    });



router.get('/', async(ctx) => {
    ctx.body = { msg: 'hello koa' };
});

router.use('/citys', citys)
router.use('/houses', houses)
router.use('/audits', audits)
router.use('/users', users)
router.use('/promotions', promotions)
router.use('/appointments', appointments)

//配置路由
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3007;

app.listen(port, () => {
    console.log(`server started on ${port}`)
})