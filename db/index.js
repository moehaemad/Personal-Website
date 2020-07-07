const {Client} = require('pg');
const dbUser = {
    dev: true,
    localuser: process.env.DEVUSER,
    localpass: process.env.DEVPASS,
    localdb: process.env.DEVDB,
    awsUser: process.env.PGUSER,
    awsPass: process.env.PDPASSWORD,
    awsDb: process.env.PGDATABASE,
    awsHost: process.env.PGHOST
}


module.exports = ({
    query: async (user) => {
        let client;
        if (dbUser.dev) {
            client = new Client({
                user: dbUser.localuser,
                database: dbUser.localdb,
                host: 'localhost',
                password: dbUser.localpass
            });
        }else{
            client = new Client({
                user: dbUser.awsUser,
                database: dbUser.awsDb,
                password: dbUser.awsPass,
                host: dbUser.PGHOST,
                port: 5432
            });
        }
        let toReturn;
        try{
            await client.connect();
            toReturn = await client.query(`select * from login where name = '${user}'`);
            await client.end();
        }catch(e){
            console.log(`Error connecting to database: ${e}`);
        }

        return toReturn;
    }
})