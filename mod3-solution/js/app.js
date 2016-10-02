(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buyItem = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();


}

function ShoppingListCheckOffService () {
  var service = this;

  var toBuyItems = [
    {name: 'boxes of cookies', quantity: '10'},
    {name: 'bags of flour', quantity: '2'},
    {name: 'bags of sugar', quantity: '3'},
    {name: 'package of butter', quantity: '1'},
    {name: 'boxes of baking soda', quantity: '20'},
    {name: 'bags of chocolate chips', quantity: '100'}
  ];

  var boughtItems = [];

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function() {
    return boughtItems;
  };

  service.buyItem = function(index) {
    var item = toBuyItems[index];
    toBuyItems.splice(index, 1);
    boughtItems.push(item);
  };
}


})();
