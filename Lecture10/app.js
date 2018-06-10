/**
(function(){
    'use strict';

    angular.module('DIApp', [])

    .controller('DIController', ['$scope', '$filter', function($scope, $filter){
        $scope.name = '';
        $scope.upper = function() {
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };
    }]);
}());
**/
!function(){"use strict";angular.module("DIApp",[]).controller("DIController",["$scope","$filter",function(e,n){e.name="",e.upper=function(){var r=n("uppercase");e.name=r(e.name)}}])}();