uioc 依赖可视化工具
===

## 工具使用方法

1.  将 <a href="javascript:~function(){
require.config({packages:[{name: 'ioc-dep-graph', location: 'http://apps.bdimg.com/libs/ioc-dep-graph/0.0.1/main'}]});
require(['ioc-dep-graph'], function(t){t.draw()})}()">
        IoCGraph</a> 拖拽加入浏览器书签
        
2. 项目需要符合 AMD 规范，提供全局 require 函数，同时项目的 ioc 对象能够通过 require('common/ioc') 获取到。

3. 在项目页面点击刚才加入到书签中的链接即可显示当前项目运行的依赖可视化视图

## 可视化视图提供的操作

- 向上滚动页面放大视图，向下滚动页面缩小视图

- 拖拽页面移动视图

- 单击节点可以高亮节点以及相关联的节点和连线，再次单击同一节点可以取消高亮

- 双击节点可以使当前节点居中显示

- 拖拽节点可以移动节点布局位置
        