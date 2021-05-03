const returnFailed = (req, res, done, causeFn, err) => {
    // TODO: refactor to remove passing in express request
    res.status(200).json({result: false, message: `The cause is ${causeFn}`});
    console.log(`error in stFC in ${causeFn} with error: ${err}`);
    done();
}

const responseNoQuery = (serverRes, done, obj = null) => {
    serverRes.status(200).json({result: true, ...obj});
    done();
}

const standardResponse = (serverRes, done) => {
    serverRes.status(200).json({result: true});
    done();
}

// this would be used for select statements
// takes in async query and server response callback + done and the obj to send
const responseQuery = (asyncRes, serverRes, done, obj) => {
    if (asyncRes.rows.length == 0){
        // if the response length is 0; means query with no result
        serverRes.status(200).json({result: false})
        done();
    }else{
        // send standard response with object specified
        serverRes.status(200).json({result: true, ...obj});
        done();
    }
}

// TODO: create response for async call instead of chaining in the method repeatedly

module.exports = {
    returnFailed,
    responseNoQuery,
    standardResponse,
    responseQuery
}