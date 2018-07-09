(function () {
    'use strict';
    angular.module('NameCalcApp', [])

    .controller('NameCalcCtrl', function($scope){

        $scope.name = '';

        $scope.totalValue = 0;
        
        $scope.calculateNumericValue = function () {
            $scope.totalValue = getNumericValue($scope.name);
        };

        function getNumericValue(string){
            var stringValue = 0;
           
            for(var i=0; i < string.length; i++){
                stringValue += string.charCodeAt(i);
            }
            
            return stringValue;
        };
    });
})();