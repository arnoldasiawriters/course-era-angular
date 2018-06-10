(function(){
    'use strict';

    angular.module('DIApp', [])

    .controller('DIController', function($scope, $filter){
        $scope.name = '';
        $scope.upper = function() {
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };
    });
}());
