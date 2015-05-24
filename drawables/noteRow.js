function NoteRow(context, x, y, width, height) {
  var _x = x;
  var _y = y;
  var _width = width;
  var _height = height;
  
  var rowWidth = _width / 5;
  
  return {
    update: function() {
      context.fillStyle = '#100020';
      context.strokeStyle = "#332266";
      context.lineWidth = 2;
      context.fillRect(_x, _y, _width, _height);
      context.strokeRect(_x, _y, _width, _height);
      
      context.fillStyle = '#332266';
      for (var i = 1; i < 5; i++) {
        context.fillRect(_x + (rowWidth * i) - 1, _y, 2, _height);
      }
    }
  };
}