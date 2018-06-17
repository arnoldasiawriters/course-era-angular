(function(){
    'use strict';

    angular.module('ShoppingListApp', [])
    .controller('ShoppingListAddItemController', ShoppingListAddItemController)
    .controller('ShoppingListShowListItemsController', ShoppingListShowListItemsController)
    .service('ShoppingListService', ShoppingListService);

    ShoppingListAddItemController.$inject = ['ShoppingListService'];
    function ShoppingListAddItemController(ShoppingListService){
        var itemAdder = this;
        itemAdder.itemName = "";
        itemAdder.itemQuantity = "";

        itemAdder.addItem = function (){
            ShoppingListService.addItem(itemAdder.itemName,itemAdder.itemQuantity);
        };
    }

    ShoppingListShowListItemsController.$inject = ['ShoppingListService'];
    function ShoppingListShowListItemsController(ShoppingListService){
        var showList = this;
        showList.items = ShoppingListService.getItems();
        
        showList.removeItem = function(index){
            ShoppingListService.removeItem(index);
        };
    }

    function ShoppingListService(){
        var service = this;

        var items = [];

        service.addItem = function(itemName, quantity){
            var item = {
                itemName: itemName,
                itemQuantity: quantity
            };
            items.push(item);
        };
        
        service.getItems = function(){
            return items;
        };

        service.removeItem = function(index){
            items.splice(index, 1);
        };
    }
})();