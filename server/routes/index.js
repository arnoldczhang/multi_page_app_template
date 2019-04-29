const homeRoute = require('./home');
const welcomeRoute = require('./welcome');

/**
 * 创建路由的工厂方法
 * @param app express 实例对象
 */
exports.routerFactory = (router) => {
	homeRoute(router)
	welcomeRoute(router)
}
