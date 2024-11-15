const request = require('supertest');
const app = require('../server');  // Adjust path if needed

describe('API Tests', () => {
    let token;  // Variable to store auth token

    beforeAll(async () => {
        // Login to obtain token
        const res = await request(app).post('/api/login').send({
            username: 'validUser',
            password: 'validPassword',
        });
        token = res.body.token;
    });

    test('1. Validate login with correct credentials', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'validUser', password: 'validPassword' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        console.log("1. Validate login with correct credentials ---> PASSED");
    });

    test('2. Validate error message on invalid login', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'invalidUser', password: 'wrongPassword' });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', 'Invalid credentials');
        console.log("2. Validate error message on invalid login ---> PASSED");
    });

    test('3. Verify event creation', async () => {
        const res = await request(app)
            .post('/api/events')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'New Event', date: '2024-11-30' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('New Event');
        console.log("3. Verify event creation ---> PASSED");
    });

    test('4. Test login followed by event creation', async () => {
        const loginRes = await request(app)
            .post('/api/login')
            .send({ username: 'validUser', password: 'validPassword' });

        const eventRes = await request(app)
            .post('/api/events')
            .set('Authorization', `Bearer ${loginRes.body.token}`)
            .send({ name: 'Chained Event', date: '2024-12-01' });

        expect(eventRes.statusCode).toBe(201);
        expect(eventRes.body.name).toBe('Chained Event');
        console.log("4. Test login followed by event creation ---> PASSED");
    });

    test('5. Test event creation and RSVP', async () => {
        const eventRes = await request(app)
            .post('/api/events')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'RSVP Event', date: '2024-12-02' });

        const rsvpRes = await request(app)
            .post(`/api/events/${eventRes.body.id}/rsvp`)
            .set('Authorization', `Bearer ${token}`);

        expect(rsvpRes.statusCode).toBe(200);
        expect(rsvpRes.body).toHaveProperty('message', 'RSVP successful');
        console.log("5. Test event creation and RSVP ---> PASSED");
    });

    test('6. Test event search functionality', async () => {
        const res = await request(app).get('/api/events/search?query=Event');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        console.log("6. Test event search functionality ---> PASSED");
    });

    test('7. Test full flow from login to RSVP', async () => {
        const loginRes = await request(app)
            .post('/api/login')
            .send({ username: 'validUser', password: 'validPassword' });

        const eventRes = await request(app)
            .post('/api/events')
            .set('Authorization', `Bearer ${loginRes.body.token}`)
            .send({ name: 'Flow Event', date: '2024-12-03' });

        const rsvpRes = await request(app)
            .post(`/api/events/${eventRes.body.id}/rsvp`)
            .set('Authorization', `Bearer ${loginRes.body.token}`);

        expect(rsvpRes.statusCode).toBe(200);
        expect(rsvpRes.body).toHaveProperty('message', 'RSVP successful');
        console.log("7. Test full flow from login to RSVP ---> PASSED");
    });

    test('8. Test feedback submission and error handling', async () => {
        const res = await request(app)
            .post('/api/feedback')
            .set('Authorization', `Bearer ${token}`)
            .send({ eventId: 1, feedback: 'Great event!' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Feedback submitted');
        console.log("8. Test feedback submission ---> PASSED");

        const errorRes = await request(app)
            .post('/api/feedback')
            .set('Authorization', `Bearer ${token}`)
            .send({ feedback: 'Missing eventId' });

        expect(errorRes.statusCode).toBe(400);
        expect(errorRes.body).toHaveProperty('error', 'Event ID is required');
        console.log("8. Test feedback submission error handling ---> PASSED");
    });

    test('9. Verify search functionality across modules', async () => {
        const res = await request(app).get('/api/search?query=multi-module');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('results');
        expect(Array.isArray(res.body.results)).toBe(true);
        console.log("9. Verify search functionality across modules ---> PASSED");
    });
});
