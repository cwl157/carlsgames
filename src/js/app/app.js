var app = angular.module('carlServer', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
$routeProvider.when('/', {
        templateUrl: '/templates/home.html',
        controller: 'homeCtrl'
        }).when('/webgames/:gameid', {
           templateUrl: '/templates/webgame.html',
           controller: 'webgameCtrl'});
 $locationProvider.html5Mode(true); 
}]);

app.loadedGames = [];
app.didLoad = false;





