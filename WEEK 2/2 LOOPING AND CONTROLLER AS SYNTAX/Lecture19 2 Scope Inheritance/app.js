(function(){
    'use strict';

    angular.module('App', [])
    .controller('ParentController1', ParentController1)
    .controller('ChildController1', ChildController1);

    ParentController1.$inject = ['$scope'];
    function ParentController1($scope){
        $scope.parentvalue = 1;
        $scope.pc = this;
        $scope.pc.parentvalue = 1;
    }

    ChildController1.$inject = ['$scope'];
    function ChildController1($scope){
        console.log("$scope.parentvalue: ", $scope.parentvalue);
        console.log("CHILD $scope", $scope);

        $scope.parentvalue = 5;

        console.log("*** CHANGED: $scope.parentvalue = 5 ***");
        console.log("$scope.parentvalue: ", $scope.parentvalue);
        console.log("$scope: ", $scope);

        console.log("$scope.pc.parentvalue: ", $scope.pc.parentvalue);
        $scope.pc.parentvalue = 5;
        console.log("*** CHANGED $scope.pc.parentvalue = 5 *** ");
        console.log("$scope.pc.parentvalue: ", $scope.pc.parentvalue);
        console.log("$scope: ", $scope);

        console.log("$scope.$parent.parentvalue: ", $scope.$parent.parentvalue);
        console.log("$scope.$parent.pc.parentvalue: ", $scope.$parent.pc.parentvalue);
    }
})();