(function(){
    'use strict';

    angular.module('ShoppingListApp', [])
    .factory('ShoppingListFactory', ShoppingListFactory)
    .controller('ShoppingList1Ctrl', ShoppingList1Ctrl)
    .controller('ShoppingList2Ctrl', ShoppingList2Ctrl);

    ShoppingList1Ctrl.$inject = ['ShoppingListFactory'];
    function ShoppingList1Ctrl(ShoppingListFactory){
        var list1 = this;
        list1.itemName = "";
        list1.itemQuantity = "";

        var ShoppingListService = ShoppingListFactory();

        list1.addItem = function(){
            try {
                ShoppingListService.addItem(list1.itemName, list1.itemQuantity);
            } catch (error) {
                list1.errorMessage = error.message;
            }
        };

        list1.removeItem = function(index){
            ShoppingListService.removeItem(index);
        };

        list1.items = ShoppingListService.getItems();
    }

    ShoppingList2Ctrl.$inject = ['ShoppingListFactory'];
    function ShoppingList2Ctrl(ShoppingListFactory){
        var list2 = this;
        list2.itemName = "";
        list2.itemQuantity = "";

        var ShoppingListService = ShoppingListFactory(3);

        list2.addItem = function(){
            try {
                ShoppingListService.addItem(list2.itemName, list2.itemQuantity);
            } catch (error) {
                list2.errorMessage = error.message;
            }
        };

        list2.removeItem = function(index){
            ShoppingListService.removeItem(index);
        };

        list2.items = ShoppingListService.getItems();
    }
    function ShoppingListService(maxItems){
        var items = [];
        var service = this;

        service.addItem = function(itemName, itemQuantity){
            if(maxItems === undefined || (maxItems !== undefined && items.length < 3)){
                var item = {
                    itemName: itemName,
                    itemQuantity: itemQuantity
                };
                items.push(item);
            } else {
                throw new Error("Maximum items ("+ maxItems +") reached!");
            }
        };

        service.getItems = function(){
            return items;
        };
        
        service.removeItem = function(index){
            items.splice(index, 1);
        };
    }

    function ShoppingListFactory(){
        var factory = function (maxItems){
            return new ShoppingListService(maxItems);
        };

        return factory;
    }
})();