const chai = require('chai');
const chaiHttp = require('chai-http');
const helper = require('../helper');

const should = chai.should();
const { config } = helper;
const app = require('../../server/app')(config);

chai.use(chaiHttp);

describe('The Application', () => {
    beforeEach(async () => helper.before());
    afterEach(async () => helper.after());
    it('should have a functional index route', async () => {
        const res = await chai.request(app).get('/');
        res.should.have.status(200);
    });
    it('should have a registration route for new dog walkers', async () => {
        const res = await chai.request(app).get('/users/registration');
        res.should.have.status(200);
    });
    it('should have a route for the walkers list of walks', async () => {
        const res = await chai.request(app).get('/walker/walks');
        res.should.have.status(200);
    });
    it('should have a route for the walkers schedule', async () => {
        const res = await chai.request(app).get('/walker/schedule');
        res.should.have.status(200);
    });
    it('should have a route for the walkers to update profile information', async () => {
        const res = await chai.request(app).get('/walker/update-profile');
        res.should.have.status(200);
    });
    it('should have a route for the walkers to invite dog owners', async () => {
        const res = await chai.request(app).get('/walker/invite');
        res.should.have.status(200);
    });
});
