(function () {
    'use strict';

    angular
        .module('ShoppingListApp', [])
        .factory('ShoppingListFactory', ShoppingListFactory)
        .controller('ShoppingListController', ShoppingListController)
        .directive('shoppingList', ShoppingListDirective);

    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
        var list = this;

        list.itemName = "";
        list.itemQuantity = 0;

        var service = ShoppingListFactory(3);
        list.items = service.getItems();
        list.title = "Shopping List (" + list.items.length + ")";
        list.addItem = function () {
            try {
                service.addItem(list.itemName, list.itemQuantity);
                list.title = "Shopping List (" + list.items.length + ")";
            } catch (error) {
                console.log(error.message);
            }
        };

        list.removeItem = function (index) {
            service.removeItem(index);
            list.title = "Shopping List (" + list.items.length + ")";
        };
    }

    function ShoppingListDirective() {
        var ddo = {
            templateUrl: "shoppingList.html",
            scope: {
                items: "<",
                title: "@"
            },
            controller: "ShoppingListDirectiveController",
            controllerAs: "list",
            bindToController: true
        };
        return ddo;
    }

    function ShoppingListDirectiveController() {
        var list = this;
        list.cookiesInList = function () {
            angular.forEach(items, function (v,k) {
                if(v.itemName.toLowerCase().indexOf('cookie') !== -1){
                    return true;
                }
            });
        };
        
    }
    function ShoppingListService(maxItems) {
        var service = this;
        var items = [];
        service.getItems = function () {
            return items;
        }

        service.addItem = function (name, quantity) {
            if (maxItems === undefined || (maxItems !== undefined && items.length < maxItems)) {
                var item = {
                    itemName: name,
                    itemQuantity: quantity
                }
                items.push(item);
            } else {
                throw Error("Maximum Items " + maxItems + " has already been achieved.");
            }
        };

        service.removeItem = function (index) {
            items.splice(index, 1);
        };
    }

    function ShoppingListFactory() {
        var factory = function (maxItems) {
            return new ShoppingListService(maxItems);
        }

        return factory;
    }
})();