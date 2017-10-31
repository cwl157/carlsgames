app.controller('webgameCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    var ASCII_INVADERS = 1;
    var BRICK_BUSTER = 2;
    var ALLEN_FOOD_FRENZY = 3;
    var ALLEN_APPLE_EATER = 4;
    var CIRCUS_SHOOTER = 5;
    var DODGEBALL = 6;
    var FOOD_FRENZY_SLOT = 7;
    var TETROBALL = 8;

    $scope.name = 'Webgames';
    $scope.id = $routeParams.gameid;

    $scope.loadGame = function(gameId) {
        var game = {};
        var ids = [];
        var i = 0;

        for (i = 0; i < app.loadedGames.length; i++) {
            ids.push(app.loadedGames[i].id);
        }
 
        if (ids.indexOf(gameId) == -1) {
            if (gameId == ASCII_INVADERS) {    
                game.content = asciiInvaders();
            }
            else if (gameId == BRICK_BUSTER) {
                game.content = brickBuster();  
            }
            else if (gameId == ALLEN_FOOD_FRENZY) {
                game.content = allenFoodFrenzy();  
            }
            else if (gameId == ALLEN_APPLE_EATER) {
                game.content = allenAppleEater();  
            }
             else if (gameId == CIRCUS_SHOOTER) {
                game.content = circusShooter();  
            }
             else if (gameId == DODGEBALL) {
                game.content = dodgeball();  
            }
            else if (gameId == FOOD_FRENZY_SLOT) {
                game.content = foodFrenzySlot();
            }
            else if (gameId == TETROBALL) {
                game.content = tetroball();
            }
            game.id = gameId;
            app.loadedGames.push(game);
        }
        else {
            game = app.loadedGames[ids.indexOf(gameId)];
        }     
        game.content.loadGame();
    } // end loadGame
}]);

