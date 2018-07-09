(function(){ 
    'use strict';
    angular.module('MsgApp', [])
    .controller('MsgController', ['$scope','$filter', function($scope, $filter){
        $scope.name = "Arnold";
        $scope.cost = .456789;
        $scope.sayMessage = function(){
            var msg = "Arnold likes Angular Js framework!"
            var upperMsg = $filter('uppercase')(msg);
            return upperMsg;
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