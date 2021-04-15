const request = require('supertest');
const app = require('../../app')

beforeAll(done =>{
    done();
})

describe('Sample Test', () => {
    it ('should test that true =nn== true', ()=> {
        expect(true).toBe(true)
    })
})

describe ('Testing api', () => {
    it ('should return result: true', async (done)=>{
        const result = await request(app)
            .get('/structuredFlashCards/userExists/abc');
        expect(result.statusCode).toEqual(200);
        done();
    })
})
describe ('Testing api', () => {
    it ('should return result: true', async (done)=>{
        const result = await request(app)
            .get('/structuredFlashCards/something');
        expect(result.statusCode).toEqual(200);
        done();
    })
})

afterAll(done => {
    done();
})