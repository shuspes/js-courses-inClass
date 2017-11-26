/*
drawState(state)
handleEvent(cb(x, y))
*/

var View = function(stateManager, htmlElement, size) {
    this.htmlElement = htmlElement;
    this.size = size;
    this.stateManager = stateManager;    
  }
  
  View.prototype.drawState = function(state) {
    this.htmlElement.innerHTML = state.map(row => row.map(function(element) {
      return element === 0 ? "." : "@";
    }).join(" ")).join("\n");
  };
  
  View.prototype.handleEvent = function(ev) {
    //ev.offsetY;
    //ev.offsetX;
    var cellWidth = this.htmlElement.offsetWidth / this.size.width;
    var cellHeight = this.htmlElement.offsetHeight / this.size.height;
    
    var columnIndex = Math.ceil(ev.offsetX / cellWidth) - 1;
    var rowIndex = Math.ceil(ev.offsetY / cellHeight) - 1;
    this.stateManager.toggleCell(columnIndex, rowIndex);
    this.drawState(this.stateManager.getState());
    
  }