
var app = angular.module('Calculator', ['ui.bootstrap'] );

app.controller('CalcCtrl', function ($scope) {
    $scope.carb;
    $scope.carbRatio;
    $scope.sugar;
    $scope.correctionRatio;
    $scope.base;

    $scope.calcCarbInsulinUnits = function () {
       return (Math.round($scope.carb/$scope.carbRatio));
    }

   $scope.calcCorrectionUnits = function () {
       return (Math.round(($scope.sugar - $scope.base)/$scope.correctionRatio));
   }

});