module.exports = {
	transpileDependencies: ['vuetify'],
	publicPath: '/',
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:5000/api/v1',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '',
				},
			},
		},
	},
};
