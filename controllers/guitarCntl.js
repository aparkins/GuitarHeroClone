var GuitarCntl = (function() {
  var STATE_1 = 25;
  var STATE_2 = 76;
  var STATE_3 = 150;
  var STATE_4 = 178;
  var STATE_5 = 229;
  
  var mainCntl = MainCntl();
  mainCntl.setupButtonsByNames(
    ['green', 'red', 'yellow', 'blue', 'orange',
     'overdrive', 'highFrets', 'strum']);
  mainCntl.buttonMap.state = STATE_1;
  mainCntl.buttonMap.whammy = 127;
  
  return {
    // public constants:
    STATE_1: STATE_1, STATE_2: STATE_2, STATE_3: STATE_3,
    STATE_4: STATE_4, STATE_5: STATE_5,
    
    buttonMap: mainCntl.buttonMap,
    
    parseData: function(data) {
      mainCntl.parseData(data);
      var fret = data[0];
      this.buttonMap.whammy = data[5];
      var state = data[6];
      
      mainCntl.mapButton(this.buttonMap.blue,      !!(fret&0x01));
      mainCntl.mapButton(this.buttonMap.green,     !!(fret&0x02));
      mainCntl.mapButton(this.buttonMap.red,       !!(fret&0x04));
      mainCntl.mapButton(this.buttonMap.yellow,    !!(fret&0x08));
      mainCntl.mapButton(this.buttonMap.orange,    !!(fret&0x10));
      mainCntl.mapButton(this.buttonMap.overdrive, !!(fret&0x20));
      mainCntl.mapButton(this.buttonMap.highFrets, !!(fret&0x40));
      
      var strum = data[2];
      // mainCntl.UP state is represented by 0,
      // whereas 8, 6, and 2 represent non-strumming states
      if (strum === 8 || strum === 6 || strum === 2) {
        strum = mainCntl.NONE;
      } else if (strum === 0) {
        strum = mainCntl.UP;
      }
      mainCntl.mapButton(this.buttonMap.strum, strum);
      
      if (state !== 127)
        this.buttonMap.state = state;
    },
    
    drawData: function() {
      var btns = [document.getElementById("greenBtn"),
                  document.getElementById("redBtn"),
                  document.getElementById("yellowBtn"),
                  document.getElementById("blueBtn"),
                  document.getElementById("orangeBtn")];
                  
      var btnVals = [this.buttonMap.green.state,
                     this.buttonMap.red.state,
                     this.buttonMap.yellow.state,
                     this.buttonMap.blue.state,
                     this.buttonMap.orange.state];
      
      for (var i = 0; i < 5; i++) {
        btns[i].className = this.buttonMap.highFrets.state ? "high " : "";
        btns[i].className += btnVals[i] ? "active" : "";
      }
      
      var strumClass = "";
      if (this.buttonMap.strum.state === mainCntl.UP)
        strumClass = "up";
      else if (this.buttonMap.strum.state === mainCntl.DOWN)
        strumClass = "down";
      document.getElementById("strum").className = strumClass;
      
      var dpadText = "";
      if (this.buttonMap.dpad.state === mainCntl.UP)
        dpadText = "UP";
      else if (this.buttonMap.dpad.state === mainCntl.DOWN)
        dpadText = "DOWN";
      else if (this.buttonMap.dpad.state === mainCntl.RIGHT)
        dpadText = "RIGHT";
      else if (this.buttonMap.dpad.state === mainCntl.LEFT)
        dpadText = "LEFT";
      document.getElementById("dpad").innerText = dpadText;
      
      var plusText = "";
      var minusText = "";
      var instrumentText = "";
      if (this.buttonMap.plus.state)
        plusText += "+";
      if (this.buttonMap.minus.state)
        minusText += "-";
      if (this.buttonMap.instrument.state)
        instrumentText += "instrument";
      document.getElementById("plus").innerText = plusText;
      document.getElementById("minus").innerText = minusText;
      document.getElementById("instrument").innerText = instrumentText;
      document.getElementById("state").innerText = this.buttonMap.state;
      
      var whammyHex = this.buttonMap.whammy.toString(16);
      var whammyColor = "#" + whammyHex + whammyHex + whammyHex;
      document.getElementById("whammy").style.backgroundColor = whammyColor;
      
      var overdriveClass = this.buttonMap.overdrive.state ? "active" : "";
      document.getElementById("overdrive").className = overdriveClass;
    }
  };
})();