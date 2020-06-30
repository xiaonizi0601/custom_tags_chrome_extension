# custom_tags_chrome_extension

### 关于本插件

这是一款可以自定义分组管理网站URL的新标签页。支持百度和谷歌搜索；数据使用本地存储，不需要使用云服务，可对配置信息进行本地导出备份和导入恢复；支持多种主题模式；语言支持中英文。

该项目使用vue-cli4，集成了webpack，可实现快速编译打包压缩代码；通过vue-cli-plugin-chrome-ext 插件能很方便地开发谷歌插件。
<p align="center">
  <img src="https://raw.githubusercontent.com/xiaonizi0601/custom_tags_chrome_extension/master/ds_1_1280.png" alt="custom_tags" width="600" />
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/xiaonizi0601/custom_tags_chrome_extension/master/ds_3_1280.png" alt="custom_tags" width="600" />
</p>

### Project setup 安装项目依赖
```
npm install
```

### Compiles for development 编译运行开发环境

```
npm run build-watch
```

### Compiles and minifies for production 编译运行生产环境
```
npm run build
```

### 安装方式
方式一：编译并自动在根目录下生成 dist 文件夹，然后在Chrome浏览器上打开“更多工具”>“扩展程序”，点击“加载已解压的扩展程序” 按钮选择加载 dist 文件夹完成插件安装。

方式二：直接下载根目录的 dist.zip 压缩包到本地后进行解压，再在Chrome浏览器上打开“更多工具”>“扩展程序”，点击“加载已解压的扩展程序” 按钮选择加载解压的 dist 文件夹完成插件安装。
(注意：以上两种方式都需要在浏览器“扩展程序”页面打开“开发者模式”)


