function Note (context, speed, x, y, width, height, stroke, fill) {
  var _x = x;
  var _y = y;
  var _width = width;
  var _height = height;
  var _fill = fill;
  var _stroke = stroke;
  var _speed = speed;
  var _ctx = context;
  
  function drawFrame() {
    _ctx.fillStyle = _fill;
    _ctx.strokeStyle = _stroke;
    _ctx.lineWidth = 3;
    _ctx.fillRect(_x, _y, _width, _height);
    _ctx.strokeRect(_x, _y, _width, _height);
  }
  
  return {
    update: function () {
      _y += _speed;
      drawFrame();
    },
    
    setFill: function(color) { _fill = color; },
    setStroke: function(color) { _stroke = color; },
    
    x: function() { return _x; },
    y: function() { return _y; }
  };
}