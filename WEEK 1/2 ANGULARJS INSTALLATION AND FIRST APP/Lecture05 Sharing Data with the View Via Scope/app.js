(function(){
'use strict';

var x = "hello";

angular.module('myFirstApp', [])

.controller('myFirstController', function($scope){
    $scope.name = "Arnold Mwadwaa";
    $scope.sayHello = function() {
        return "Hello Coursera!!!"
    }
});

})();