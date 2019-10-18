const request = require('supertest');
const server = require('./server');

describe('GET', () => {
    it('should return 200', () => {
        return request(server)
        .get('/')
        .then(response => {
            expect(response.status)
            .toBe(200)
        });
    });
    test('should return json', async () =>{
        const response = await request(server).get('/');

        expect(response.type).toMatch(/json/i);
    });
})