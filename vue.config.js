const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require('webpack');

// Generate pages object
const pagesObj = {};

const chromeName = ["popup", "options", "newtab"]; // popup和options是安装vue-cli-plugin-chrome-ext插件时默认添加的；newtab为自定义添加的为覆盖浏览器默认的新标签页（可根据实际情况选择是否需要）

chromeName.forEach(name => {
	pagesObj[name] = {
		entry: `src/${name}/index.js`,
		template: "public/index.html",
		filename: `${name}.html`
	};
});

const plugins =
	process.env.NODE_ENV === "production" ? [{
			from: path.resolve("src/manifest.production.json"), // 将src文件夹下的manifest文件打包到dist文件夹
			to: `${path.resolve("dist")}/manifest.json`
		},
		{
			from: path.resolve("src/assets/images"), // 将src/assets/images文件夹下的图片打包到dist文件夹下
			to: `${path.resolve("dist")}/images`
		}
	] : [{
			from: path.resolve("src/manifest.development.json"),
			to: `${path.resolve("dist")}/manifest.json`
		},
		{
			from: path.resolve("src/assets/images"),
			to: `${path.resolve("dist")}/images`
		}
	];

module.exports = {
	pages: pagesObj,
	configureWebpack: {
		entry: {
			'content': './src/content/index.js', // 自定义 content.js 文件的打包配置（只生成js文件，不会生成相应的html文件。可根据实际情况选择是否需要）
			'background': './src/background/index.js' // 自定义 background.js 文件的打包配置（只生成js文件，不会生成相应的html文件。可根据实际情况选择是否需要）
		},
		plugins: [CopyWebpackPlugin(plugins)]
	},
	chainWebpack: config => {
		config.plugin('provide').use(webpack.ProvidePlugin, [{
			$: 'jquery',
			jquery: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}])
	}
};