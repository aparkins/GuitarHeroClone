function GameBoardState(noteSpeed) {
  var _noteSpeed = noteSpeed;
  
  // TODO: smarter creation of notes. For now, just a simple back and forth pattern
  var cntr = 0;
  
  var noteRows = [
    new NoteRowStream(_noteSpeed),  // G
    new NoteRowStream(_noteSpeed),  // R
    new NoteRowStream(_noteSpeed),  // Y
    new NoteRowStream(_noteSpeed),  // U
    new NoteRowStream(_noteSpeed)   // O
  ];
  
  return {
    update: function() {
      cntr += 1;
      cntr %= 500;
      
      for (var i = 0; i < noteRows.length; i++) {
        noteRows[i].update();
        
        if (cntr === (100 * i)) {
          noteRows[i].createNote();
        }
      }
    },
    
    getNotesForRow(i) {
      return noteRows[i].getNotes();
    }
  };
}