const { Client } = require('pg');
// let client = new Client ({
//     user: process.env.PGUSER,
//     database: process.env.PGDATABASE,
//     password: process.env.PGPASSWORD,
//     host: process.env.PGHOST,
//     port: 5432
// });


let client = new Client ({
    user: process.env.PGUSER,
    database: process.env.DEVDB,
    password: process.env.DEVPASS,
    host: 'localhost',
});

const logConnection = () =>{
    let date = new Date();
    // let str = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
    // let str = '1990-09-09 09:09:09';
    try{
        client.connect();
        client.query(`insert into connections values ('${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}');`, (err, res)=>{
            if (err) throw err;
        });
        client.end();
    }catch(err){
        console.log(`error logging ip connection`);
    }
}

module.exports = logConnection;