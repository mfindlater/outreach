      var app = angular.module('OutreachApp',['firebase']);
      
      app.controller('MainCtrl', function($scope, $firebase) {
        var ref =  new Firebase('https://outreach.firebaseio.com/session');
        $firebase(ref).$bind($scope, 'session');
        $scope.showCondition = false;
        $scope.showInitiative = false;
        $scope.predicate='initiative';
        $scope.reverse=false;

        $scope.calculateParry = function(character) {
          var parry = character.abilities.fighting|0 + character.defenses.parry.rank|0;
          return parry;
        }

        $scope.calculateDodge = function(character) {
          var dodge = character.abilities.dexterity|0 + character.defenses.dodge.rank|0;
          return dodge;
        }

        $scope.calculateToughness = function(character) {
          var toughness = character.abilities.stamina|0 + character.defenses.toughness.rank|0;
          return toughness;
        }

        $scope.calculateFortitude = function(character) {
          var toughness = character.abilities.stamina|0 + character.defenses.fortitude.rank|0;
          return toughness;
        }   

        $scope.calculateWill = function(character) {
          var will = character.abilities.awareness|0 + character.defenses.will.rank|0;
          return will;
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