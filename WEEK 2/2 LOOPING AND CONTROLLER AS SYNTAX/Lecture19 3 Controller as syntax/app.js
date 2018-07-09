(function(){
    'use strict';

    angular.module('ControllerAsSyntaxApp', [])
    .controller('ParentController', ParentController)
    .controller('ChildController', ChildController);

    function ParentController() {
        this.value = 1;
    }

    ChildController.$inject = ['$scope'];
    function ChildController($scope){
        this.value = 5;
        console.log("Child controller $scope: ", $scope);
    }
})();