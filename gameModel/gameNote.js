function GameNote(speed) {
  var _y = 0;
  var _speed = speed;
  
  return {
    update: function() {
      _y += _speed;
    },
    
    getY: function() { return _y; }
  };
}