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
}else if (!dbUser.dev){
    pool = new Pool({
        user: dbUser.awsUser,
        database: dbUser.awsDb,
        password: dbUser.awsPass,
        host: dbUser.PGHOST,
        port: 5432
    });
}

// const pool = new Pool({
//             user: dbUser.awsUser,
//             database: dbUser.awsDb,
//             password: dbUser.awsPass,
//             host: dbUser.PGHOST,
//             port: 5432
//         });
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
        pool.query(`insert into login values ('${req.body.user}', '${req.body.pass}')`, (err) => {
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

const insertValue = (req, res) => {
    try{
        pool.query(`insert into rand${req.body.type} values ('${req.body.value}', '${req.body.user}')`, (err) => {
            if (err){
                res.status(200).json({didAccept: false});
            }else{
                res.status(200).json({didAccept: true});
            }
        })
    }catch (err){
        console.log(`error in insertValue with pool query`);
    }
}

const deleteValue = (req, res) => {
    try{
        pool.query(`delete from rand${req.params.type} where ${req.params.type}user='${req.params.user}' and ${req.params.type}='${req.params.value}'`, (err) => {
            if (err){
                res.status(200).json({didAccept: false});
            }else{
                res.status(200).json({didAccept: true});
            }
        })
    }catch(err){
        console.log(`error in deleteValue with pool query`);
    }
}

const updateValue = (req, res) => {
    try{
        // need type, value, user, and indValue of previous entry
        pool.query(`update rand${req.body.type} set ${req.body.type}='${req.body.value}', ${req.body.type}user='${req.body.user}' where ${req.body.type}='${req.body.indValue}' and ${req.body.type}user='${req.body.user}'`, (err) => {
            if (err){
                res.status(200).json({didAccept: false});
            }else{
                res.status(200).json({didAccept: true});
            }
            
        });
    }catch(err){
        console.log(`error in updateValue with pool query`);
    }
}

module.exports = {confirmUser, getValues, createUser, insertValue, deleteValue, updateValue};