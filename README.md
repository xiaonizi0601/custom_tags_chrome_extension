# custom_tags_chrome_extension

### 关于本插件

这是一款可以自定义分组管理网站 URL 的新标签页。

<p>·支持百度和谷歌搜索；</p>
<p>·数据使用本地存储，可对配置信息进行本地导出备份和导入恢复；</p>
<p>·分组和快捷方式支持拖动排序、添加、编辑、删除；</p>
<p>·支持多种主题模式；</p>
<p>·语言支持中英文。</p>

该项目使用 vue-cli4，集成了 webpack，可实现快速编译打包压缩代码；通过 vue-cli-plugin-chrome-ext 插件能很方便地开发谷歌插件。

<p align="center">
  <img src="https://raw.githubusercontent.com/xiaonizi0601/custom_tags_chrome_extension/master/static/ds_1_1280.png" alt="custom_tags" width="600" />
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

方式一：克隆代码到本地，安装项目依赖，编译并自动在根目录下生成 dist 文件夹，然后在 Chrome 浏览器上打开“更多工具”>“扩展程序”，点击“加载已解压的扩展程序” 按钮选择加载 dist 文件夹完成插件安装。

方式二：直接下载根目录的 dist.zip 压缩包到本地后进行解压，再在 Chrome 浏览器上打开“更多工具”>“扩展程序”，点击“加载已解压的扩展程序” 按钮选择加载解压的 dist 文件夹完成插件安装。

方式三：在 Chrome 网上应用商店直接安装已发布的版本，插件地址 https://chrome.google.com/webstore/detail/dashi-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/nhhkacahpmeifamklfdbijlabhhecgbm

(注意：方式一和方式二均为开发版，安装前需要在浏览器“扩展程序”页面打开“开发者模式”)
