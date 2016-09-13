(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  $scope.lunchItems = '';
  $scope.lunchMessage = '';
  $scope.validationSfx = '';
  $scope.checkIfTooMuch = function () {
    var count = 0;
    var lunchMessage = 'Please enter data first';
    var validationSfx = 'has-error';
    var lunchItems = $scope.lunchItems.trim().split(',');
    for (var i = 0; i < lunchItems.length; i++) {
      if (lunchItems[i].trim().length > 0) {
        ++count;
      }
    }
    if (count > 0 && count <= 3) {
      lunchMessage = 'Enjoy!';
      validationSfx = 'has-success';
    }
    else if (count > 3) {
      lunchMessage = 'Too much!';
      validationSfx = 'has-success';
    }

    $scope.lunchMessage = lunchMessage;
    $scope.validationSfx = validationSfx;
  };
}

})();
