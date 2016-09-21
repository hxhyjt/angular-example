var myapp=angular.module('todolist',[]);
myapp.controller('todos',['$scope',function($scope){
    $scope.tdls=[];
    $scope.inputText=function(e){
        var ev=e||window.event;
        if(ev.keyCode==13){
            $scope.tdls.push({title:$scope.todo,com:false});
        }
        console.log($scope.tdls)
    }
}])
