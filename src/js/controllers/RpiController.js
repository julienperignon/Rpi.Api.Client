angular.module('rpiClientApp').controller('RpiController', ['$scope', '$http', function ($scope, $http) {
    console.log('hello from rpi controller');
    $scope.isChecked = false;
    $scope.test = 3;

    $scope.callApi = function (pinNb, value) {
        
        var intValue = $scope.isChecked ? 1 : 0;
        $http.post("http://10.0.0.99/gpio/" + pinNb + "/value/" + intValue, function () {
            console.log("success");
        });


    }


}]);