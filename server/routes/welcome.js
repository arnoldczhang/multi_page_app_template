const ejs = require('ejs')
const { getTemplate } = require('../common/utils')

const welcomeRoute = function (router) {
	router.get('/welcome', async (ctx, next) => {
		try {
			const template = await getTemplate('welcome.ejs')
			let html = ejs.render(template, { title: '欢迎' })
			ctx.body = html;
		} catch (e) {
			next(e)
		}
	})
}

module.exports = welcomeRoute
