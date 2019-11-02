(function() {
    'use strict';

    angular.module('data')
    .controller('ItemController', ItemController);

    ItemController.$inject = ['items']; // the resolve's 'items' property in the routes.js file
    function ItemController(items) {
        const ctrl = this;

        ctrl.items = items.data;
    }

})();