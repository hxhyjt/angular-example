/*
    双向数据绑定  MVC
    ng-repeat  $first  $last $index $middle
    控制器  
    $scope  
    表达式
    filter 过滤器
    ng-click  ng-class 
*/
var items=[
    {
        id:1,
        name:'苹果',
        price:3.5,
    },
    {
        id:2,
        name:'梨',
        price:4.5,
    },
    {
        id:3,
        name:'香蕉',
        price:5.5,
    },
    {
        id:4,
        name:'猕猴桃',
        price:5.5,
    }
];

 var mycar=angular.module('car',[]);
 mycar.controller('show',['$scope',function($scope){
    $scope.items=items;
    $scope.carList=[];
    $scope.toal=0;
    $scope.cale=function(){
        var toal=0;
        for(var i in $scope.carList){
            if($scope.carList[i]){
                if($scope.carList[i].num<=0){
                    $scope.carList[i].num=0;
                }else {
                    toal+=$scope.carList[i].price*$scope.carList[i].num;
                }
            }
        }
        return toal;
    }
    $scope.buy=function($event){
        var elm=$event.target;
        var id=elm.getAttribute('item-id');
        var flag=false;
        angular.forEach($scope.carList,function(obj,i){
            if(obj.id==id){
                obj.num++;
                flag=true;
            }
        })
        if(flag==false){
            var o={};
            o.num=1;
            o.price=elm.getAttribute('item-price');
            o.name=elm.getAttribute('item-name');
            o.id=id;
            $scope.carList.push(o);
        }
        $scope.toal=$scope.cale();
        // console.log($scope.carList)

    }
    $scope.jia=function(id){
        angular.forEach($scope.carList,function(obj,i){
            if(obj.id==id){
                obj.num++;
            }
        })
    }
    $scope.jian=function(id){
        angular.forEach($scope.carList,function(obj,i){
            if(obj.id==id){
                obj.num--;
            }
        })
    }
    $scope.del=function(id){
        angular.forEach($scope.carList,function(obj,i){
            if(obj.id==id){
                $scope.carList.splice(i,1);
            }
        })
        $scope.toal=$scope.cale();
    }
    $scope.orderType='+';
    $scope.type='id';
    $scope.orders=function(t){
        $scope.type=t;
        if($scope.orderType=='+'){
            $scope.orderType='-';
        }else if($scope.orderType=='-'){
            $scope.orderType='+';
        }
    }
    $scope.$watch('carList',function(newV,oldV){
        angular.forEach(newV,function(obj,index){
            if(!oldV[index]){return}
            if(obj.num!=oldV[index].num){
                if(obj.num<=0){
                    var flag=confirm('是否删除词条记录');
                    if(flag){
                        $scope.carList.splice(index,1)
                    }else{
                        obj.num=0;
                    }
                }
                $scope.toal=$scope.cale();
            }
        })
    },true)
 }])
