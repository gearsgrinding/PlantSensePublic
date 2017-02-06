var plantSense = angular.module('plantSense', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/view1')
        .success(function(data) {
            $scope.light = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.('/temp')
        .success(function(data) {
            $scope.temp = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

}