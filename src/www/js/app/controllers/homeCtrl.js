app.controller('homeCtrl', ['$scope', 'Game', function($scope, Game) {
    $scope.games = [];
    $scope.games.push(new Game("Ascii Invaders", "webgames/1", "ascii_invaders.png"));
    $scope.games.push(new Game("Brick Buster", "webgames/2", "brick_buster.png"));
    $scope.games.push(new Game("Allen Food Frenzy", "webgames/3", "allen_food_frenzy.png"));
    $scope.games.push(new Game("Allen Apple Eater", "webgames/4", "allen_apple_eater.png"));
    $scope.games.push(new Game("Circus Shooter", "webgames/5", "circus_shooter.png"));
    $scope.games.push(new Game("Dodgeball", "webgames/6", "dodgeball.png"));
    $scope.games.push(new Game("Food Frenzy Slot", "webgames/7", "food_frenzy_slot.png"));
    $scope.games.push(new Game("Tetroball", "webgames/8", "tetroball.png"));
}]);