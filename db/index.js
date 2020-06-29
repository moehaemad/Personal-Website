const {Client} = require('pg');
// Connects to local user to the 'practice' database setup
    //login info taken from environment variables set by dotenv
require('dotenv').config();
const client = new Client();

await client.connect();



module.exports({
    query: () => {
        return client.query('select * from weather', (err, res) => {
            if (err) console.log(err);
            console.log(res.rows[0]);
        })
    }
})