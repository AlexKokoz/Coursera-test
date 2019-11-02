(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', 'ApiBasePath'];

    function MenuDataService($http, ApiBasePath) {
        const service = this;

        // Retrieve all categories
        service.getAllCategories = function () {
            const response = $http({
                method: 'GET',
                url: (ApiBasePath + '/categories.json')
            });
            return response;
        }

        service.getItemsForCategory = function (categoryShortName) {
            const response = $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json'),
                params: {
                    category: categoryShortName
                }
            });
            return response;
        }
    }
})();