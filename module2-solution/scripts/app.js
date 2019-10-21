(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        const toBuy = this;

        toBuy.getItemsToBuy = function () {
            return ShoppingListCheckOffService.getItemsToBuy();
        }

        toBuy.buy = function (index) {
            ShoppingListCheckOffService.buy(index);
        }

        toBuy.isEmpty = function () {
            return ShoppingListCheckOffService.toBuyIsEmpty();
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        const bought = this;

        bought.getItemsBought = function () {
            return ShoppingListCheckOffService.getItemsBought();
        }

        bought.isEmpty = function() {
            return ShoppingListCheckOffService.boughtIsEmpty();
        }
    }

    function ShoppingListCheckOffService() {
        const service = this;

        const itemsToBuy = [
            {
                name: 'cookies',
                quantity: 10
            },
            {
                name: 'joghurts',
                quantity: 3
            },
            {
                name: 'tomatoes',
                quantity: 12
            },
            {
                name: 'cream cheese',
                quantity: 1
            },
            {
                name: 'chocolate bars',
                quantity: 3
            }
        ]
        const itemsBought = [];

        service.getItemsToBuy = function () {
            return itemsToBuy;
        }

        service.getItemsBought = function () {
            return itemsBought;
        }

        service.buy = function (index) {
            if (index < 0 || index >= itemsToBuy.length)
                throw new RangeError(`${index} is not between 0 and ${itemsToBuy.length - 1}`);
            itemsBought.push(itemsToBuy.splice(index, 1)[0]);
            console.log(itemsBought);
        }

        service.toBuyIsEmpty = function () {
            return itemsToBuy.length === 0;
        }

        service.boughtIsEmpty = function () {
            return itemsBought.length === 0;
        }

    }
})();