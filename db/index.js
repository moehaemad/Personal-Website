const {Pool} = require('pg');
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
let pool;
if (dbUser.dev) {
    pool = new Pool({
        user: dbUser.localuser,
        database: dbUser.localdb,
        host: 'localhost',
        password: dbUser.localpass
    });
}else{
    pool = new Pool({
        user: dbUser.awsUser,
        database: dbUser.awsDb,
        password: dbUser.awsPass,
        host: dbUser.PGHOST,
        port: 5432
    });
}

pool.on('error', (err, client)=>{
    console.error('unexpected error on idle client', err);
});

const confirmUser = (req, res, body) => {
    try{
        pool.query(`select username from login where username = '${req.params.user}' and pass = '${req.params.pass}'`, (err, resolved) => {
        if (err) throw err;
        res.status(200).json({query: resolved.rows});
    });
    }catch(err){
        console.log('error with pool query');
    }
};
module.exports = {confirmUser};