 var app = angular.module('app',['firebase']);

 app.controller('MainCtrl', ['$scope','$firebase','orderByPriorityFilter','Character', function($scope, $firebase, orderByPriorityFilter, Character) {
  $scope.characters = $firebase(new Firebase('https://outreach.firebaseio.com/characters'));
  $scope.session = $firebase(new Firebase('https://outreach.firebaseio.com/session'));
  $scope.character = null;
  $scope.editMode = false;
  


  $scope.newCharacter = function() {
    $scope.character = Character.New();
    $scope.editMode = false;
  }

  $scope.newCharacter();

        
  $scope.loadCharacter = function(character) {
    $scope.character = $scope.characters.$child(character[0].$id)
    $scope.editMode = true;
  }
  
  $scope.saveCharacter = function() {
    if($scope.editMode) {
      $scope.character.$save();
      alert($scope.character.name + ' Saved!');
    }
    else
    {
      $scope.characters.$add($scope.character);
      alert($scope.character.name + ' Created!');
    }
  }

  $scope.deleteCharacter = function() {
    if($scope.editMode) {

      if(confirm('Are you sure you want to delete ' + $scope.character.name + '?'))
      {
         $scope.character.$remove();
      }

    }
  }

  $scope.addCharacterToSession = function(){
    $scope.session.$add($scope.character);
  }

}]);

app.factory('Character', function() {
  var Character = {
    New: function() {
      return {
        "initiative":0,
        "status": {
          "bruises": 0,
          "condition":"Normal"
        },
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




