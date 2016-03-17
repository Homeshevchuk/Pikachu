var app = angular.module('application', ['ngMaterial']);

app.controller('main', function ($scope,$http,$window) {
    $scope.pockemons = [];
    $scope.loaded= false;
    $scope.next = {};
    getData();
    function getData(){
       $http.get("http://pokeapi.co/api/v1/pokemon/?limit=12").success(function(data){
           size=3;
        /*   for (var i=0; i<data.objects.length; i+=size) {
               $scope.pockemons.push(data.objects.slice(i,i+size));


           }*/
           $scope.pockemons= data.objects;
           for(i = 0;i<$scope.pockemons.length;i++){

                   $scope.pockemons[i].span = 1;


           }
           $scope.next = data.meta.next;
            console.log($scope.pockemons);
           $scope.loaded=true;
       });
    }
    $scope.loadMore = function(){
        $http.get("http://pokeapi.co"+$scope.next).success(function(data){

            for (var i=0; i<data.objects.length; i++) {
                $scope.pockemons.push(data.objects[i]);
            }
            $scope.next = data.meta.next;
        });
    }
    $scope.chose=function(index){

        if($scope.chosenItem==index){
            $scope.chosenItem=null;
            $scope.pockemons[index].span=1;
        }else if($scope.chosenItem!=null){
            $scope.pockemons[$scope.chosenItem].span=1;
            $scope.chosenItem = index;
            $scope.pockemons[$scope.chosenItem].span=2;
        }else{
            $scope.chosenItem = index;
            $scope.pockemons[$scope.chosenItem].span=2;
        }

    }
    $scope.chosen = function(index){
        if($scope.chosenItem==index){
            return true;
        }else{
            return false;
        }
    }
});