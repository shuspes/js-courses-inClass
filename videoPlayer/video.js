var VideoPlayer = function(videoURL, elementId = "root") {
  this.videoURL = videoURL;
  this.elementId = elementId;
};

VideoPlayer.prototype.render = function() {
  var rootEl = document.getElementById(this.elementId);
  rootEl.innerHTML = this.getVideoHtml();
  this.video = rootEl.querySelector("#video");
  this.addEvents();  
};

VideoPlayer.prototype.getVideoHtml = function() {
  return [
    '<video id="video">',
      '<source src="' + this.videoURL + '">',
    '</video>',
    '<div id="control"></div>'
  ].join("");
};

VideoPlayer.prototype.renderControlPanel = function() {
  var videoLength = this.video.duration; //NOTE: seconds
  document.getElementById(this.elementId)
    .querySelector("#control").innerHTML = this.renderStatusbar(videoLength) + this.renderControlBut(">", "play");
};

VideoPlayer.prototype.renderStatusbar = function(value) {
  return '<input id="rangeCont" type="range" max="' + value + '" value="0"/>';
};

VideoPlayer.prototype.renderControlBut = function(content, id) {
  return `<div id="controlButton"><button id="${id}">${content}</button></div>`;
};

VideoPlayer.prototype.controlClick = function(ev) {
  if(ev.target.id === "play") {
    this.play();
  } else if(ev.target.id === "pause") {
    this.pause(); 
  } else if(ev.target.id === "rangeCont") {
    this.video.currentTime = ev.target.value;
  }
};

VideoPlayer.prototype.addEvents = function() {
  this.video.onloadedmetadata = this.renderControlPanel.bind(this);
  this.video.onended = this.pause.bind(this);
  this.video.ontimeupdate = this.changeRangeValue.bind(this);

  var controlEl = document.getElementById(this.elementId).querySelector("#control");
  controlEl.addEventListener("click", this.controlClick.bind(this));
};

VideoPlayer.prototype.changeRangeValue = function() {
  var rangeControl = document.getElementById(this.elementId).querySelector("#control #rangeCont");
  
  if(this.video && rangeControl) {
    rangeControl.value = this.video.currentTime;
  }
};
                                              
VideoPlayer.prototype.play = function() {
  if(this.video) this.video.play();
  document.getElementById(this.elementId).querySelector("#control #controlButton").innerHTML = this.renderControlBut("||", "pause");
};

 VideoPlayer.prototype.pause = function() {
  if(this.video) this.video.pause();
  document.getElementById(this.elementId).querySelector("#control #controlButton").innerHTML = this.renderControlBut(">", "play");
};


