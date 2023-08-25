const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://test.mosquitto.org');
const mysql = require('mysql');
const readline = require('readline');

var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "1234",
    database : "farm",
    port : 3306
});

conn.connect(error => {
    if (error) throw error;
    console.log('Connected to the database');
});

const fetchDataAndPublish = () =>{
    var sql = "select * from senser";
    conn.query(sql,(error,rows,fields)=>{
        if (error) {
            console.error('Error fetching data:', error);
            return;
        }
        client.publish('Mqtt_test', JSON.stringify(rows));    
});
}

setInterval(fetchDataAndPublish, 1000);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    if (input === 'q') {
        clearInterval(interval);
        console.log('Stopped publishing.');
        rl.close();
    }
});