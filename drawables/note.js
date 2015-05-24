function Note (context, speed, x, y, width, height, color) {
  var _x = x;
  var _y = y;
  var _width = width;
  var _height = height;
  var _color = color;
  var _speed = speed;
  var _ctx = context;
  
  function drawFrame() {
    _ctx.fillStyle = color;
    _ctx.strokeStyle = '#FFFFFF';
    _ctx.lineWidth = 3;
    _ctx.fillRect(_x, _y, _width, _height);
    _ctx.strokeRect(_x, _y, _width, _height);
  }
  
  return {
    update: function () {
      _y += _speed;
      drawFrame();
    },
    
    x: function() { return _x; },
    y: function() { return _y; }
  };
}