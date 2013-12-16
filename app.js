 var app = angular.module('app',['firebase']);

 app.controller('MainCtrl', ['$scope','$firebase','orderByPriorityFilter','Character', function($scope, $firebase, orderByPriorityFilter, Character) {
  $scope.characters = $firebase(new Firebase('https://outreach.firebaseio.com/'));
  $scope.character = null;
  $scope.edit = false;

  $scope.newCharacter = function() {
    $scope.character = Character.New();
    $scope.edit = false;
  }
        
  $scope.loadCharacter = function(character) {
    $scope.character = $scope.characters.$child(character[0].$id)
    $scope.edit = true;
  }

  $scope.saveCharacter = function() {
    if($scope.edit) {
      $scope.character.$save();
    }
    else
    {
      $scope.characters.$add($scope.character);
    }
  }
}]);


app.factory('Character', function() {
  var Character = {
    New: function() {
      return {
        "defenses" : {
          "fortitude" : {
            "rank" : "0",
            "base" : "stamina"
          },
          "will" : {
            "rank" : "0",
            "base" : "awareness"
          },
          "parry" : {
            "rank" : "0",
            "base" : "fighting"
          },
          "dodge" : {
            "rank" : "0",
            "base" : "agility"
          },
          "toughness" : {
            "rank" : "0",
            "base" : "stamina"
          }
        },
        "abilities" : {
          "agility" : "0",
          "intelligence" : "0",
          "fighting" : "0",
          "strength" : "0",
          "presence" : "0",
          "dexterity" : "0",
          "awareness" : "0",
          "stamina" : "0"
        },
        "skills" : {
          "insight" : {
            "rank" : "0",
            "base" : "awareness"
          },
          "vehicles" : {
            "rank" : "0",
            "base" : "dexterity"
          },
          "closeCombat" : {
            "rank" : "0",
            "base" : "fighting"
          },
          "acrobatics" : {
            "rank" : "0",
            "base" : "agility"
          },
          "stealth" : {
            "rank" : "0",
            "base" : "agility"
          },
          "rangedCombat" : {
            "rank" : "0",
            "base" : "dexterity"
          },
          "persuasion" : {
            "rank" : "0",
            "base" : "presence"
          },
          "investigation" : {
            "rank" : "0",
            "base" : "intelligence"
          },
          "atheletics" : {
            "rank" : "0",
            "base" : "strength"
          },
          "deception" : {
            "rank" : "0",
            "base" : "presence"
          },
          "treatment" : {
            "rank" : "0",
            "base" : "intelligence"
          },
          "intimidation" : {
            "rank" : "0",
            "base" : "presence"
          },
          "perception" : {
            "rank" : "0",
            "base" : "awareness"
          },
          "technology" : {
            "rank" : "0",
            "base" : "intelligence"
          },
          "sleightOfHand" : {
            "rank" : "0",
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




