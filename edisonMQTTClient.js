/* -----------------------------                                                
  AUTHOR:  @SEYAM
  seyam.bd.net@gmail.com
------------------------------ */

const mqtt = require('mqtt');
const broker = mqtt.connect('mqtt://iot.eclipse.org');

var mraa = require('mraa');
console.log('MRAA Version: ' + mraa.getVersion());

var led = new mraa.Gpio(13);
//var button = new mraa.Gpio(2);


led.dir(mraa.DIR_OUT);
//button.dir(mraa.DIR_IN);




//var state = 'on';


//broker.publish('light-status', state);



// var oldbutton = 0;

// var cstate =0;

// checkState();

// function checkState(){

//   broker.publish('light-status', state);

//   var reading = button.read();
//   console.log('Button state= '+reading);

//     if(reading && !oldbutton) // same as if(button == high && oldbutton == low)
//       {
//         //we have a new button press
//         if(cstate == 0) // if the state is off, turn it on
//         {
//           led.write(1);
//           cstate = 1;
//           state = 'on'
//           broker.publish('light-status', state);
//           //sendStateUpdate()
//         }
//         else // if the state is on, turn it off
//         {
//           led.write(0);
//           cstate = 0;
//           state = 'off'
//           broker.publish('light-status', state);
//           //sendStateUpdate()
//         }
//         oldbutton = 1;
//       }
//       else if(!reading && oldbutton) // same as if(button == low && oldbutton == high)
//       {
//         // the button was released
//         oldbutton = 0;
//       }
//       setTimeout(checkState, 100);
// }

broker.on('connect', function () {
    broker.subscribe('myLight'); //REMEMBER TO SUBSCRIBE FIRST TO THE TOPIC TO GET MESSAGE FROM THE BROKER
    //broker.subscribe('light-status');
    //broker.publish('light-status', state);
    console.log('I get executed Once!!!');
});


//SUBSCRIBE TO BROKER TO GET MESSAGE

broker.on('message', function (topic, message) {
  if(topic=="myLight"){
    if(message == 'on'){
      led.write(1);
      console.log('LED Turned ON');
      //state = 'on';
    }
    if(message == 'off'){
      led.write(0);
      console.log('LED Turned OFF');
      //state = 'off';
    }
    //broker.publish('light-status', state);
  }
});