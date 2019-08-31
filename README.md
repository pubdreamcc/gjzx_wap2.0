# 介绍

本项目为一个基于 Vue 的 Hybrid App 项目，全部页面均为自己用H5完成，最后通过嵌入原生 webview 框架。扫码和指纹登录功能为原生实现。由于，我已经将打包的ipa文件发布到蒲公英平台，可以直接按照下面链接扫码下载即可。

**下载地址：**<a href="https://www.pgyer.com/bd1a59e5a5c729965510b4535a11601b">下载链接（IOS）</a> <a href="http://www.gk0101.com/gk0101_android.apk">下载链接（Android）</a>

Android 安装包为直接的 apk 文件，可以直接下载安装即可。

## 技术栈

* Vue

* vue-router

* vue-axios

* vant （Vue 移动端 UI 组件库，项目中主要是用的 switch 和 dialog 组件）

* fastclick （解决移动端点击300ms延迟）

* vue-awesome-swiper（Vue移动端swiper插件）

* better-scroll（移动端滑动插件）

* vue-video-player（Vue视频播放插件）

* flexible.js（移动端适配方案）

* sass（css预处理器）

* ES6

## 碰到的坑

* [移动端字体自适应 （Font Boosting）](https://github.com/pubdreamcc/web-study/blob/master/%E5%B9%B3%E6%97%B6%E8%B8%A9%E5%9D%91%E6%80%BB%E7%BB%93/%E8%A7%A3%E5%86%B3%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%AD%97%E4%BD%93%E8%87%AA%E5%8A%A8%E9%80%82%E5%BA%94%E7%9A%84%E9%97%AE%E9%A2%98.md)

* [前端实现多行文本溢出显示省略号](https://github.com/pubdreamcc/web-study/blob/master/%E5%B9%B3%E6%97%B6%E8%B8%A9%E5%9D%91%E6%80%BB%E7%BB%93/%E5%89%8D%E7%AB%AF%E5%AE%9E%E7%8E%B0%E5%A4%9A%E8%A1%8C%E6%96%87%E6%9C%AC%E6%BA%A2%E5%87%BA%E7%9C%81%E7%95%A5%E5%8F%B7.md)

* [H5 与原生 Android/iOS 互调](https://github.com/pubdreamcc/web-study/blob/master/%E5%B9%B3%E6%97%B6%E8%B8%A9%E5%9D%91%E6%80%BB%E7%BB%93/H5%E4%B8%8E%E5%8E%9F%E7%94%9FAndroid%E6%88%96IOS%E4%BA%92%E8%B0%83.md)

* [压缩vue-cli项目生产打包后文件体积](https://github.com/pubdreamcc/web-study/blob/master/%E5%B9%B3%E6%97%B6%E8%B8%A9%E5%9D%91%E6%80%BB%E7%BB%93/%E5%8E%8B%E7%BC%A9vue-cli%E9%A1%B9%E7%9B%AE%E7%94%9F%E4%BA%A7%E6%89%93%E5%8C%85%E5%90%8E%E6%96%87%E4%BB%B6%E4%BD%93%E7%A7%AF.md)

* [video.js在移动端自动全屏播放问题](https://github.com/pubdreamcc/web-study/blob/master/%E5%B9%B3%E6%97%B6%E8%B8%A9%E5%9D%91%E6%80%BB%E7%BB%93/video.js%E5%9C%A8%E7%A7%BB%E5%8A%A8%E7%AB%AF%E8%87%AA%E5%8A%A8%E5%85%A8%E5%B1%8F%E6%92%AD%E6%94%BE%E9%97%AE%E9%A2%98.md)

* [canvas移动端高宽自适应](https://github.com/pubdreamcc/web-study/blob/master/%E5%B9%B3%E6%97%B6%E8%B8%A9%E5%9D%91%E6%80%BB%E7%BB%93/canvas%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%AB%98%E5%AE%BD%E8%87%AA%E9%80%82%E5%BA%94.md)

* [移动端开发必须知道的小技巧](https://github.com/pubdreamcc/web-study/blob/master/%E5%B9%B3%E6%97%B6%E8%B8%A9%E5%9D%91%E6%80%BB%E7%BB%93/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%BC%80%E5%8F%91%E5%B8%B8%E7%94%A8%E6%8A%80%E5%B7%A7%E6%80%BB%E7%BB%93.md)

## 主体界面展示

1. 首页

![shoye](https://wx1.sinaimg.cn/mw690/006teScagy1g323avxa8ej30u01hcgsh.jpg)

2. 资源中心

![资源中心](https://wx4.sinaimg.cn/mw690/006teScagy1g323b9skh3j30u01hcwk2.jpg)

![资源中心](https://wx1.sinaimg.cn/mw690/006teScagy1g323b8swdmj30u01hcq9a.jpg)

![资源](https://wx3.sinaimg.cn/mw690/006teScagy1g323b8410lj30u01hc40z.jpg)

3. 登录注册

![dengl](https://wx4.sinaimg.cn/mw690/006teScagy1g323b9yszkj30u01hcac6.jpg)

4. 个人信息页

![](https://wx2.sinaimg.cn/mw690/006teScagy1g323ba64laj30u01hc0xz.jpg)

5. 视频播放页

![](https://wx3.sinaimg.cn/mw690/006teScagy1g323bb9mtej30u01hc45n.jpg)

6. 课堂习题

![](https://wx4.sinaimg.cn/mw690/006teScagy1g323kqwjctj30u01hcwkf.jpg)
