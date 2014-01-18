var app = angular.module('app',['ngRoute','firebase']);


app.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/characters', {
    templateUrl:'gm/templates/list.html',
    controller:'ListController'
  }).when('/characters/new', {
    templateUrl:'gm/templates/character.html',
    controller:'NewController'
  }).when('/characters/:id/edit', {
    templateUrl:'gm/templates/character.html',
    controller:'EditController'
  }).otherwise({redirectTo: '/characters'})
}]);

app.controller('ListController', ['$scope','$firebase','$location','Session', function($scope, $firebase, $location, Session) {
  var ref = new Firebase('https://outreach.firebaseio.com/characters');
  $scope.characters = $firebase(ref);
  $scope.session = Session;

  $scope.loadCharacter = function(character) {
    $location.path('/characters/' + character[0].$id + '/edit');
  }

  $scope.deleteCharacter = function(character) {
    if(confirm('Are you sure you want to delete ' + character[0].name + '?')) {
      $scope.characters.$remove(character[0].$id);
    }
  }

  $scope.addToSession = function(character) {
    $scope.session.$add(character[0]);
  }
}]);

app.controller('NewController', ['$scope','$firebase','Character', function($scope, $firebase, Character) {
  var ref = new Firebase('https://outreach.firebaseio.com/characters');
  $scope.characters = $firebase(ref);
  $scope.character = Character.New();

  $scope.saveCharacter = function() {
    $scope.characters.$add($scope.character);
    alert($scope.character.name + ' Created!');
    $location.path('/characters');
  }
}]);

app.controller('EditController', ['$scope','$firebase','$routeParams', function($scope, $firebase, $routeParams) {
  var ref = new Firebase('https://outreach.firebaseio.com/characters');
  $scope.characters = $firebase(ref);
  $scope.character = $scope.characters.$child($routeParams.id);

  $scope.saveCharacter = function() {
    alert($scope.character.name + ' Saved!');
    $scope.character.$save();
  }
}]);

app.factory('Session',['$firebase',function($firebase) {
  var ref = new Firebase('https://outreach.firebaseio.com/session');
  return $firebase(ref);
}]);

app.factory('Character', function() {
  var Character = {
    New: function() {
      return {
        "initiative":0,
        "status": {
          "bruises": 0,
          "condition":"Normal",
          "heroPoints":1
        },
        "defenses" : {
          "fortitude" : {
            "rank" : 0,
            "base" : "stamina"
          },
          "will" : {
            "rank" : 0,
            "base" : "awareness"
          },
          "parry" : {
            "rank" : 0,
            "base" : "fighting"
          },
          "dodge" : {
            "rank" : 0,
            "base" : "agility"
          },
          "toughness" : {
            "rank" : 0,
            "base" : "stamina"
          }
        },
        "abilities" : {
          "agility" : 0,
          "intelligence" : 0,
          "fighting" : 0,
          "strength" : 0,
          "presence" : 0,
          "dexterity" : 0,
          "awareness" : 0,
          "stamina" : 0
        },
        "skills" : {
          "insight" : {
            "rank" : 0,
            "base" : "awareness"
          },
          "vehicles" : {
            "rank" : 0,
            "base" : "dexterity"
          },
          "closeCombat" : {
            "rank" : 0,
            "base" : "fighting"
          },
          "acrobatics" : {
            "rank" : 0,
            "base" : "agility"
          },
          "stealth" : {
            "rank" : 0,
            "base" : "agility"
          },
          "rangedCombat" : {
            "rank" : 0,
            "base" : "dexterity"
          },
          "persuasion" : {
            "rank" : 0,
            "base" : "presence"
          },
          "investigation" : {
            "rank" : 0,
            "base" : "intelligence"
          },
          "atheletics" : {
            "rank" : 0,
            "base" : "strength"
          },
          "deception" : {
            "rank" : 0,
            "base" : "presence"
          },
          "treatment" : {
            "rank" : 0,
            "base" : "intelligence"
          },
          "intimidation" : {
            "rank" : 0,
            "base" : "presence"
          },
          "perception" : {
            "rank" : 0,
            "base" : "awareness"
          },
          "technology" : {
            "rank" : 0,
            "base" : "intelligence"
          },
          "sleightOfHand" : {
            "rank" : 0,
            "base" : "dexterity"
          }
        },
        "name" : "",
        "player" : ""
      } 
    }
  }

  return Character;
});




