(function(){ 
    'use strict';
    angular.module('MsgApp', [])
    .controller('MsgController', ['$scope', function($scope){
        $scope.name = "Arnold";
        $scope.sayMessage = function(){
            return "Arnold likes Angular Js framework!";
        };
        $scope.state = "hungry";
        $scope.btnValue = "Feed Yaakov";
        $scope.feedYaakov = function (){
            $scope.state == "hungry" ? ($scope.state = "fed", 
            $scope.btnValue ="Unfeed Yaakov") : ( $scope.state = "hungry", 
            $scope.btnValue ="Feed Yaakov");
        };
    }]);
})(); 
