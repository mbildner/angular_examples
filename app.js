'use strict';

angular.module('app', []);

angular.module('app').controller('HomePageCtrl', function($scope, ProductsService){
  $scope.pivotalTShirts = [];
  $scope.pivotalBeanies = [];
  $scope.shoppingCart = [];

  $scope.hiddenColors = [];
  $scope.permittedColors = ['red', 'blue', 'green', 'white'];

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
        {id: 0, color: 'green', picture: 'static/images/t_shirt_green.jpeg'},
        {id: 1, color: 'red', picture: 'static/images/t_shirt_red.jpeg'},
        {id: 2, color: 'blue', picture: 'static/images/t_shirt_blue.jpeg'},
        {id: 3, color: 'white', picture: 'static/images/white_collared_shirt.jpg'},
        {id: 4, color: 'blue', picture: 'static/images/blue_collared_shirt.jpg'},
        {id: 5, color: 'red', picture: 'static/images/red_collared_shirt.jpg'}
      ]);
    }, 500);

    return deferred.promise;
  };
});
