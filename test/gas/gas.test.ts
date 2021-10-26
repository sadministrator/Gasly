import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

const fromTime = Math.floor(new Date().getTime() / 1000);
const toTime = fromTime + 60;
const gasBody = {
  fast: Math.floor(Math.random() * 100),
  average: Math.floor(Math.random() * 100),
  low: Math.floor(Math.random() * 100),
  blockNum: Math.floor(Math.random() * 100)
}
const blockNum = gasBody.blockNum;

describe('Gas Tests', function() {
  let request: supertest.SuperAgentTest;

  before(function() {
    request = supertest.agent(app);
  });

  after(function(done) {
    // shut down the Express server and close MongoDB connection
    app.close(() => {
      mongoose.connection.close(done);
    });
  });

  it('should allow a POST to /gas', async function() {
    const res = await request.post('/gas').send(gasBody);

    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.a('object');
    expect(res.body.id).to.be.a('string');
  });

  it('should allow a GET from /gas', async function() {
    const res = await request.get('/gas').send();

    expect(res.status).to.equal(200);
    expect(res.body.to.not.be.empty);
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.equal(false);
    expect(res.body.message).to.be.an('object');
    expect(res.body.message.fast).to.be.a('number');
    expect(res.body.message.average).to.be.a('number');
    expect(res.body.message.low).to.be.a('number');
    expect(res.body.message.blockNum).to.be.a('number');
  });

  it('should allow a GET from /gas/:blockNum', async function() {
    const res = await request.get(`/gas/${blockNum}`).send();

    expect(res.status).to.equal(200);
    expect(res.body.to.not.be.empty);
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.equal(false);
    expect(res.body.message).to.be.an('object');
    expect(res.body.message.fast).to.be.a('number');
    expect(res.body.message.average).to.be.a('number');
    expect(res.body.message.low).to.be.a('number');
    expect(res.body.message.blockNum).to.be.a('number');
  });

  it('should allow a GET from /gas/average?fromTime=toTime=', async function() {
    const res = await request.get(
      `/gas/average?fromTime=${fromTime}&toTime=${toTime}`
    )
    .send();

    expect(res.status).to.equal(200);
    expect(res.body.to.not.be.empty);
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.equal(false);
    expect(res.body.message).to.be.an('object');
    expect(res.body.message.average).to.be.a('number');
  });
});