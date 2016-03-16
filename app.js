'use strict';

angular.module('app', []);

angular.module('app').controller('HomePageCtrl', function($scope, ProductsService){
  $scope.pivotalTShirts = [];
  $scope.shoppingCart = [];

  ProductsService.shirts().then(function(shirts){
    $scope.pivotalTShirts = shirts;
  });
});

angular.module('app').service('ProductsService', function($q, $timeout){
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
