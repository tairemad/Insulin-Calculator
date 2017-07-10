
const app = angular.module('Calculator', ['ui.bootstrap'] );

app.controller('CalcCtrl', $scope => {
    $scope.carb;
    $scope.carbRatio;
    $scope.sugar;
    $scope.correctionRatio;
    $scope.base;
    $scope.tdd;



    $scope.calcCarbInsulinUnits = () => {
       //return (Math.round($scope.carb/$scope.carbRatio));
        const carb = ($scope.carb/$scope.carbRatio);
        return round(carb, 2);
    }
    $scope.calcCorrectionUnits = () => {
      //return (Math.round(($scope.sugar - $scope.base)/$scope.correctionRatio));
      const correction = ($scope.sugar - $scope.base)/$scope.correctionRatio;
      return round(correction, 2);
    }
    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
    $scope.calcBasalUnits = () => {
        const value = ((($scope.tdd * 0.75) / 2) / 24);
        return  round(value, 2);
    }
    function calcDays (num) {
        return Math.round((($scope.tdd * 0.75) * num) + 25);
    }
    $scope.threeDay = () => {
       return calcDays(3);
    }
    $scope.twoDay = () => {
        return calcDays(2);
    }
    $scope.totalUnits = () =>{
        return $scope.calcCarbInsulinUnits() + $scope.calcCorrectionUnits();
    }

});

app.directive("bgDirective", () =>{
    return {
        restrict: "EA",
        scope: false,
        template: `<h3>Calculate Units of Insulin to Take</h3>
            <h6>How many carbs injested?</h6>
            <input type="number" pattern="[0-9]*" inputmode="numeric" ng-model="carb">
            <h6>Carb Ratio (1: ?)</h6>
            <input type="number" pattern="[0-9]*" inputmode="numeric" ng-model="carbRatio">
            <label>Units of insulin to take:</label>
            <p ng-bind="calcCarbInsulinUnits() || '' " ></p>`
    };
});

app.directive("correctionDirective", () =>{
    return {
        restrict: "EA",
        scope: false,
        template: `<h3>Calculate Correction Factor</h3>
            <h6>What is your sugar level now?</h6>
            <input type="number" pattern="[0-9]*" inputmode="numeric" ng-model="sugar">
            <h6>What is your base level for correction?</h6>
            <input type="number" pattern="[0-9]*" inputmode="numeric" ng-model="base">
            <h6>Correction Ratio: </h6>
            <input type="number" pattern="[0-9]*" inputmode="numeric" ng-model="correctionRatio">
            <label>Units of insulin to take:</label>
            <p ng-bind="calcCorrectionUnits() || '' " ></p>`
    };
});

app.directive("totalDirective", () =>{
    return {
        restrict: "EA",
        scope: false,
        template: `<h4 class="bold">Total amount of units to take including correction factor:</h4>
            <p ng-bind="totalUnits() || '' " ></p>`
    };
});


app.directive("pumpDirective", () =>{
    return {
        restrict: "EA",
        scope: false,
        template: `<h3>Calculate Pump Basal Rate</h3>
            <h6>What is your Total Daily Dose of Insulin?</h6>
            <input type="number" pattern="[0-9]*" inputmode="numeric" ng-model="tdd">
            <label>Set units of insulin to take per hour:</label>
            <p ng-bind="calcBasalUnits() || ' ' " ></p>
            <label>Amount of insulin for 3 days:</label>
            <p ng-bind="threeDay() || '' "></p>
            <label>Amount of insulin for 2 days:</label>
            <p ng-bind="twoDay() || '' "></p>`
    };
});