(function() {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'templates/main.html'
        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'templates/categories.html',
            controller: 'CategoryController as ctrl',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('categoryItems', {
            url: '/categoryItems/{categoryShortName}',
            templateUrl: 'templates/items.html',
            controller: 'ItemController as ctrl',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                    console.log(MenuDataService.getItemsForCategory($stateParams.categoryShortName));
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
    }

})();