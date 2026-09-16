import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import interviewController from '../controllers/interview.controller.js';
import Application from '../models/Application.model.js';
import Interview from '../models/Interview.model.js';

const TEST_USER_ID = new mongoose.Types.ObjectId().toString();

// Test-only app: same controller, no Clerk in the loop at all.
// This one middleware replaces requireAuth + resolveUser combined.
const testApp = express();
testApp.use(express.json());
testApp.use((req, res, next) => {
  req.dbUserId = TEST_USER_ID;
  next();
});
testApp.get('/api/v1/interviews', interviewController.listInterviews);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('GET /api/v1/interviews - Leak Regression Test', () => {
  let appA, appB, interviewA, interviewB;

  beforeEach(async () => {
    await Application.deleteMany({});
    await Interview.deleteMany({});

    appA = await Application.create({
      userId: TEST_USER_ID,
      companyName: 'Company A',
      jobTitle: 'Frontend Engineer',
    });
    appB = await Application.create({
      userId: TEST_USER_ID,
      companyName: 'Company B',
      jobTitle: 'Backend Engineer',
    });

    interviewA = await Interview.create({
      userId: TEST_USER_ID,
      applicationId: appA._id,
      scheduledAt: new Date(),
      notes: 'Interview for App A',
    });
    interviewB = await Interview.create({
      userId: TEST_USER_ID,
      applicationId: appB._id,
      scheduledAt: new Date(),
      notes: 'Interview for App B',
    });
  });

  it('returns ONLY application A interviews when filtered by appA ID', async () => {
    const res = await request(testApp)
      .get(`/api/v1/interviews?applicationId=${appA._id}`)
      .expect(200);

    const interviews = res.body.data || res.body;

    expect(interviews).toHaveLength(1);
    expect(interviews[0]._id.toString()).toBe(interviewA._id.toString());
  });
});
