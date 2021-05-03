const request = require('supertest');
const app = require('../../app')

beforeAll(done =>{
    done();
})

describe('Sample Test', () => {
    test ('should test that true =nn== true', ()=> {
        expect(true).toBe(true)
    })
})

describe ('Testing api', () => {
    test ('should return result: true', async (done)=>{
        const result = await request(app)
            .get('/structuredFlashCards/userExists/something');
        expect(result.statusCode).toEqual(200);
        done();
    })
})
describe ('Testing user', () => {
    test ('should return result: false', async (done)=>{
        const result = await request(app)
            .get('/structuredFlashCards/userExists/%20blank');
        expect(result.body.result).toEqual(false);
        done();
    })
})



afterAll(done => {
    done();
})