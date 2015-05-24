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

var notes = [];

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
  if (GuitarCntl.buttonMap.strum.pressed) {
    if (GuitarCntl.buttonMap.green.state) {
      notes.push(new Note(canvas.context, 3, 10, 10, 50, 20, '#00FF00'));
    }
    if (GuitarCntl.buttonMap.red.state) {
      notes.push(new Note(canvas.context, 3, 70, 10, 50, 20, '#FF0000'));
    }
    if (GuitarCntl.buttonMap.yellow.state) {
      notes.push(new Note(canvas.context, 3, 130, 10, 50, 20, '#FFFF00'));
    }
    if (GuitarCntl.buttonMap.blue.state) {
      notes.push(new Note(canvas.context, 3, 190, 10, 50, 20, '#0000FF'));
    }
    if (GuitarCntl.buttonMap.orange.state) {
      notes.push(new Note(canvas.context, 3, 250, 10, 50, 20, '#FF8800'));
    }
  }
}

function updateCanvas() {
  canvas.context.fillStyle = "#333333";
	canvas.context.fillRect(0, 0, canvas.gameWidth, canvas.gameHeight);
	canvas.context.strokeStyle = "#000000";
	canvas.context.strokeRect(0, 0, canvas.gameWidth, canvas.gameHeight);
  for (var i = 0; i < notes.length; i++) {
    notes[i].update();
  }
}

function connected(connection) {
  connect_obj.connectionId = connection.connectionId;
  
  var gameCanvas = document.getElementById('gameCanvas');
  canvas.context = gameCanvas.getContext('2d');
  canvas.gameWidth = gameCanvas.width;
  canvas.gameHeight = gameCanvas.height;
  
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
