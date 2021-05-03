const { query } = require('express');
const {Pool} = require('pg');
const dbConfig = require('./dbconfig');
const {
    returnFailed,
    responseNoQuery,
    responseQuery,
    standardResponse
} = require('./standardResponse');

let pool = new Pool({
    user: dbConfig.awsUser,
    database: dbConfig.awsDb,
    password: dbConfig.awsPass,
    host: dbConfig.PGHOST,
    port: 5432
});

// TODO: use pooled connections to the database so the server doesn't crash


// TODO: return to AWS
// let pool = new Pool({
//     user: dbConfig.localuser,
//     database: dbConfig.localdb,
//     host: 'localhost',
//     password: dbConfig.localpass
// })

// has stfc_user (username text primary key, password text);
// has stfc_deck_text (id integer primary key, username text references stfc_user(username), front text, back text);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

/* CREATE */
const createUser = (req, res, done) => {
    /*post body: {username: String, pass: String} */
    try{
        pool.query(`insert into stfc_user values ('${req.body.username}', '${req.body.pass}');`);
        responseNoQuery(res, done);

    }catch(err){
        returnFailed(req, res, done, 'createUser', err);
    }
}

const createDeck = (req, res, done) => {
    /*post body: {id: Number, username: String, description: String} */
    try{

        // TODO: make the id for the deck the aggregate + 1 associated with user

        pool.query(`insert into stfc_deck values (${req.body.id}, '${req.body.username}', '${req.body.description}' );`);
        standardResponse(res, done);
    }catch(err){
        returnFailed(req, res, done, 'createDeck', err);
    }
}

const createCard = (req, res, done) =>{
    /*post body: {id: Number, username: String, description: String} */
    try{

        // TODO: make the id for the deck the aggregate + 1 associated with user

        pool.query(`insert into stfc_card_text values (${req.body.id}, '${req.body.front}', '${req.body.back}' );`);
        standardResponse(res, done);
    }catch(err){
        returnFailed(req, res, done, 'createCard', err);
    }
}

/* READ */

const checkUser = (req, res, done) => {
    /* params: username: String, pass: String */
    try{

        let query = pool.query(`select * from stfc_user where username='${req.params.username}' and password='${req.params.pass}'`);
        query.then((queryRes) => {
            responseQuery(queryRes, res, done, {userId: req.params.username});
        }).catch(() => {
            res.status(200).json({result: false});
        });
    }catch(err){
        returnFailed(req, res, done, 'checkUser', err);
    }
}

const userExists = (req, res, done) => {
    /* params: username: String */
    pool.connect((err, client, endpg) => {
        if (err) throw err;
        client.query(`select username from stfc_user where username = '${req.params.username}'`, undefined, (queryErr, queryRes)=>{
            endpg();
            if (queryErr){
                returnFailed(req, res, done, 'userExists', queryErr);
            }else{
                // return standardResponse(res, done);
                if (queryRes.rows.length === 0){
                    returnFailed(req, res, done, 'userExists', 'no result in Db');   
                }else{
                    standardResponse(res, done);
                }
            }
        });
    });
}

const getDecks = (req, res, done) => {
    /* params: id: Integer, username: String */
    try{
        let query = pool.query(`select id from stfc_deck where username='${req.params.username}';`);
        query.then((qRes) => {
            responseQuery(qRes, res, done, {ids: qRes.rows});
        }).catch(() => {
            res.status(200).json({result: false});
        })
    }catch(err){
        returnFailed(req, res, done, 'getDecks', err);
    }
}

const maxDeckValue = (req, res, done) => {
    try{
        let query = pool.query(`select max(id) from stfc_deck;`)
        query.then(qRes =>{
            //qRes.rows[0] is used since only one value is returned
                //.max is used since that's the property returned by postgres.
            responseQuery(qRes, res, done, {max: qRes.rows[0].max + 1});
        }).catch(err => {
            returnFailed(req, res, done, 'maxDeckValue', err)
        })
    }catch(err){
        returnFailed(req, res, done, 'maxDeckValue async issue', err)
    }
}

