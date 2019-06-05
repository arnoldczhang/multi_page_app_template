const Koa = require('koa');
const body = require('koa-body');
const logger = require('koa-logger');
const compress = require('koa-compress');
const Router = require('koa-router');
const staticServer = require("koa-static");
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');

const { routerFactory } = require('../routes');
const CONFIG = require('../../build/config');
const port = CONFIG.PORT;
const isDev = process.env.NODE_ENV === 'development';
const app = new Koa();
const webpackConfig = require('../../build/webpack.dev.config');
const compiler = webpack(webpackConfig);
const router = new Router();

if (isDev) {
	// 用 webpack-dev-middleware 启动 webpack 编译
	app.use(webpackDevMiddleware(compiler, {
      	publicPath: webpackConfig.output.publicPath,
      	overlay: true,
      	hot: true,
          noInfo: true
	}));

// 使用 webpack-hot-middleware 支持热更新
	app.use(webpackHotMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		noInfo: true
	}));
}

routerFactory(router);

app.use(staticServer(path.resolve(__dirname, isDev ? '../../src' : `../../dist`)))
  .use(body())
  .use(logger())
  .use(compress())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => console.log(`development is listening on port ${port}`));
