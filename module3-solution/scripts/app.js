(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .service('MenuService', MenuService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com/menu_items.json')
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        const ctrl = this;

        ctrl.searchTerm = '';

        ctrl.getMatchedMenuItems = function () {
            const searchTermNormalized = ctrl.searchTerm.toLowerCase();
            const promise = MenuSearchService.getMatchedMenuItems(searchTermNormalized);

            if (ctrl.searchTerm.trim() === '')
                ctrl.found = [];
            else
                promise
                    .then(
                        function (response) {
                            ctrl.found = response;
                        }
                    );
        }

        ctrl.removeItem = function(index) {
            ctrl.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['MenuService'];
    function MenuSearchService(MenuService) {
        const menu = this;
        menu.getMatchedMenuItems = function (searchTerm) {
            const service = this;
            const promise = MenuService.getMenu();

            return promise
                .then(
                    function (response) {
                        // Get all item menus in an array
                        const allItems = response.data['menu_items'];
                        // Filter them based on the search term
                        const foundItems = allItems.filter(
                            item => item.description.indexOf(searchTerm) !== -1
                        )
                        return foundItems;
                    }
                )
                .catch(
                    function (responseError) {
                        console.log(responseError.message);
                    }
                );
            // Return procesed items
            return foundItems;
        }
    }

    MenuService.$inject = ['ApiBasePath', '$http'];
    function MenuService(ApiBasePath, $http) {
        const service = this;

        // Returns entire menu as an object;
        service.getMenu = function () {
            const response = $http({
                method: 'GET',
                url: ApiBasePath
            });
            return response;
        }
    }


    function FoundItems() {
        const ddo = {
            restrict: 'E',
            templateUrl: 'templates/FoundItems.html',
            scope: {
                items: '<',
                onRemove: '&onRemove'
            }
        }
        return ddo;
    }
})();