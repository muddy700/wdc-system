import { clearCollection, dropTestDB, initializeTestDB } from '../../../config/database'
import request from 'supertest'
import app from '../../../server'
import { rootUser } from '../../accessControl/seeder'
import { User, USER_TYPES } from '../../users/user.model'



describe('POST /api/v1/login ', () => {

    const normalUser = {
        firstName: 'Kija',
        lastName: 'Mabula',
        email: 'kijamabula2@gmail.com',
        password: '123456',
        type: USER_TYPES.USER,
        phoneNumber: '+255713000000',
        status: true
    };
    beforeAll(async () => {
        initializeTestDB();
    });

    afterAll(() => {
        dropTestDB();
    });

    afterEach(() => {
        clearCollection('users')
    })

    beforeEach(async () => {
        const user = await User.create(rootUser)
        
    })

    it('should not allow staff to login with incorrect credentials', async () => {
        let res = await request(app).post('/api/v1/auth/staff/login')
            .send({ email: rootUser.email, password: "wrong password" })
            .expect(401);
        
        expect(res.body.userMessage).toBe(i18n.__('invalid-credentials'))
        expect(res.body.user).toBeNull();
        expect(res.body.token).toBeNull();
    });

    it('should not allow staff users login as normal users', async () => {
        let res = await request(app).post('/api/v1/auth/login')
            .send({ email: rootUser.email, password: rootUser.password })
            .expect(401);
        
        expect(res.body.userMessage).toBe(i18n.__('invalid-credentials'))
        expect(res.body.user).toBeNull();
        expect(res.body.token).toBeNull();
    });

    it('should allow staff with correct credentials to login', async () => {
        let res = await request(app).post('/api/v1/auth/staff/login')
            .send({ email: rootUser.email, password: rootUser.password })
            .expect(200)
        
        expect(res.body.userMessage).toBe(i18n.__('login-success'));
        expect(res.body.user).toBeDefined();
        expect(res.body.token).toBeDefined();
    });

    it('should not allow normal users login as staff', async () => {
        await User.create(normalUser);
        let res = await request(app).post('/api/v1/auth/staff/login').send({
            email: normalUser.email,
            password: normalUser.password
        }).expect(401);

        expect(res.body.userMessage).toBe(i18n.__('invalid-credentials'))
        expect(res.body.user).toBeNull();
        expect(res.body.token).toBeNull();
    })

    it('should not allow normal users login with wrong credentials', async () => {
        await User.create(normalUser);
        let res = await request(app).post('/api/v1/auth/login').send({
            email: normalUser.email,
            password: "wrong password"
        }).expect(401);

        expect(res.body.userMessage).toBe(i18n.__('invalid-credentials'))
        expect(res.body.user).toBeNull();
        expect(res.body.token).toBeNull();
    });

    it('should allow normal users login with correct credentials', async () => {
        await User.create(normalUser);

        let res = await request(app).post('/api/v1/auth/login').send({
            email: normalUser.email,
            password: normalUser.password
        }).expect(200);

        expect(res.body.userMessage).toBe(i18n.__('login-success'));
        expect(res.body.user).toBeDefined();
        expect(res.body.token).toBeDefined();
    });
});