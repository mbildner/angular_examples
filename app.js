'use strict';

angular.module('app', []);

angular.module('app').controller('HomePageCtrl', function($scope, $rootScope){
  $scope.globalShoppingCart = [];

  $scope.$on('shoppingcartadd', function(event, item){
    $scope.globalShoppingCart.push(item);
  });
});

angular.module('app').controller('LabsEngagementCtrl', function($scope, ProductsService, $rootScope){
  $scope.engagements = [];

  $scope.addToShoppingCart = function(item){
    $rootScope.$broadcast('shoppingcartadd', item);
  };

  ProductsService.engagements().then(function(engagements){
    $scope.engagements = engagements;
  });
});

angular.module('app').controller('ClothingPanelCtrl', function($rootScope, $scope, ProductsService){
  $scope.allClothing = [];
  $scope.shoppingCart = [];

  $scope.hiddenColors = [];

  $scope.permittedColors = [];

  $scope.addToShoppingCart = function(item){
    $rootScope.$broadcast('shoppingcartadd', item);
  };

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
  this.engagements = function(){
    var deferred = $q.defer();
    $timeout(function(){
      deferred.resolve([
        {name: 'Agile', description: 'Testing the methodologies should allow our feedback to code the backlog schedule to the wiki. Given measured metrics, perfectly deciding the patch-level feedback along the distributed project management will periodically build the pair feedback. Documenting the sequences should allow our kanban to groom the domain user story past the chart. Building the iterations should allow our item to learn the business lifecycle beyond the spike.'},
        {name: 'Startup', description: 'Innovate parallax big data unicorn affordances bootstrapping entrepreneur thinker-maker-doer. Bootstrapping sticky note pair programming paradigm integrate parallax iterate paradigm sticky note. Agile agile intuitive pair programming hacker integrate convergence parallax pivot engaging. Prototype user centered design personas bootstrapping user story bootstrapping user story minimum viable product affordances. Convergence 360 campaign disrupt minimum viable product Steve Jobs actionable insight prototype and late iterate prototype.'},
        {name: 'Brooklyn', description: 'Schlitz occupy gentrify, cronut echo park street art kogi yuccie roof party chicharrones ennui disrupt sartorial messenger bag. Portland selfies fashion axe synth. Four loko mustache cold-pressed, shoreditch disrupt migas iPhone hashtag brunch semiotics. Pop-up occupy bespoke, single-origin coffee kombucha listicle thundercats before they sold out blue bottle. Banjo bicycle rights slow-carb listicle art party keffiyeh, meditation knausgaard. Roof party retro tumblr pitchfork before they sold out'}
      ]);
    });
    return deferred.promise;
  };

  this.clothing = function(){
    var allClothingCalls = [hats(), shirts(), onesies()];

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
