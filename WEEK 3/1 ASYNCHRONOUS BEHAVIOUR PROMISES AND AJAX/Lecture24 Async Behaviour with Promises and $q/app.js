(function () {
    'use strict';
    angular.module('ShoppingListPromiseApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .service('WeightLossFilterService', WeightLossFilterService);

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
        var list = this;
        list.items = ShoppingListService.getItems();
        list.name = "";
        list.quantity = "";
        list.addItem = function () {
            ShoppingListService.addItem(list.name, list.quantity);
        };
        list.removeItem = function ($index) {
            ShoppingListService.removeItem($index);
        };
    }

    ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
    function ShoppingListService($q, WeightLossFilterService) {
        var service = this;
        var items = [];
        service.getItems = function () {
            return items;
        };

        // service.addItem = function (name, quantity) {
        //     var promise = WeightLossFilterService.checkName(name);
        //     promise.then(function (response) {
        //         var quantityPromise = WeightLossFilterService.checkQuantity(quantity);
        //         quantityPromise.then(function (result) {
        //             var item = {
        //                 name: name,
        //                 quantity: quantity
        //             };
        //             items.push(item);
        //         }, function (error) {
        //             console.log(error.message);
        //         });
        //     }, function (error) {
        //         console.log(error.message);
        //     });
        // };

        // service.addItem = function(name, quantity){
        //     var promise = WeightLossFilterService.checkName(name);
        //     promise
        //     .then(function(response){
        //         return WeightLossFilterService.checkQuantity(quantity);
        //     })
        //     .then(function(response){
        //         var item = {
        //             name: name,
        //             quantity:quantity
        //         };
        //         items.push(item);
        //     })
        //     .catch(function(error){
        //         console.log(error.message);
        //     });
        // };

        service.addItem = function (name, quantity) {
            var namePromise = WeightLossFilterService.checkName(name);
            var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

            $q.all([namePromise, quantityPromise])
                .then(function (response) {
                    var item = {
                        name: name,
                        quantity: quantity
                    };

                    items.push(item);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        };
        service.removeItem = function (index) {
            return items.splice(index, 1)
        };
    }

    WeightLossFilterService.$index = ['$q', '$timeout'];
    function WeightLossFilterService($q, $timeout) {
        var service = this;
        service.checkName = function (name) {
            var deferred = $q.defer();
            var result = {
                message: ""
            };
            $timeout(function () {
                if (name.toLowerCase().indexOf('cookie') === -1) {
                    deferred.resolve(result);
                } else {
                    result.message = "Stay away from cookies, Arnold";
                    deferred.reject(result);
                }
            }, 3000);
            return deferred.promise;
        };

        service.checkQuantity = function (quantity) {
            var deferred = $q.defer();
            var result = {
                message: ""
            };
            $timeout(function () {
                if (quantity < 6) {
                    deferred.resolve(result);
                } else {
                    result.message = "That is too much, Arnold";
                    deferred.reject(result);
                }
            }, 1000);
            return deferred.promise;
        };
    }
})();