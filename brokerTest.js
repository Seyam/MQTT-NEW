/* -----------------------------                                                
  AUTHOR:  @SEYAM
  seyam.bd.net@gmail.com
------------------------------ */

const mqtt = require('mqtt');
const broker = mqtt.connect('mqtt://iot.eclipse.org');





broker.on('connect', function () {
    broker.subscribe('myLight'); //REMEMBER TO SUBSCRIBE FIRST TO THE TOPIC TO GET MESSAGE FROM THE BROKER
    //broker.subscribe('light-status');
    //broker.publish('light-status', state);
    console.log('I get executed Once and I subscribed!!!');
});


//SUBSCRIBE TO BROKER TO GET MESSAGE

broker.on('message', function (topic, message) {
  if(topic=="myLight"){
    if(message == 'on'){
     
      console.log('LED Turned ON');
      //state = 'on';
    }
    if(message == 'off'){
     
      console.log('LED Turned OFF');
      //state = 'off';
    }
    //broker.publish('light-status', state);
  }
});