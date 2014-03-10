      var app = angular.module('OutreachApp',['firebase']);
      
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
      
          character.advantages.forEach(function(advantage) {
            if(advantage.name == 'Defensive Roll') {
              return parseInt(advantage.rank);
            }
          });
          return 0;
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

app.directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  })
 
  .directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })

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
