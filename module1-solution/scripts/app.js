(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {

        // Check messages 
        const ENJOY = 'Enjoy!';
        const TOO_MUCH = 'Too much!';
        const ENTER_DATA = 'Please enter data first';

        $scope.dishList = '';

        $scope.lunchCheckMessage = '';

        $scope.className = '';

        // Determine check message based on given dish list and style the message container accordingly
        $scope.displayLunchCheckMessage = function () {
            $scope.lunchCheckMessage = checkLunch($scope.dishList);
            setMessageColor();
        }

        // Returns a message based on the number of non-empty dishes in a comma separated dish list string
        function checkLunch(dishList) {
            if (!isString(dishList)) {
                throw new TypeError(dishList + ' is not a string');
            }

            const dishArray = dishList.split(',').map(x => x.trim()).filter(x => x !== '');

            const numberOfDishes = dishArray.length;

            if (numberOfDishes === 0) {
                return ENTER_DATA;
            } else if (numberOfDishes > 3) {
                return TOO_MUCH;
            } else { // numberOfDishes === 3
                return ENJOY;
            }
        }

        // Returns true if s is a string; false otherwise
        function isString(s) {
            return typeof s === 'string' || s instanceof 'String';
        }

        // Styles the message container based to the message 
        function setMessageColor() {
            const currentMessage = $scope.lunchCheckMessage;
            const $messageContainer = document.getElementsByClassName('form-group message')[0];
            switch (currentMessage) {
                case ENJOY:
                    $messageContainer.style.color = 'green';
                    $messageContainer.style.border = '1px solid green';
                    break;
                case TOO_MUCH:
                    $messageContainer.style.color = 'red';
                    $messageContainer.style.border = '1px solid green';
                    break;
                case ENTER_DATA:
                    $messageContainer.style.color = 'red';
                    $messageContainer.style.border = '1px solid red';
                    break;
                default:
                    break;
            }
        }
    }
})();