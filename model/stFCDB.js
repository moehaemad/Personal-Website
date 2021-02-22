const {Pool} = require('pg');
const dbConfig = require('./dbconfig');

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

const returnFailed = (req, res, done, causeFn, err) => {
    res.status(500).send({status: false, message: `The cause is ${causeFn}`});
    console.log(`error in stFC in ${causeFn} with error: ${err}`);
}

/* CREATE */
const createUser = (req, res, done) => {
    /*post body: {username: String, pass: String} */
    try{
        pool.query(`insert into stfc_user values ('${req.body.username}', '${req.body.pass}');`);
        console.log(req.body.username);
        console.log(req.body);
        res.status(200).json({result: true});

    }catch(err){
        returnFailed(req, res, done, 'createUser', err);
    }
}

const createDeck = (req, res, done) => {
    /*post body: {id: Number, username: String, description: String} */
    try{

        // TODO: make the id for the deck the aggregate + 1 associated with user

        pool.query(`insert into stfc_deck values (${req.body.id}, '${req.body.username}', '${req.body.description}' );`);
        res.status(200).json({result: true});
    }catch(err){
        returnFailed(req, res, done, 'createDeck', err);
    }
}

const createCard = (req, res, done) =>{
    /*post body: {id: Number, username: String, description: String} */
    try{

        // TODO: make the id for the deck the aggregate + 1 associated with user

        pool.query(`insert into stfc_card_text values (${req.body.id}, '${req.body.front}', '${req.body.back}' );`);
        res.status(200).json({result: true});
    }catch(err){
        returnFailed(req, res, done, 'createCard', err);
    }
}

/* READ */

const checkUser = (req, res, done) => {
    /* params: username: String, pass: String */
    try{

        let query = pool.query(`select * from stfc_user where username='${req.params.username}' and password='${req.params.pass}'`);
        query.then(() => {
            res.status(200).json({result: true, userId: req.params.username})
        }).catch(() => {
            res.status(200).json({result: false});
        })
    }catch(err){
        returnFailed(req, res, done, 'checkUser', err);
    }
}

// TODO: finish query
// TODO: create route for this
const getDecks = (req, res, done) => {
    /* params: id: Integer, username: String */
    try{
        let query = pool.query(`select id from stfc_deck where username='${req.params.username}';`);
        query.then((qRes) => {
            console.log(qRes);
            res.status(200).json({result: true, ids: qRes.rows});
        }).catch(() => {
            res.status(200).json({result: false});
        })
    }catch(err){
        returnFailed(req, res, done, 'getDecks', err);
    }
}
// TODO: finish query
// TODO: create route for this
const getCards = (req, res, done) => {
    /* params: id: Integer */
    try{
        let query = pool.query(`select front, back from stfc_card_text where id=${req.params.id};`);
        query.then((qRes) => {
            res.status(200).json({result: true, cards: qRes.rows});
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
    updateColumns('stfc_card_text', req, res);
}

const setDeck = (req, res, done) => {
    /* params:  columns: {columnName: String : value: String }[], specifyColumns: {columnName: String : value: String }[]*/
    updateColumns('stfc_deck', req, res);
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
        console.log(`update ${table} set ${updateArg} where ${currentArg};`)
        res.status(200).json({result: true});
    }catch(err) {
        returnFailed(req, res, done, 'updateColumns', err);
    }
}

/* DELETE */

const delCard = (req, res, done) =>{
        /* params: id, front, back */
        let result = req.params;
        if (result.front == undefined && result.back == undefined) res.status(500).json({result: false});
        let specificParam = `${result.front === undefined ? `` : `AND front = '${result.front}'`} ${result.back === undefined ? `` : `AND back = '${result.back}'`}`;
        try{
            pool.query(`delete from stfc_card_text where id = ${result.id} ${specificParam};`);
            res.status(200).json({result: true});
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
        res.status(200).json({result: true});
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