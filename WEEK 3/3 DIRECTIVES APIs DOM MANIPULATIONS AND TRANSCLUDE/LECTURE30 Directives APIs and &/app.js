(function () {
    'use strict';

    angular
        .module('ShoppingListApp', [])
        .factory('ShoppingListFactory', ShoppingListFactory)
        .controller('ShoppingListController', ShoppingListController)
        .controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
        .directive('shoppingList', ShoppingListDirective);

    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
        var list = this;

        list.itemName = "";
        list.itemQuantity = 0;

        var service = ShoppingListFactory();
        list.items = service.getItems();
        list.title = "Shopping List #1 (" + list.items.length + " Items)";
        list.addItem = function () {
            try {
                service.addItem(list.itemName, list.itemQuantity);
                list.title = "Shopping List (" + list.items.length + ")";
            } catch (error) {
                console.log(error.message);
            }
        };

        list.removeItem = function (index) {
            this.lastItemRemoved = list.items[index];
            service.removeItem(index);
            list.title = "Shopping List (" + list.items.length + ")";
            console.log('this is:', this);
            
        };
    }

    function ShoppingListDirective() {
        var ddo = {
            templateUrl: "shoppingList.html",
            scope: {
                items: "<",
                title: "@",
                onRemove: "&removeItem"
            },
            // controller: ShoppingListDirectiveController,
            controller: "ShoppingListDirectiveController as list",
            // controllerAs: "list",
            bindToController: true
        };
        return ddo;
    }

    function ShoppingListDirectiveController() {
        var list = this;
        // list.cookiesInList = function () {
        //     for (var i = 0; i < list.items.length; i++) {
        //       var name = list.items[i].itemName;
        //       if (name.toLowerCase().indexOf("cookie") !== -1) {
        //         return true;
        //       }
        //     }
        
        //     return false;
        //   };
        list.cookiesInList = function () {
            var returnVal = false;
            angular.forEach(list.items, function (v,k) {
                var name = v.itemName;
                if(name.toLowerCase().indexOf("cookie") !== -1){
                    returnVal  = true;
                }
            });
            return returnVal;
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