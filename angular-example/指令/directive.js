app.directive('hnzTab',function(){
	return {
		restrict:'EA',
		replace:true,
		// template:"<p>我是替换后的内容</p>",
		templateUrl:'tpls/tab.html',
		transclude:true,
		scope:{
			hnzClass:"@",
			hnzId:'@',
			hnzData:'='
		},
		controller:function($scope){
			$scope.name='123'
		},
		link:function(scope,element,attr){
			// console.log(scope)
			console.log(element)
			// console.log(attr)
			$(element).on("click",'a',function(){
				$(this).addClass("active").siblings("a").removeClass("active");
				$('.list',element).eq($(this).index()).show().siblings(".list").hide()
			})
		}
	}
})

/*
	@自定义指令
	> angularjs给我们提供给了丰富的指令，但是有时候还是不能满足我们的需求，因此给我们提供的自定义指令
	@自定义指令格式
	模块.directive('自定义指令名称',function(){
		//自定义指令代码
		return {
			
		}
	})
	@自定义指令参数
	## 参数 restrict 指明指令在DOM里面以什么形式被声明
	取值有：E(元素),A(属性),C(类),M(注释)，其中默认值为A；
	restrict:string, // E 元素指令 <my-direcitve></my-direcitve>
						C 类名指令 <div class='my-directive'></div>
						M 注释指令 <!-- directive:my-directive -->
						A 属性指令 <div my-directive></div>
	例如： restrict:'E',  restrict:'A',  restrict:"EA",
	使用说明：
	当你创建一个有自己模板的组件的时候，需要使用元素名
	如果仅仅是为为已有元素添加功能的话，就使用属性名
	
	## 参数 template 可选 定义替换字符串 html代码
	template:string, //<div>我是替换后的内容</div>
						如果包含多行内容在每行末尾加 \
	例如：template:'<div>\
					<p>我是替换后的内容</p>\
					<div>'
	## 参数 templateUrl 可选 引入外部html文件模板
	templateUrl:string, //'tab.html'  外部html结构模板

	## 参数 replace 可选
	replace:boolean,  //布尔值 true  替换外部结构  
							   false 默认不替换外部结构

	## 参数 scope 可选 false
	scope:bool | {}   //布尔值 true  独立作用域 可访问父级
							   false 父级作用域 
							   {}    隔离作用域
	> ### 隔离作用域 绑定策略
	让隔离作用域 与 外部作用域进行 数据交互
	@ 让隔离作用域与DOM属性值绑定，让其可以访问外部作用域属性值
	= 让隔离作用域与
	## 参数 


*/