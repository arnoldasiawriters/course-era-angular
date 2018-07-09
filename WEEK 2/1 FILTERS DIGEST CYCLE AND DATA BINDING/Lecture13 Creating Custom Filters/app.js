(function(){ 
    'use strict';
    angular.module('MsgApp', [])
    .filter('lovesMessage', lovesMessageFilterFactory)
    .filter('truth', truthFilterFactory)
    .controller('MsgController', ['$scope','$filter', 'lovesMessageFilter', 
    function($scope, $filter, lovesMessageFilter){
        $scope.name = "Arnold";
        $scope.cost = .456789;
        $scope.sayMessage = function(){
            var msg = "Arnold likes Angular Js framework!"
            var upperMsg = $filter('uppercase')(msg);
            return upperMsg;
        };

        $scope.sayMessageLoves = function(){
            var msg = "Arnold likes Angular Js framework!"
            msg = lovesMessageFilter(msg);
            return msg;
        };

        $scope.state = "hungry";
        $scope.btnValue = "Feed Yaakov";
        $scope.feedYaakov = function (){
            $scope.state == "hungry" ? ($scope.state = "fed", 
            $scope.btnValue ="Unfeed Yaakov") : ( $scope.state = "hungry", 
            $scope.btnValue ="Feed Yaakov");
        };
    }]);

    function lovesMessageFilterFactory(){
        return function(input){
            input = input || "";
            var output = input.replace("likes", "loves");
            return output;
        };
    }

    function truthFilterFactory(){
        return function(input, target, replace){
            input = input || "";
            var output = input.replace(target, replace);
            return output;
        };
    }
})(); 
