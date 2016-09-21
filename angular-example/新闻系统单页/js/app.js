var news = angular.module('news',['ngRoute','ngAnimate']);
var newsList=[
	{
		id:1,
		title:'环球时报：111111111111111',
		content:'互联网上有一些关于“文革”的谈论。那场持续十年的内乱给中国带来巨大灾难，在“文革”发动50周年这个时间节点上，出现一些讨论是正常的。但另一方面，若是把这种讨论看作一种认识上的“撕裂”，恐怕与社会真实思想面貌不太对得上。或者换句话说，中国社会看待“文革”的共识远远大于分歧。',
		date:new Date()
	},
	{
		id:2,
		title:'环球时报：222222222222222',
		content:'互联网上有一些关于“文革”的谈论。那场持续十年的内乱给中国带来巨大灾难，在“文革”发动50周年这个时间节点上，出现一些讨论是正常的。但另一方面，若是把这种讨论看作一种认识上的“撕裂”，恐怕与社会真实思想面貌不太对得上。或者换句话说，中国社会看待“文革”的共识远远大于分歧。',
		date:new Date()
	},
	{
		id:3,
		title:'环球时报：3333333333333333',
		content:'互联网上有一些关于“文革”的谈论。那场持续十年的内乱给中国带来巨大灾难，在“文革”发动50周年这个时间节点上，出现一些讨论是正常的。但另一方面，若是把这种讨论看作一种认识上的“撕裂”，恐怕与社会真实思想面貌不太对得上。或者换句话说，中国社会看待“文革”的共识远远大于分歧。',
		date:new Date()
	},
	{
		id:4,
		title:'环球时报：444444444444444444444444444',
		content:'互联网上有一些关于“文革”的谈论。那场持续十年的内乱给中国带来巨大灾难，在“文革”发动50周年这个时间节点上，出现一些讨论是正常的。但另一方面，若是把这种讨论看作一种认识上的“撕裂”，恐怕与社会真实思想面貌不太对得上。或者换句话说，中国社会看待“文革”的共识远远大于分歧。',
		date:new Date()
	},
	{
		id:5,
		title:'环球时报：文革已被彻底否定不可能重演',
		content:'互联网上有一些关于“文革”的谈论。那场持续十年的内乱给中国带来巨大灾难，在“文革”发动50周年这个时间节点上，出现一些讨论是正常的。但另一方面，若是把这种讨论看作一种认识上的“撕裂”，恐怕与社会真实思想面貌不太对得上。或者换句话说，中国社会看待“文革”的共识远远大于分歧。',
		date:new Date()
	}
]
news.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:'tpls/list.html',
		controller:'list'
	}).when('/list/:id',{
		templateUrl:'tpls/show.html',
		controller:'show'
	}).when('/add',{
		templateUrl:'tpls/add.html',
		controller:'add'
	}).when('/edit/:id',{
		templateUrl:'tpls/edit.html',
		controller:'edit'
	})
})
news.controller('list',function($scope){
	$scope.list=newsList;
})
news.controller('show',function($scope,$routeParams){
	$scope.one=newsList[$routeParams.id-1];
})
news.controller('add',function($scope,$location){
	$scope.title = '';
    $scope.content = '';
	$scope.add=function(){
		if(!$scope.title||!$scope.content){
			return false;
		}
		newsList.push({
			id:newsList.length+1,
			title:$scope.title,
			content:$scope.content,
			date:new Date()
		})
		$location.path('/')
	}
	
})
news.controller('edit',function($scope,$routeParams,$location){
	$scope.one=newsList[$routeParams.id-1];
	$scope.updata=function(){
		if(!$scope.one.title||!$scope.one.content){
			return false;
		}
		newsList[$routeParams.id-1]=$scope.one;
		$location.path('/');
	}
})