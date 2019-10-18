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
            expect(record).toHaveLength(0);

            await Users.add({username: "daisy", password: "hi"});

            const peeps = await db('users');
            expect(peeps).toHaveLength(1);
        });
    });
    it('should add the provided peep to database', async () => {
        let peep = await Users.add({username: "amanda", password: "hello"});
        expect(peep.username).toBe('amanda');

        peep = await Users.add({username: "melissa", password: "missa"});
        expect(peep.username).toBe('melissa');

        const people = await db('users');
        expect(people).toHaveLength(2)
    })
})