const Users = require('./users-routermodel');
const db = require('../database/dbConfig');
it('should set a testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('user model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
    describe('insert', () =>{
        it('should add a user to the database', async () => {
            const record = await db('users');
            expect(records).toHaveLength(0);
        })
    })
})