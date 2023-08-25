const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://test.mosquitto.org');

setInterval(
    ()=>{
        client.publish('Mqtt_test','Hello mqtt');
    }
);