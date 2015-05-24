var connect_obj = {
  vendorId : 7085,
  productId : 4,
  deviceId : null,
  connectionId : null
};

var canvas = {
  context : null,
  gameWidth : null,
  gameHeight : null
};

var content = [];
var game = null;

window.onload = function() {
  // Setup HID stuff:
  chrome.hid.getDevices({}, function(devices) {
    var deviceBody = document.querySelector('#deviceTableBody');
    for (var i = 0; i < devices.length; i++) {
      var device = devices[i];
      if (device.productId == connect_obj.productId &&
          device.vendorId == connect_obj.vendorId) {
        connect_obj.deviceId = device.deviceId;
        chrome.hid.connect(connect_obj.deviceId, connected);
      }
    }
  });
};

function update() {
  updateGame();
  updateCanvas();
}

function updateGame() {
  game.update();
}

function updateCanvas() {
  canvas.context.fillStyle = "#080018";
	canvas.context.fillRect(0, 0, canvas.gameWidth, canvas.gameHeight);
	canvas.context.strokeStyle = "#000000";
	canvas.context.strokeRect(0, 0, canvas.gameWidth, canvas.gameHeight);
  for (var i = 0; i < content.length; i++) {
    content[i].update();
  }
}

function connected(connection) {
  connect_obj.connectionId = connection.connectionId;
  
  var gameCanvas = document.getElementById('gameCanvas');
  canvas.context = gameCanvas.getContext('2d');
  canvas.gameWidth = gameCanvas.width;
  canvas.gameHeight = gameCanvas.height;
  
  var noteHeight = canvas.gameHeight / 35;
  
  var hitRegion = new HitRegion(
    canvas.gameHeight - (noteHeight * 2),
    noteHeight);
    
  game = new GameBoardState(3, noteHeight, hitRegion, canvas.gameHeight);
  
  content.push(new GameBoard(
    canvas.context,
    game,
    canvas.gameWidth / 4, 0,
    canvas.gameWidth / 2, canvas.gameHeight));
  
  pollHid();
}

function pollHid() {
  chrome.hid.receive(connect_obj.connectionId, function(reportId, data) {
    if (data !== null) {
      data = new Uint8Array(data);
      GuitarCntl.parseData(data);
      update();
    }
    
    setTimeout(pollHid, 0);
  });
}
