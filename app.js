const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const main = (ctx, next) => {
  console.log(`main exec`)
  ctx.response.body = 'ManfredHu Hello World';
};

const welcome = (ctx, next) => {
  console.log(`welcome exec`, ctx.params)
  ctx.response.body = `Hello ${ctx.params}`;
};

const mainRouter = new Router()
mainRouter.get('/', main)
mainRouter.get('/:name', welcome)

// app.use(router.get('/', main));
// app.use(router.get('/:name', welcome));
app.use(mainRouter.routes());
app.use(mainRouter.allowedMethods());
app.listen(3000);
console.log('listening on port 3000');
