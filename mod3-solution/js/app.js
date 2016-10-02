(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrowDown',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowDown = this;

  //narrowDown.found = MenuSearchService.getFound();

  narrowDown.getMatchedMenuItems = function (searchTerm) {
    console.log('Searching for ' + searchTerm);
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function (response) {
      console.log(response);
      narrowDown.found = response;
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  narrowDown.onRemove = function (index) {
    console.log(narrowDown.found);
    console.log(index);
    MenuSearchService.removeItem(index.index);
    // console.log(narrowDown.found);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService ($http, ApiBasePath) {
  var service = this;
  var found = [];

  service.getMatchedMenuItems = function (searchTerm) {
    var searchTermRegExp = new RegExp(searchTerm);
    console.log("Search term regexp " + searchTermRegExp);
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")}).then(function (response) {
        found = [];
        for (var i = response.data.menu_items.length - 1; i >= 0; i--) {
          var item = response.data.menu_items[i];
          if (searchTermRegExp.test(item.description)) {
            found.push(item);
          }
        }
        found = found.sort( function (a, b) {
          return (a.short_name > b.short_name) ? 1 
          : ((b.short_name > a.short_name) ? -1 : 0);
        });
        return found;
      });
  };

  service.removeItem = function (index) {
    console.log("Splicing " + index);
    found.splice(index, 1);
    console.log(found);
  };

  service.getFound = function() {
    return found;
  };
}
})();
