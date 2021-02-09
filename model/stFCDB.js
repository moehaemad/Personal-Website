const {Pool} = require('pg');
const dbConfig = require('./dbconfig');

// let pool = new Pool({
//     user: dbConfig.awsUser,
//     databse: dbConfig.localdb,
//     password: dbConfig.awsPass,
//     host: dbConfig.PGHOST,
//     port: 5432
// });

// TODO: use pooled connections to the database so the server doesn't crash


// TODO: return to AWS
let pool = new Pool({
    user: dbConfig.localuser,
    database: dbConfig.localdb,
    host: 'localhost',
    password: dbConfig.localpass
})

// has stfc_user (username text primary key, password text);
// has stfc_deck_text (id integer primary key, username text references stfc_user(username), front text, back text);

/* CREATE */
const createUser = (req, res) => {
    try{
        /*post body: {username: String, pass: String} */
        pool.query(`insert into stfc_user values ('${req.body.username}', '${req.body.pass}');`);
        console.log(req.body.username);
        console.log(req.body);
        res.status(200).json({result: true});

    }catch(err){
        console.log('error in stFC creating user', err);
    }
}

const createDeck = (req, res) => {
    try{
        /*post body: {id: Number, username: String,
            description: String} */
        // TODO: make the id for the deck the aggregate + 1 associated with user

        pool.query(`insert into stfc_deck values (${req.body.id}, '${req.body.username}', '${req.body.description}' );`);
        res.status(200).json({result: true});
    }catch(err){
        console.log('error in stFC creating deck', err);
    }
}

const createCard = (req, res) =>{
    try{
        /*post body: {id: Number, username: String,
            description: String} */
        // TODO: make the id for the deck the aggregate + 1 associated with user

        pool.query(`insert into stfc_card_text values (${req.body.id}, '${req.body.front}', '${req.body.back}' );`);
        res.status(200).json({result: true});
    }catch(err){
        console.log('error in stFC creating card', err);
    }
}

/* READ */

const checkUser = (req, res) => {
    /* params: username: String, pass: String */
    try{

        let query = pool.query(`select * from stfc_user where username='${req.params.username}' and password='${req.params.pass}'`);
        query.then(() => {
            res.status(200).json({result: true, userId: req.params.username})
        }).catch(() => {
            res.status(200).json({result: false});
        })
    }catch(err){
        res.status(500);
    }
}

// TODO: finish query
// TODO: create route for this
const getDecks = (req, res) => {
    /* params: id: Integer, username: String */
    try{
        let query = pool.query(`select id from stfc_deck where username='${req.params.username}';`);
        query.then((qRes) => {
            res.status(200).json({result: true, ids: qRes.rows});
        }).catch(() => {
            res.status(200).json({result: false});
        })
    }catch(err){
        res.status(500);
    }
}
// TODO: finish query
// TODO: create route for this
const getCards = (req, res) => {
    /* params: id: Integer */
    try{
        let query = pool.query(`select front, back from stfc_card_text where id=${req.params.id};`);
        query.then((qRes) => {
            res.status(200).json({result: true, cards: qRes.rows});
        }).catch(() => {
            res.status(200).json({result: false});
        })
    }catch(err){
        res.status(500);
    }
}


/* UPDATE */

const setCard = (req, res) => {
    /* params: columns: {columnName: String : value: String }[], specifyColumns: {columnName: String : value: String }[] */
    updateColumns('stfc_card_text', req, res);
}

const setDeckName = (req, res) => {
    /* params:  columns: {columnName: String : value: String }[], specifyColumns: {columnName: String : value: String }[]*/
    updateColumns('stfc_deck', req, res);
}

const updateColumns = (table, req , res) => {
        /* params:  columns: {columnName: String : value: String }[], specifyColumns: {columnName: String : value: String }[]*/
    // TODO: Use setCard or helper function because code is repeated
    try{
        let updateArg;
        updateArg = req.body.columns.map(arrVal => Object.keys(arrVal).map(key => `${key} = '${arrVal[key]}'`)).join(', ');
        let currentArg;
        currentArg = req.body.specifyColumns.map(arrVal => Object.keys(arrVal).map(key => `${key} = '${arrVal[key]}'`)).join(' AND ');
        pool.query(`update ${table} set ${updateArg} where ${currentArg};`);
        console.log(`update ${table} set ${updateArg} where ${currentArg};`)
        // console.log("req", req);
        // console.log("req", res);

        res.status(200).json({result: true});
    }catch(err) {
        res.status(500).send("error updating card in database");
        console.log("error in database", err);
    }
}

/* DELETE */

const delCard = (req, res) =>{
    res.status(200);
}

const delDeck = (req, res) => {
    res.status(200);
}



module.exports = {checkUser, 
    createUser, 
    createDeck, 
    createCard, 
    getDecks, 
    getCards, 
    setCard,
    setDeckName};