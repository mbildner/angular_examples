'use strict';

angular.module('app', []);

angular.module('app').controller('HomePageCtrl', function($scope, ProductsService){
  $scope.pivotalTShirts = [];
  $scope.pivotalBeanies = [];
  $scope.shoppingCart = [];

  $scope.hiddenColors = [];

  $scope.permittedColors = [];

  $scope.$watchCollection('pivotalTShirts', function(shirts){
    var shirtColors = shirts.map(function(shirt){
      return shirt.color;
    });
    $scope.permittedColors = unique($scope.permittedColors.concat(shirtColors));
  });

  $scope.$watchCollection('pivotalBeanies', function(beanies){
    var beanieColors = beanies.map(function(beanie){
      return beanie.color;
    });
    $scope.permittedColors = unique($scope.permittedColors.concat(beanieColors));
  });

  // initial fetch from our server
  ProductsService.shirts().then(function(shirts){
    $scope.pivotalTShirts = shirts;
  });

  ProductsService.hats().then(function(hats){
    $scope.pivotalBeanies = hats;
  });
});

angular.module('app').service('ProductsService', function($q, $timeout){
  this.hats = function(){
    var deferred = $q.defer();

    $timeout(function(){
      deferred.resolve([
        {id: 6, color: 'blue', picture: 'static/images/hat_blue.jpg'},
        {id: 7, color: 'red', picture: 'static/images/hat_red.jpg'},
        {id: 8, color: 'heathered', picture: 'static/images/hat_redxgrey_heathered.jpg'}
      ]);
    }, 500);

    return deferred.promise;
  };

  this.shirts = function(){
    var deferred = $q.defer();

    $timeout(function(){
      deferred.resolve([
        {id: 0, color: 'green', picture: 'static/images/t_shirt_green.jpeg', sizes: [1,2,3,5,8]},
        {id: 1, color: 'red', picture: 'static/images/t_shirt_red.jpeg', sizes: [1,2,3,5,8]},
        {id: 2, color: 'blue', picture: 'static/images/t_shirt_blue.jpeg', sizes: [1,2,3,5,8]},
        {id: 3, color: 'white', picture: 'static/images/white_collared_shirt.jpg', sizes: [1,2,3,5,8]},
        {id: 4, color: 'blue', picture: 'static/images/blue_collared_shirt.jpg', sizes: [1,2,3,5,8]},
        {id: 5, color: 'red', picture: 'static/images/red_collared_shirt.jpg', sizes: [1,2,3,5,8]}
      ]);
    }, 500);

    return deferred.promise;
  };
});

function unique(array){
  var holder = {};

  array.forEach(function(item){
    holder[item] = true;
  });

  return Object.keys(holder);
}
