/* global io */
/* global noty */
/* global angular */
var app = angular.module('rpiClientApp',[]);

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.run(function($rootScope) {
  
  //To Enable test options
  $rootScope.debugMode = false;
  
});