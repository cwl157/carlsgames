app.factory('Game', function() {
    function Game(name, link, img) {
        this.name = name;
        this.link = link;
        this.img = img;
    }

    Game.prototype.method = function() {
        console.log("model method");
    } 

    Game.create = {
        fromProps: function(n, l, i) {
            return new Game(n, l, i);
        }
    }

    return Game;
});