const {Pool} = require('pg');
const dbUser = {
    dev: process.env.ISDEV,
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

const confirmUser = (req, res) => {
    try{
        pool.query(`select username from login where username = '${req.params.user}' and pass = '${req.params.pass}'`, (err, resolved) => {
        if (err) throw err;
        res.status(200).json({user: resolved.rows});
    });
    }catch(err){
        console.log('error in confirmUser with pool query');
    }
};

const getValues = (req, res) => {
    try{
        // NOTE: Req.param.type is one of Num or String
        const type = req.params.type;
        pool.query (`select ${type} from rand${type} where ${type}user = '${req.params.user}'`, (err, resolved) => {
            if(err) throw err;
            res.status(200).json({value: resolved.rows});
        });
    }catch (err){
        console.log('error in getValues with pool query');
    }
}

const createUser = (req, res) => {
    try{
        pool.query(`insert into login values ('${req.body.user}', '${req.body.pass}')`, (err, resolved) => {
            if (err){
                res.status(200).json({didAccept: false});
            }else{
                res.status(200).json({didAccept: true});
            }
            // if (err) throw err;
            // console.log(resolved);
            // res.status(200).json({didAccept: true});
        })
    }catch(err){
        console.log('error in createUser with pool query');
        // res.status(200).json({didAccept: false});
    }
}

module.exports = {confirmUser, getValues, createUser};