const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://test.mosquitto.org');
const mysql = require('mysql');
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const absolutePath = path.resolve("/home/bjm1263115/mqtt/DigiCertGlobalRootCA.crt.pem");


var conn=mysql.createConnection({
    host:"farmserver.mysql.database.azure.com", 
    user:"user1", 
    password:"park!258412", 
    database:"farm",
    port:3306, 
    ssl: { ca: fs.readFileSync(absolutePath)}
});

conn.connect(error => {
    if (error) throw error;
    console.log('Connected to the database');
});

const fetchDataAndPublish = () =>{
    var sql = "select * from sensor";
    conn.query(sql,(error,rows,fields)=>{
        if (error) {
            console.error('Error fetching data:', error);
            return;
        }
        client.publish('Mqtt_mysql', JSON.stringify(rows));    
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