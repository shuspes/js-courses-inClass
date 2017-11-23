/* global View, StateManager */

/*
run
stop
setSpeed
*/

var Game = function(element) {
    this.element = element;
    this.state = [[0, 0, 0, 0 ,0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0 ,0]];
    this.size = {height: 5, width: 5};
    // this.stepTime = 1000;
    this.init();
  }
  
  Game.prototype.init = function() {
    var gamePool = [
      '<div class="css-konvayGame">',
      '<pre class="js-pool" id="pool"></pre>',
      '<button class="js-start">start</button>',
      '<button class="js-stop">stop</button>',
      'slow <input type="range" min="0" max="2000" id="speed">',
      '</div>'
    ].join("");
    
    this.element.innerHTML = gamePool;
    
    var pollElement = this.element.querySelector("#pool");
    
    this.stateManager = new StateManager(this.size, this.state);
    this.view = new View(this.stateManager, pollElement, this.size);
    var scope = this;
    
    this.element.addEventListener("click", function(event) {
      if(event.target.matches(".js-start")) {
        scope.startGame();
      } else if(event.target.matches(".js-stop")) {
        scope.stopGame();
      }
    });
    this.view.drawState(this.stateManager.getState());
  }
  
  Game.prototype.startGame = function() {
    var stepTime = this.element.querySelector("#speed").value;
    this.view.drawState(this.stateManager.getState());
    this.gameId = setInterval(() => {
      var newState = this.stateManager.calcNextState();
      this.view.drawState(newState);
    }, stepTime);
  }
  
  Game.prototype.stopGame = function() {
    clearInterval(this.gameId);
  }
  