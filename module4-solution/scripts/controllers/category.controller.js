(function() {
    'use strict';

    angular.module('data')
    .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['categories']; // the resolve's 'categories' property in the routes.js file
    function CategoryController(categories) {
        const ctrl = this;

        ctrl.categories = categories.data;
    }

})();