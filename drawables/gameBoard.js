function GameBoard(context, game, x, y, width, height) {
  var _game = game;
  var hitBarHeight = height / 35;
  
  var content = [
    new NoteRow(context, game, x, y, width, height),
    new HitBar(context, x, (y + height) - hitBarHeight - hitBarHeight, width, hitBarHeight)
  ];
  
  return {
    update: function() {
      for (var i = 0; i < content.length; i++) {
        content[i].update();
      }
    }
  };
}