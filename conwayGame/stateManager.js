/*
getState => state
setState(state)
toggleCell(x, y)
getNextState(state) => state
setSize(w, h)
*/

var StateManager = function(size, state) {
    this.state = state;
    this.size = size;
  }
  
  StateManager.prototype.getState = function(){
    return this.state;
  }
  
  StateManager.prototype.calcNextState = function(){
    var newState = [];
    for(var y = 0; y < this.size.height; y++) {
      var newRow = [];
      for(var x = 0; x < this.size.width; x++) {
        var nCount = getNeightCount(x, y, this.state, this.size);
        // var neigCount = 0;
        //for(var i = x-1; i< x+1; i++)
        if(this.state[y][x] === 0) {
          newRow.push(nCount === 3 ? 1 : 0);
        } else {
          newRow.push(nCount === 2 || nCount === 3 ? 1 : 0);
        }
      }
      newState.push(newRow);
    }
    this.state = newState;
    return newState;
  }
  
  StateManager.prototype.toggleCell = function(x,y) {
    this.state[y][x] = this.state[y][x] === 1 ? 0 : 1;
  }
    
  function getNeightCount(x,y,state,size) {
    var count = 0;
    for(var i = x - 1; i <= x + 1; i++) {
      for(var j = y - 1; j <= y + 1; j++) {
        if(x === i && y === j)
          continue;
        count += getCellState(i,j,state,size);
      }
    }
    return count;
  }
           
  function getCellState(x,y,state,size) {
    if(x < 0 || x >= size.width || y < 0 || y >= size.height) 
      return 0;
    return state[y][x];
  }