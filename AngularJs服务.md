# AngularJs 服务
> 服务作用就是对外提供某个特定的功能，如消息服务，文件压缩服务等，是一个独立的模块。

## 数据从哪里来？
我们知道了视图与数据的绑定。但是数据从那里来？如何保存呢？
控制器只会在需要的时候创建，不需要的时候销毁。这就意味着控制器中无法保存数据。
如果在控制器中去获取数据，就意味这我们会频繁的、获取重复数据。

## ng的服务是这样定义的：
$scope $rootScope   $timeout() $interval()
> 它是一个单例对象或函数，对外提供特定的功能。
- 服务是一个单例,在每个应用中只会实例化一次。
- 服务能够提供在应用生命周期内保持数据的方法，B通信(依赖注入)并保持数据一致。


# 使用AngularJS内置服务
ng提供了很多内置的服务，可以到API中查看http://docs.angularjs.org/api/。
```
<div ng-app="MyApp">
	<div ng-controller="testC">
	    <button ng-click="getUrl()">获取地址</button>
	</div>
</div>
```
```
var app = angular.module('MyApp', []);
app.controller('testC',function($scope,$location){
    $scope.getUrl = function(el){
    	alert($location.absUrl());
    }
});
```
我们在controller中直接声明$location服务，这依靠ng的依赖注入机制。$location提供地址栏相关的服务，我们在此只是简单的获取当前的地址。

服务的使用是如此简单，我们可以把服务注入到controller、指令或者是其他服务中。

## 自定义服务
如同指令一样，系统内置的服务以$开头，我们也可以自己定义一个服务。定义服务的方式有如下几种：

- 使用系统内置的$provide服务
- 使用Module的factory方法
- 使用Module的service方法

我们定义一个名为remoteData服务，它可以从远程获取数据，这也是我们在程序中经常使用的功能。不过我这里没有远程服务器，就写死一点数据模拟一下。
### factory()
factory() 方法是创建服务最常用的一种方式。接收2个参数：
- name(string) 服务名称
- getFn(函数)  服务创建的时候被调用 (在应用声明周期内只会调用一次)

```
//使用factory方法
app.factory('remoteData',function(){
    var data = {name:'zhangsan',age:'12'};
    return data;
});
```

### service()
使用sevice()可以创建一个支持构造函数的服务。接收2个参数：
- name(string) 服务名称
- constructor(构造函数)  服务创建的时候被调用 (实例化服务的时候 会使用new去创建)
```
//使用service方法
app.service('remoteData',function(){
    this.name = 'zhangsan';
    this.age = '12';
});
```

## provider()
所有的服务都是由$provider服务来创建的
```
//使用$provide来定义
app.provider('remoteData',{
    $get:function(){
        return function(){
            var data = {name:'zhangsan',age:'12'};
            return data;
        }   
    }
})

//使用factory创建服务
app.factory('remoteData',function(){
    var data = {name:'zhangsan',age:'12'};
    return data;
});
```
通过provider方式创建的服务，可以在调用前进行配置。
```
app.config(function(remoteDataProvider){
    //我们可以在启动前修改服务数据
    remoteDataProvider.data={name:'lisi',age:20};
})
app.provider('remoteData',{
    //data作为其私有属性存在
    data:{name:'zhangsan',age:'12'},
    $get:function(){
        return function(){
            return data;
        }
    }
})

//调用服务后 其数据为配置后的数据。
```

## 使用自定义服务

```javascript
var app = angular.module('MyApp', []);
app.controller('testC2',function($scope,remoteData){
    $scope.getData = function(){
        alert('name：'+remoteData.name+'   value：'+remoteData.age);
    }
});

app.factory('remoteData',function(){
    var data = {name:'zhangsan',age:'12'};
    return data;
});
```
```html
<div ng-app="MyApp">
    <div ng-controller="testC2">
        <button ng-click="getData()">获取远程数据</button>
    </div>
</div>
```

## 管理服务的依赖关系
> 服务与服务中间可以有依赖关系，例如我们这里定义一个名为validate的服务，它的作用是验证数据是否合法，它需要依赖我们从远程获取数据的服务remoteData。代码如下：

在factory的参数中，我们可以直接传入服务remoteData，ng的依赖注入机制便帮我们做好了其他工作。不过一定要保证这个参数的名称与服务名称一致，ng是根据名称来识别的。若参数的名次与服务名称不一致，你就必须显示的声明一下，方式如下：
```html
<div ng-app="MyApp">
    <div ng-controller="c1">
        <button ng-click="validateData()">验证数据</button>
    </div>
</div>
```
```javascript
var app = angular.module('MyApp', []);
app.controller('c1',function($scope,validate){
    $scope.validateData = validate;
});

app.factory('remoteData',function(){
    var data = {name:'n',value:'v'};
    return data;
});

app.factory('validate',function(remoteData){
    return function(){
        if(remoteData.name=='n'){
            alert('验证通过');
        }
    };
});
```


在controller中注入服务，也可以在定义controller时使用数组作为第二个参数，在此处把服务注入进去，这样在函数体中使用不一致的服务名称也是可以的，不过要确保注入的顺序是一致的，如：
```
app.controller('c1',['$scope','remoteData',function($scope,rd){
    $scope.getData = function(){
        alert('name：'+rd.name+'   value：'+rd.value);
    }
}]);
```