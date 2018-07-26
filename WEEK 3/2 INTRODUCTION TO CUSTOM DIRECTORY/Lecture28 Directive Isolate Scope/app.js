(function () {
    'use strict';

    angular
        .module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController1', ShoppingListController1)
        .controller('ShoppingListController2', ShoppingListController2)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('shoppingList', ShoppingList);

    function ShoppingList() {
        var ddo = {
            templateUrl: "listItems-tpl.html",
            scope: {
                list: "=myList",
                title: "@listTitle"
            }
        };
        return ddo;
    }
    //List#1 Controller
    ShoppingListController1.$inject = ['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory) {
        var list = this;
        list.itemName = "";
        list.itemQuantity = "";
        var service = ShoppingListFactory();
        list.items = service.getItems();
        list.title = "Shopping List #1 ("+ list.items.length +") Items";
        list.addItem = function () {
            try {
                service.addItem(list.itemName, list.itemQuantity);
                list.title = "Shopping List #1 ("+ list.items.length +") Items";
            } catch (error) {
                list.errorMessage = error.message;
            }
        };

        list.removeItem = function (index) {
            service.removeItem(index);
            list.title = "Shopping List #1 ("+ list.items.length +") Items";
        };
    }

    ShoppingListController2.$inject = ['ShoppingListFactory'];
    function ShoppingListController2(ShoppingListFactory) {
        var list = this;
        list.itemName = "";
        list.itemQuantity = "";

        var service = ShoppingListFactory(3);
        list.items = service.getItems();

        list.addItem = function () {
            list.errorMessage = false;
            try {
                service.addItem(list.itemName, list.itemQuantity);
            } catch (error) {
                list.errorMessage = error.message;
            }
        };

        list.removeItem = function (index) {
            list.errorMessage = false;
            service.removeItem(index);
        };
    }
    /**
     * @param  {} maxItems
     */
    function ShoppingListService(maxItems) {
        var service = this;
        var items = [];
        service.getItems = function () {
            return items;
        };

        service.removeItem = function (index) {
            return items.splice(index, 1);
        };

        service.addItem = function (name, quantity) {
            if (maxItems === undefined || (maxItems !== undefined && items.length < maxItems)) {
                var item = {
                    itemName: name,
                    itemQuantity: quantity
                };
                items.push(item);
            } else {
                throw new Error("Maximum items (" + maxItems + ") reached!");
            }
        }
    }
    /**
     * ShoppingListFactory: returns an instance of the ShoppingListService
     */
    function ShoppingListFactory() {
        var factory = function (maxItems) {
            return new ShoppingListService(maxItems);
        };
        return factory;
    }
})();