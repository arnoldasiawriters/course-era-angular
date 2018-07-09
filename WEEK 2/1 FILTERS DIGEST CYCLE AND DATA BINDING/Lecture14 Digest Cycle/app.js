(function(){
    'use strict';
    angular.module('CounterApp', [])
    .controller('CounterController', CounterController);
    
    CounterController.$inject = ['$scope'];

    function CounterController($scope) {
        $scope.onceCounter = 0;
        $scope.counter = 0;
        $scope.name = "Yaakov";

        $scope.showNumberOfWatchers = function() {
            console.log("Number of watchers: ",$scope.$$watchersCount);
        };

        $scope.countOnce = function() {
            $scope.onceCounter = 1;
        };

        $scope.count = function() {
            $scope.counter++;
        };
        /** 
        $scope.$watch('onceCounter', function (newValue, oldValue) {
            console.log('onceCounter Old Value: ', oldValue);
            console.log('onceCounter New Value: ', newValue);
        });

        $scope.$watch('counter', function (newValue, oldValue) {
            console.log('Count Old Value: ', oldValue);
            console.log('Count New Value: ', newValue);
        }); 
        **/

        $scope.$watch(function(){ 
            console.log('Digest loop fired!');
        });
    }
})();