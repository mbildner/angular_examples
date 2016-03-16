'use strict';

angular.module('app', []);

angular.module('app').controller('HomePageCtrl', function($scope, ProductsService){
  $scope.pivotalTShirts = [];

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
        {id: 2, color: 'blue', picture: 'static/images/t_shirt_blue.jpeg'}
      ]);
    }, 500);

    return deferred.promise;
  };
});
