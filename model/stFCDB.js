const {Pool} = require('pg');
const dbConfig = require('./dbconfig');

let pool = new Pool({
    user: dbConfig.awsUser,
    databse: dbConfig.localdb,
    password: dbConfig.awsPass,
    host: dbConfig.PGHOST,
    port: 5432
});
// TODO: return to 
// let pool = new Pool({
//     user: dbConfig.localuser,
//     database: dbConfig.localdb,
//     host: 'localhost',
//     password: dbConfig.localpass
// })

// has stfc_user (username text primary key, password text);
// has stfc_deck_text (id integer primary key, username text references stfc_user(username), front text, back text);

// TODO: document database

const checkUser = (req, res) => {
    try{
        // params: username, pass
        // TODO: check result for incorrect query
        // TODO: implement return json for successful validation
        let query = pool.query(`select * from stfc_user where username='${req.params.username}' and password='${req.params.pass}'`);
        query.then(query_result => {
            res.status(200).json({result: true, })
        }).catch(err => {
            res.status(200).json({result: false});
        })
    }catch(err){
        res.status(500);
    }
}

const createUser = (req, res) => {
    try{
        /*post body: {username: String, pass: String} */
        pool.query(`insert into stfc_user values ('${req.body.username}', '${req.body.pass}');`);
        console.log(req.body.username);
        console.log(req.body);

    }catch(err){
        console.log('error in stFC creating user', err);
    }
}

const createDeck = (req, res) => {
    try{
        /*post body: {id: Number, username: String,
            description: String} */

        pool.query(`insert into stfc_deck values (${req.body.id}, '${req.body.username}', '${req.body.description}' );`);

    }catch(err){
        console.log('error in stFC creating user', err);
    }
}



// TODO: finish query
const getFlashCards = (req, res) => {
    /* given a deck id get list of id's for the deck
        params: 
            id: Integer */
    try{
        res.status(200)
    }catch(err){
        res.status(500);
    }
}

module.exports = {checkUser, createUser, createDeck};