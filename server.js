const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Records
// const Records = require("./models/record");

// (async () => {
//   const records = await Records.findAll();
//   console.log('records: ', records);
// })();

const RecordsController = require('./controllers/recordsController')


// (async () => {
//   const dog = await Records.create({
//     id: 2,
//     author: "Odie",
//     project_name: "Hello",
//     created_at: "2008-08-08:12:32:43",
//     updated_at: "2019-08-08:12:32:43",
//     data: "dasdwewfwfewfw"
//   });
//   console.log("created: " + JSON.stringify(dog));
// })();


app.prepare().then(() => {
  const server = new Koa();
  server.use(bodyParser());
  const router = new Router();

  router.get("/a", async ctx => {
    await app.render(ctx.req, ctx.res, "/a", ctx.query);
    ctx.respond = false;
  });

  router.get("/b", async ctx => {
    await app.render(ctx.req, ctx.res, "/b", ctx.query);
    ctx.respond = false;
  });

  router.get("/get_records", async ctx => {
    // await app.render(ctx.req, ctx.res, "/b", ctx.query);
    const records = await RecordsController.getRecords()
    
    ctx.body = records;
  });

  router.post("/gh_callback_handler", async ctx => {
    const result = await RecordsController.handleGithubCallback(ctx.request.body)
    ctx.body = result;
  });

  router.get("*", async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
