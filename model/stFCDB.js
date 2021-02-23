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



module.exports = {checkUser, 
    createUser, 
    createDeck, 
    createCard, 
    getDecks, 
    getCards, 
    setCard,
    setDeck,
    delCard,
    delDeck};