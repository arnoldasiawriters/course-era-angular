(function () {
    'use strict';

    angular.module('MenuCategoriesApp', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")

    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) {
        var menu = this;

        var promise = MenuCategoriesService.getMenuCategories();
        promise.then(function (response) {
            menu.categories = response.data;
        }).catch(function (error) {
            console.log(error);
        });

        menu.logMenuItems = function (category) {
            var itempromise = MenuCategoriesService.logMenuItems(category);
            itempromise.then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.log('Failed to retrieve menu items');
            });
        };
    }

    MenuCategoriesService.$inject = ['$http','ApiBasePath'];
    function MenuCategoriesService($http, ApiBasePath) {
        var service = this;

        service.getMenuCategories = function () {
            var response = $http({
                method: 'GET',
                url: (ApiBasePath +'/categories.json')
            });
            return response;
        };

        service.logMenuItems = function(category) {
            var result = $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json'),
                params:{
                    category:category
                }
            });
            return result;
        };
    }
})();
