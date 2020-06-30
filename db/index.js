const {Client} = require('pg');
// Connects to local user to the 'practice' database setup
    //login info taken from environment variables set by dotenv
require('dotenv').config();

// await client.connect();

// const setClient = async () => {
//     const client = new Client();
//     return await client.connect();
// }



module.exports = ({
    query: async () => {
        const client = new Client();
        await client.connect();
        return client.query('select * from weather', (err, res) => {
            if (err) console.log(err);
            console.log(res.rows[0]);
        })
    }
})