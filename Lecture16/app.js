(function(){
    'use strict';
    angular.module('CounterApp', [])
    .controller('CounterController', CounterController);
    
    CounterController.$inject = ['$scope'];

    function CounterController($scope) {
        $scope.firstName = "Arnold";
        //$scope.fullName = "";

        $scope.showNumberOfWatchers = function () {
            console.log("# of Watchers: ", $scope.$$watchersCount);
        };
        
        $scope.setFullName = function () {
            $scope.fullName = $scope.firstName +  " " + "Mwadwaa";
        };

        $scope.logFirstName = function () {
            console.log("First name is: ", $scope.firstName);
        };

        $scope.logFullName = function () {
            console.log("Full name is: ", $scope.fullName);
        };
    }
})();