const getCards = (req, res, done) => {
    /* params: id: Integer */
    try{
        let query = pool.query(`select front, back from stfc_card_text where id=${req.params.id};`);
        query.then((qRes) => {
            responseQuery(qRes, res, done, {cards: qRes.rows});
        }).catch(() => {
            res.status(200).json({result: false});
        })
    }catch(err){
        returnFailed(req, res, done, 'getCards', err);
    }
}


/* UPDATE */

const setCard = (req, res, done) => {
    /* params: columns: {columnName: String : value: String }[], specifyColumns: {columnName: String : value: String }[] */
    updateColumns('stfc_card_text', req, res, done);
}

const setDeck = (req, res, done) => {
    /* params:  columns: {columnName: String : value: String }[], specifyColumns: {columnName: String : value: String }[]*/
    updateColumns('stfc_deck', req, res, done);
}

const updateColumns = (table, req , res, done) => {
        /* params:  columns: {columnName: String : value: String }[], specifyColumns: {columnName: String : value: String }[]*/
        // TODO: make sure id is specified in columns
    try{
        let updateArg;
        updateArg = req.body.columns.map(arrVal => Object.keys(arrVal).map(key => `${key} = '${arrVal[key]}'`)).join(', ');
        let currentArg;
        currentArg = req.body.specifyColumns.map(arrVal => Object.keys(arrVal).map(key => `${key} = '${arrVal[key]}'`)).join(' AND ');
        pool.query(`update ${table} set ${updateArg} where ${currentArg};`);
        // TODO: check for when update is unsuccessful or not defined
        standardResponse(res, done);
    }catch(err) {
        returnFailed(req, res, done, 'updateColumns', err);
    }
}

/* DELETE */

const delCard = (req, res, done) =>{
        /* params: id, front, back */
        let result = req.params;
        if (result.front == undefined && result.back == undefined){
            returnFailed(req, res, done, 'deleting card', 'no back and/or front');
        }

        let specificParam = `${result.front === undefined ? `` : `AND front = '${result.front}'`} ${result.back === undefined ? `` : `AND back = '${result.back}'`}`;
        try{
            pool.query(`delete from stfc_card_text where id = ${result.id} ${specificParam};`);
            standardResponse(res, done);
        }catch(err){
            returnFailed(req, res, done, 'delCard', err);
        }
}

const delDeck = (req, res, done) => {
    try{
        // there's a foreign constraint on stfc_card_text deck to reference id to deck id
        // delete all cards under a given deck id
        pool.query(`delete from stfc_card_text where id = ${req.params.id}`);
        // delete the deck
        pool.query(`delete from stfc_deck where id = ${req.params.id} and username = '${req.params.username}';`);
        console.log(`delete from stfc_deck where id = ${req.params.id} and username = '${req.params.username}';`);
        standardResponse(res, done);
    }catch(err){
        returnFailed(req, res, done, 'delDeck', err);
    }
}

/* Delete the user but following the constraints in database. */
const gatherConstraints = async (req) =>{
    const queryPool = await pool.connect();
    try{
        let ids = await queryPool.query(`select * from stfc_deck where username ='${req.params.username}';`);
        //get the result of db query
        ids = ids.rows;
        //get only id information which will be needed
        ids = ids.map(val => val.id);
        //turn ids' into a string which need to be comma separated
        let stringIds = ids.reduce((acc, val) => acc + ', ' + String(val));
        //delete the cards from each associated deck
        queryPool.query(`delete from stfc_card_text where id in (${stringIds})`);
        //delete the decks associated with a user
        queryPool.query(`delete from stfc_deck where id in (${stringIds})`);
        //finally delete the user
        queryPool.query(`delete from stfc_user where username = '${req.params.username}'`)


    }finally{
        queryPool.release();
    }
}

/* request requires username */
const delUser = (req, res, done) => {
    try{
        gatherConstraints(req);
    }catch(err){
        returnFailed(req, res, done, 'delUser', err);
    }
}



module.exports = {checkUser, 
    createUser, 
    createDeck, 
    createCard,
    userExists, 
    getDecks,
    maxDeckValue, 
    getCards, 
    setCard,
    setDeck,
    delCard,
    delDeck,
    delUser};