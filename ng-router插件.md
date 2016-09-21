# 多重视图和路由
>从1.2版本开始，AngularJS将 ngRoutes 从核心代码中剥离出来成为独立的模块。我们需要安装并引用它，才能够在AngularJS应用中正常地使用路由功能。

## 安装ng-route
- NPM安装
```
npm install angular-route@X.Y.Z
```
- Bower安装
```
bower install angular-route@X.Y.Z
```
## 使用ng-router
因为AngularJS将ng-router抽离成为了一个单独的模块，因此要把 ngRoute 模块在我们的应用中当作依赖加载进来。
```
angular.module('app',['ngRoute'])
```
## 布局模板
要创建一个布局模板，需要修改HTML以告诉AngularJS把模板渲染到何处。通过将 ng-view指令和路由组合到一起，我们可以精确地指定当前路由所对应的模板在DOM中的渲染位置。
布局模板看起来像这个样子:
```
<header>
	头部
</header>
<section>
	<div ng-view></div>
</section>
<header>
	底部
</header>
```
这个例子中，我们将所有需要渲染的内容都放到了` <section> `中，而` <header>`和 `<footer> `中的内容在路由改变时不会有任何变化。
ng-view 是由 ngRoute 模块提供的一个特殊指令，它的独特作用是在HTML中给 $route 对应的视图内容占位。
它会创建自己的作用域并将模板嵌套在内部。

## 路由
> 使用AngularJS提供的 when 和 otherwise 两个方法来定义应用的路由。
用 config 函数在特定的模块或应用中定义路由。
```
angular.module('myapp',['ngRoute']).config('$routeProvider',function($routeProvider){
	//在这里定义路由
})
```

我们可以用 when 方法来添加一个特定的路由。
```
//接收两个参数
$routeProvider.when(path,route)
```
参数1：path
路由路径，这个路径会与 $location.path 进行匹配，$location.path 也就是当前URL的路径。如果路径后面还有其他内容，或使用了双斜线也可以正常匹配。我们可以在
URL中存储参数，参数需要以冒号开头（例如 :name ），后面会讨论如何用 $routeParams 读取这
些参数。
参数2：route
配置对象，决定了当第一个参数中的路由能够匹配时具体做些什么。配置对象中可以进行设置的属性包括 controller 、 template 、 templateURL 、 resolve 、 redirectTo 和reloadOnSearch 。

```
angular.module('myapp',['ngRoute']).config('$routeProvider',function($routeProvider){
	//在这里定义路由
	$routeProvider.when('/',{
		templateUrl:'tpls/home.html',
		controller:'home'
	})
})
```