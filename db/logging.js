const { Client } = require('pg');
let client = new Client ({
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: 5432
});

pool.on('error', (err, client)=>{
    console.error('unexpected error on idle client', err);
});

const logConnection = (ip=1234) =>{
    // const date = new Date()
    try{
        pool.query(`insert into connections values ('${ip}')`, (err, res)=>{
            if (err) throw err;
        });
    }catch(err){
        console.log(`error logging ip connection`);
    }
}

module.exports = {logConnection};