const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");
const readline = require('readline');

client.subscribe('한국말이되나함보자');

client.on('connect', function() {
    console.log('Successfully connected to the broker');
});

client.on('message',function(topic,message){
    console.log(`토픽 : ${topic.toString()},메시지 : ${message.toString()}`)
});