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
        list.warning = "COOKIES DETECTED!";
        
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
            // console.log('this is:', this);

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
            bindToController: true,
            link: ShoppingListDirectiveLink,
            transclude: true
        };
        return ddo;
    }

    function ShoppingListDirectiveLink(scope, element, attrs, controller) {
        // console.log("Scope: ", scope);
        // console.log("element: ", element);
        // console.log("attrs: ", attrs);
        // console.log("controller: ", controller);

        scope.$watch('list.cookiesInList()', function (newValue, oldValue) {
            // console.log("Old Value: ", oldValue);
            // console.log("New Value: ", newValue);

            if(newValue === true) {
                displayCookieWarning();
            } else {
                removeCookieWarning();
            }
        }); 

        function displayCookieWarning() {
            // // Using JQLite
            // var errorElement = element.find('div');
            // errorElement.css('display','block');

            // Using JQuery library
            var errorElement = element.find('div.error');
            errorElement.slideDown(2000);
        }
    
        function removeCookieWarning() {
            // // Using JQLite
            // var errorElement = element.find('div');
            // errorElement.css('display','none');
             // Using JQuery library
             var errorElement = element.find('div.error');
             errorElement.slideUp(2000);
        }
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
            angular.forEach(list.items, function (v, k) {
                var name = v.itemName;
                if (name.toLowerCase().indexOf("cookie") !== -1) {
                    returnVal = true;
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