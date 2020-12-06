// initialize web server & database parameters
const port = process.env.WEBAPP_WEB_PORT || 80
const database_user = process.env.WEBAPP_DB_USER || "unset"
const database_pw = process.env.WEBAPP_DB_PASSWORD || "unset"
const database_name = process.env.WEBAPP_DB_NAME || "unset"

// required modules
const http = require('http')
const mysql = require('mysql')
const fs = require('fs')
const dns = require('dns')

// lookup ip for database
var database_ip = "unresolved-ip"
dns.lookup('mysql-service', function(err, result) {
  console.log("dns.lookup(mysql-service) = " + result)
  database_ip = result
  console.log("database_ip = " + database_ip)
})

// get IP
var os = require( 'os' );
var networkInterfaces = os.networkInterfaces( );

// initialize database return buffer
var db_return_data = `Attempting to connect to database: ${database_user}@${database_ip}:${database_name}`

// display copnfig params
console.log("WEBAPP: WEBAPP_WEB_PORT = " + port)
console.log("WEBAPP: WEBAPP_DB_USER = " + database_user)
console.log("WEBAPP: WEBAPP_DB_PASSWORD = " + database_pw)
console.log("WEBAPP: WEBAPP_DB_NAME = " + database_name)

console.log("WEBAPP: starting http listener on port " + port)
console.log(networkInterfaces)
for (const key in networkInterfaces) {
    console.log("WEBAPP: IP = " + networkInterfaces[key][0]['address'])
}

http.createServer(function(request, response) {
    // update log
    console.log("HTTP: processing request")

    // create database connection
    const con = mysql.createConnection({
        host: database_ip,
        user: database_user,
        password: database_pw,
        database: database_name
    });

    con.connect((err) => {
        if(err){
          console.log('Error connecting to Db');
          db_return_data = `Failed to connect to database: ${database_user}@${database_ip}:${database_name}`
          return;
        }
        console.log('Connection established');
	db_return_data = `Established connection to database: ${database_user}@${database_ip}:${database_name}`
    });

    // perform database query
    con.query('SELECT * FROM appconfig', (err,rows) => {
        if(err) {
            console.log('Failed to query database');
            db_return_data = `Failed to query database: ${database_user}@${database_ip}:${database_name}`
        }
    
	if (typeof rows !== "undefined" && rows !== null) {
            console.log('Data received from Db:');
            console.log(rows);
            db_return_data = `v1.0.3: Successfully connected to database: ${database_user}@${database_ip}:${database_name}`
	}
	else {
            db_return_data = `v1.0.3: Received empty response from database: ${database_user}@${database_ip}:${database_name}`
        }
    });

    con.end((err) => {
        // terminate connection gracefully (wait for outstanding queries, then send quit packet to MySQL server)
    });
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(db_return_data + "\n");
    for (const key in networkInterfaces) {
        response.write("IP Address (" + key + ") = " + networkInterfaces[key][0]['address'] + "\n")
    }
    response.end();
}).listen(port);
