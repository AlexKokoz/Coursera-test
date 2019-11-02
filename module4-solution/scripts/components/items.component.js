(function() {
    'use strict';

    angular.module('data')
    .component('items', {
        template: 'templates/items.html',
        bindings: {
            items: '<'
        }
    });
})();