'use strict';

angular.module('app', []);

angular.module('app').controller('HomePageCtrl', function($scope, ProductsService){
  $scope.allClothing = [];
  $scope.shoppingCart = [];

  $scope.hiddenColors = [];

  $scope.permittedColors = [];

  $scope.$watch('allClothing', function(categories){
    var clothing = flatten(categories);

    var allColors = clothing.map(function(item){
      return item.color;
    });

    $scope.permittedColors = unique($scope.permittedColors.concat(allColors));
  });

  // initial fetch from our server
  ProductsService.clothing().then(function(clothing){
    $scope.allClothing = clothing;
  });
});

angular.module('app').service('ProductsService', function($q, $timeout){
  this.clothing = function(){
    var allClothingCalls = [onesies(), hats(), shirts()];

    var allClothingFinished = $q.all(randomlyDropOne(allClothingCalls));

    return allClothingFinished;
  };

  function onesies (){
    var deferred = $q.defer();

    $timeout(function(){
      deferred.resolve([
        {id: 9, color: 'pink', picture: 'static/images/onesie_pink.jpg'},
        {id: 10, color: 'blue', picture: 'static/images/onesie_blue.jpg'}
      ]);

    }, 500);

    return deferred.promise;
  };

  function hats (){
    var deferred = $q.defer();
    $timeout(function(){
      deferred.resolve([
        {id: 6, color: 'blue', picture: 'static/images/hat_blue.jpg'},
        {id: 7, color: 'red', picture: 'static/images/hat_red.jpg'},
        {id: 8, color: 'heathered', picture: 'static/images/hat_redxgrey_heathered.jpg'}
      ]);
    }, 500);

    return deferred.promise;
  }

  function shirts (){
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
  }
});

function unique(array){
  var holder = {};

  array.forEach(function(item){
    holder[item] = true;
  });

  return Object.keys(holder);
}

function randomlyDropOne(array){
  array.splice(Math.round(Math.random() * array.length), 1);
  return array;
}

function flatten (array){
  return array.reduce(function(collector, subArray){
    return collector.concat(subArray);
  }, []);
}
