import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');
const DB = process.env.DB;

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    serverSelectionTimeoutMS: 5000
  };

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry = () => {
    log('Attemping MongoDB connection (will retry if needed).');
    mongoose.connect(`mongodb://${DB}:27017/api-db`, this.mongooseOptions)
      .then(() => {
        log('MongoDB is connected successfully.');
      })
      .catch((error) => {
        const retrySeconds = 5;
        log(
          'MongoDB connection unsuccessful.',
          `Will retry #${++this.count} after ${retrySeconds} seconds.`,
          `Error: ${error}`
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}

export default new MongooseService();