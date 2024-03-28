var message = "Hello World! || I'm Alex";
var msgCount = 0;
var blinkCount = 0;
var blinkFlg = 0;
var timer1, timer2;
var messageLabel = document.getElementById("messageLabel");

function textFunc() {
   messageLabel.innerHTML = message.substring(0, msgCount);
   
   if (msgCount == message.length) {
      // Stop Timer
      clearInterval(timer1);
      
      // Start blinking animation!
      timer2 = setInterval("blinkFunc()", 200);
      
   } else {
      msgCount++;
   }
}

function blinkFunc() {
   
   // Blink 5 times
   if (blinkCount < 6) {
      if(blinkFlg == 0) {
         messageLabel.innerHTML = message;
         blinkFlg = 1;
         blinkCount++;
      } else {
         messageLabel.innerHTML = "";
         blinkFlg = 0;
      }
   } else {
      // Stop Timer
      clearInterval(timer2);
   }
}


timer1 = setInterval("textFunc()", 150); // Every 150 milliseconds