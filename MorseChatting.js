// Morse code converter (for morsecode.me only) -- Made by Mateus Aquino //
/* How to use:                                                           */
/* 1st: Enter morsecode.me (play a little if you want to :D)             */
/* 2nd: Open Dev Tools (Ctrl+Shift+I) and insert this script             */
/* 3rd: Type in the console: send("Your message");                       */
/* Att.: If you don't want to send the message,                          */
/* but retrieve it to a morse string, use toMorse("Your text"); instead! */


function toMorse(text) {
  text = text.toLowerCase();
  let cheat = document.getElementById('cheat').children[0].children;
  let morsetxt = '';
  for (var j = 0; j < text.length; j++) {
    if (text[j] == ' ')
      morsetxt += '  ';
    else
      for (var i = 0; i < cheat.length; i++) {
        let map = cheat[i].innerHTML;
        if (text.charAt(j) == map.charAt(0))
          morsetxt += map.split(' : ')[1] + ' ';
      }
  }
  return morsetxt;
}
var time = app.morsers.me.translator.dotLength;
function click(time, dash) {
  if (time !== undefined) {
    let clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('mousedown', true, true);
    key.dispatchEvent(clickEvent);
    setTimeout(click, ((dash) ? 3 : 1) * time);
  } else {
    let clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('mouseup', true, true);
    key.dispatchEvent(clickEvent);
    setTimeout(next, time);
  }
}
var txt = '';
function next() {
  switch (txt.charAt(0)) {
    case '.':
      click(time);
      break;
    case '-':
      click(time, true);
      break;
    case ' ':
      setTimeout(next, time * 3);
      break;
 	default: 
	  return;
  }
  txt = txt.substr(1);
}
function send(text) {
  txt = toMorse(text);
  next();
}
