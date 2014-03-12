      var app = angular.module('OutreachApp',['firebase', 'ui.bootstrap']);
      
      app.controller('MainCtrl', function($scope, $firebase) {
        var ref =  new Firebase('https://outreach.firebaseio.com/session');
        $firebase(ref).$bind($scope, 'session');
        $scope.showCondition = false;
        $scope.showInitiative = false;
        $scope.showHeroPoints = false;
        $scope.showBruises = false;
        $scope.predicate='initiative';
        $scope.reverse=false;

        $scope.calculateParry = function(character) {
          var parry = (character.abilities.fighting + character.defenses.parry.rank) + 10;
          return parry;
        }

        $scope.calculateDodge = function(character) {
          var dodge = (character.abilities.agility + character.defenses.dodge.rank) + 10;
          return dodge;
        }

        $scope.calculateToughness = function(character) {
          var toughness = (character.abilities.stamina + character.defenses.toughness.rank + $scope.getDefensiveRoll(character));
          return toughness;
        }

        $scope.calculateFortitude = function(character) {
          var fortitude = character.abilities.stamina + character.defenses.fortitude.rank;
          return fortitude;
        }   

        $scope.calculateWill = function(character) {
          var will = character.abilities.awareness + character.defenses.will.rank;
          return will;
        }

        $scope.getDefensiveRoll = function(character) {
          var retval = 0;        
          character.advantages.forEach(function(advantage) {
            if(advantage.name == 'Defensive Roll') {
              retval = parseInt(advantage.rank);
            }
          });
          return retval;
        }

        $scope.conditions = [
          'Compelled',
          'Controlled',
          'Dazed',
          'Debilitated',
          'Defenseless',
          'Disabled',
          'Fatigued',
          'Hindered',
          'Immobile',
          'Impaired',
          'Normal',
          'Stunned',
          'Tranformed',
          'Unaware',
          'Vulnerable',
          'Weakened',
          'Asleep',
          'Blind',
          'Bound',
          'Deaf',
          'Dying',
          'Entranced',
          'Exhausted',
          'Incapacitated',
          'Paralyzed',
          'Prone',
          'Restrained',
          'Staggered',
          'Surprised'
        ]
   });


app.filter('capitalize', function() {
    return function(input, scope) {
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});

app.filter('space', function() {
    return function(input, scope) {
        return input.replace(/([a-z])([A-Z])/g, '$1 $2');
    }
});
