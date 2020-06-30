# custom_tags_chrome_extension

这是一款可以自定义分组管理网站URL的新标签页。支持百度和谷歌搜索；数据使用本地存储，不需要使用云服务，可对配置信息进行本地导出备份和导入恢复；支持多种主题模式；语言支持中英文。

该项目使用vue-cli4，集成了webpack，可实现快速编译打包压缩代码；通过vue-cli-plugin-chrome-ext 插件能很方便地开发谷歌插件。

## Project setup 安装项目依赖
```
npm install
```

### Compiles for development 编译运行开发环境

```
npm run build-watch
```
运行开发环境，对修改文件进行实时编译并自动在根目录下生成 dist 文件夹，然后在Chrome浏览器上打开“更多工具”>“扩展程序”，点击“加载已解压的扩展程序” 按钮选择加载 dist 文件夹完成插件安装。(注意：修改项目代码并不能实时刷新代码，需要通过插件刷新按钮重新加载插件才行)


### Compiles and minifies for production 编译运行生产环境
```
npm run build
```


