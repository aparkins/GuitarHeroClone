function NoteRowStream(speed, height) {
  var _speed = speed;
  var _height = height;
  var notes = [];
  
  return {
    update: function() {
      for (var i = 0; i < notes.length; i++) {
        note = notes[i];
        note.update();
        if (note.getY() > _height) {
          notes.splice(i, notes.length);
          break;
        }
      }
    },
    
    createNote: function() {
      notes.push(new GameNote(_speed));
    },
    
    getNotes: function() {
      return notes;
    }
  };
}