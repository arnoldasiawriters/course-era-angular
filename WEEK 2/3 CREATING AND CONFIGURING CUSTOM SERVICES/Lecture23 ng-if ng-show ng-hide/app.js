(function(){
    'use strict';

    angular.module('ShoppingListApp', [])
    .provider('ShoppingListService', ShoppingListServiceProvider)
    .controller('ShoppingListCtrl', ShoppingListCtrl)
    .config(ShoppingListServiceConfig);

    ShoppingListServiceConfig.$inject = ['ShoppingListServiceProvider'];
    function ShoppingListServiceConfig(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.maxItems = 2;
    }

    ShoppingListCtrl.$inject = ['ShoppingListService'];
    function ShoppingListCtrl(ShoppingListService){
        var list = this;
        list.itemName = "";
        list.itemQuantity = "";
        list.showError = false;
        list.items = ShoppingListService.getItems();

        list.addItem = function(){
            try {
                list.showError = false;
                ShoppingListService.addItem(list.itemName, list.itemQuantity);
            } catch (error) {
                list.showError = true;
                list.errorMessage = error.message;
            }
        };

        list.removeItem = function(index){
            ShoppingListService.removeItem(index);
            if(ShoppingListService.getItems().length <= 3){
                list.showError = false;
            }
        };
    }

    function ShoppingListService(maxItems){
        var service = this;

        var items = [];

        service.getItems = function(){
            return items;
        };

        service.addItem = function(name, quantity){
            var item = {
                itemName: name,
                itemQuantity: quantity
            };

            if(maxItems === undefined || (maxItems !== undefined && items.length < maxItems)){
                items.push(item);
            } else { 
                throw new Error("Maximum items ("+ maxItems +") reached!!!");
            }
        }

        service.removeItem = function(index){
            items.splice(index, 1);
        }
    }

    function ShoppingListServiceProvider(){
        var provider = this;

        provider.defaults = {
            maxItems: 10
        };

        provider.$get = function(){
            return new ShoppingListService(provider.defaults.maxItems);
        };
    }
})();