/* global View, StateManager */

/*
run
stop
setSpeed
*/

var Game = function(element) {
    this.element = element;

    var initSize = 60;

    this.state = new Array(initSize).fill(0).map(function() {
      return new Array(initSize).fill(0).map(function() {
        return Math.random() > 0.5 ? 1 : 0;
      });
    });

    this.size = {
      height: initSize,
      width: initSize
    };
    this.stepTime = 100;
    this.init();
  }
  
  Game.prototype.init = function() {
    var gamePool = [
      '<div class="css-konvayGame">',
      '<div class="css-pool"><pre class="js-pool" id="pool"></pre></div>',
      '<button class="js-start css-button">start</button>',
      '<button class="js-stop css-button">stop</button>',
      '<label class="css-button">slow <input type="range" min="0" max="1000" id="speed"></label>',
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
      } else if(event.target.matches("#pool")) {
        scope.view.handleEvent(event); 
      }
    });
    this.element.addEventListener("change", function(event) {
      if(event.target.matches("#speed")) {
        scope.setSpeed(event.target.value);
      }
    });    
    this.view.drawState(this.stateManager.getState());
  }
  
  Game.prototype.startGame = function() {
    this.view.drawState(this.stateManager.getState());
    this.gameId = setInterval(() => {
      var newState = this.stateManager.calcNextState();
      this.view.drawState(newState);
    }, this.stepTime);
  }
  
  Game.prototype.stopGame = function() {
    clearInterval(this.gameId);
  }

  Game.prototype.setSpeed = function(newSpeed) {
    this.stepTime = newSpeed;
    this.stopGame();
    this.startGame();
  }
  