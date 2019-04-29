const ejs = require('ejs')
const { getTemplate } = require('../common/utils')

const homeRoute = function (router) {
	router.get('/', async (ctx, next) => {
		try {
			const template = await getTemplate('index.ejs')
			let html = ejs.render(template, { title: '首页' })
			ctx.body = html;
		} catch (e) {
			next(e)
		}
	})
	router.get('/home', async (ctx, next) => {
		try {
			const template = await getTemplate('index.ejs')
			let html = ejs.render(template, { title: '首页' })
			ctx.body = html;
		} catch (e) {
			next(e)
		}
	})
}

module.exports = homeRoute
