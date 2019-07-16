const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const RecordsController = require('./controllers/recordsController')

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

  router.post("/api/get_records", async ctx => {
    const records = await RecordsController.getRecords(ctx.request.body)
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
