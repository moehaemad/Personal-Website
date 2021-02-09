const axios = require ('axios');

// TODO: install jest after successfully pushing the REST API to production (I realize this is bad)

let url = 'http://localhost:3000/structuredFlashCards/';

let users = [
    {username: "testUser1", password: "testUser1"},
    {username: "testUser2", password: "testUser2"},
    {username: "testUser3", password: "testUser3"},
    {username: "testUser4", password: "testUser4"}
]

let decks = [
    {id: "10", username: "testUser1", description: "test deck"},
    {id: "9", username: "testUser1", description: "test deck"},
    {id: "8", username: "testUser2", description: "test deck"},
    {id: "7", username: "testUser2", description: "test deck"},
    {id: "6", username: "testUser3", description: "test deck"},
    {id: "5", username: "testUser4", description: "test deck"}
]

let cards = [
    {id: "10", front: "test", back: "test"},
    {id: "10", front: "test1", back: "test1"},
    {id: "10", front: "test2", back: "test2"},
    {id: "9", front: "test", back: "test"},
    {id: "8", front: "test", back: "test"},
    {id: "7", front: "test", back: "test"},
    {id: "7", front: "test", back: "test"},
    {id: "7", front: "unsafeUpdate", back: "unsafeUpdate"}
]

const createUser = async (user, password) => {
    let postData = {
        username: user,
        pass: password
    }
    let query = await axios.post(url + 'createUser', postData);
    // expect query.data.result === true
    return query.data;
}

const createUsersTest = async ()=>{
    for (const user of users){
        createUser(user.usernamem, user.password);
    }
}

const createDeck = async (deckId, deckUser, deckDesc) => {
    let postData = {
        id: deckId,
        username: deckUser,
        description: deckDesc
    }
    let query = await axios.post(url + 'createUser', postData);
    // expect query.data.result === true
    return query.data;
}

const createDecksTest = async () => {
    for (const deck of decks){
        createDeck (deck.id, deck.username, deck.description);
    }
}

const createCard = async (deckId, deckFront, deckBack) => {
    let postData = {
        id: deckId,
        front: deckFront,
        back: deckBack
    }
    let query = await axios.post(url + 'createUser', postData);
    // expect query.data.result === true
    return query.data;
}

const createCardsText = async () => {
    for (const card of cards){
        createCard(card.id, card.front, card.back);
    }
}

const checkUser = async (username, pass) => {
    let query = await axios.get(url + `checkUser/${username}/${pass}`);
    // expect query.data.result === true
    return query.data;
}

// TODO: use jest to effectively check GET requests

const getDeck = async (deckId, username) => {
    let query = await axios.get(url + `getDecks/${deckId}/${username}`);
    // expect query.data.result === true, Ex: query.data.ids == [{id: 1}]
    return query.data;
}

const getCard = async (deckId) => {
    let query = await axios.get(url + `getCards/${deckId}`);
    // expect query.data.result === true, Ex: query.data.ids == [{id: 1}]
    return query.data;
}

const setCard = async (update, specify) => {
    let update = {
        columns: update,
        specifyColumns: specify
    }
    let query = await axios.put(url + 'setCard', update);
    return query.data;
}

const setCardTests = async () =>{ 
    let updateParams = [
        // update all 3 columns
        {update: [{id: "9"},{front: "test"},{back: "test"}] , specify: [{id: "10"},{front: "test"},{back: "test"}]},
        // update only front
        {update: [{front: "updatedtest1"}] , specify: [{id: "10"},{front: "test1"},{back: "test1"}]},
        // update only back
        {update: [{back: "updatedtest2"}] , specify: [{id: "10"},{front: "test2"},{back: "test2"}]},
        // update front and back without id (unsafe)
        // TODO: fix this unsafe update
        {update: [{id: "7"}, {front: "very unsafe"}, {back: "very unsafe"}] , specify: [{front: "unsafeUpdate"},{back: "unsafeUpdate"}]}
    ];
    for (const updateParam of updateParams){
        setCard(updateParam.update, updateParam.specify);
    }
}

const setDeck = async (toUpdate, toSpecify) => {
    let query = axios.put(url + '/setDeck', {columns: toUpdate, specifyColumns: toSpecify})
}

const setDeckTests = async () => {
    let updateParams = [
        // update all 3 and set deck
        // test user 3 will no longer have a deck associated with it
        {update: [{id: "4"},{username: "testUser4"},{description: "updated deck"}], specify: [{id: "6"},{username: "testUser3"},{description: "test deck"}]},
        // update description
        {update: [{description: "updated deck"}], specify: [{id: "5"},{username: "testUser4"},{description: "test deck"}]},
        // update username
        // deck 8 will be associated with testUser1
        {update: [{username: "testUser1"}], specify: [{id: "8"},{username: "testUser2"},{description: "test deck"}]},
        // update description of deck 9
        {update: [{description: "updated deck 9 for testUser 1"}], specify: [{id: "9"},{username: "testUser1"},{description: "test deck"}]},
        // unsafe update without id
        {update: [{id: "11"},{username: "testUser1"},{description: "unsafe update for deck 10 -> 11 testUser1"}], specify: [{username: "testUser1"},{description: "test deck"}]}
    ];
    for (const updateParam of updateParams){
        setDeck(updateParam.update, updateParam.specify);
    }
}

const delCard = async (deckId, front, back) => {
    let query = await axios.delete(url + `delCard/${deckId}/${front}/${back}`);
    // expect query.data.result === true
    return query.data;
}

const delCardTests = async () =>{ 
    let deleteParams = [
        {id: "9", front: "test", back: "test"},
        {id: "10", front: "updatedtest1", back: "test1"},
        {id: "10", front: "test2", back: "updatedtest2"},
        {id: "7", front: "very unsafe", back: "very unsafe"},
        // rest of the cards that were not updated
        {id: "9", front: "test", back: "test"},
        {id: "8", front: "test", back: "test"},
        {id: "7", front: "test", back: "test"},
        {id: "7", front: "test", back: "test"}

    ];
    for (const deleteParam of deleteParams){
        delCard(deleteParams.id, deleteParams.front, deleteParams.back);
    }
}

const delDeck = async (deckId, username) => {
    let query = await axios.delete(url + `delDeck/${deckId}/${username}`);
    // expect query.data.result === true
    return query.data;
}

const deleteDeckTests = async () => {
    let deleteParams = [
        // update
        {id: "11", username: "testUser1", description: "unsafe update for deck 10 -> 11 testUser1"},
        // update
        {id: "9", username: "testUser1", description: "updated deck 9 for testUser 1"},
        // update
        {id: "8", username: "testUser1", description: "test deck"},
        {id: "7", username: "testUser2", description: "test deck"},
        // update
        {id: "4", username: "testUser4", description: "updated deck"},
        // update
        {id: "5", username: "testUser4", description: "updated deck"}
    ];

    for (const deleteParam of deleteParams){
        delDeck(deleteParam.id, deleteParam.username);
    }

}