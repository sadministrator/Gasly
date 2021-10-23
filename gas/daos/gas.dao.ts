import debug from 'debug';

import mongooseService from '../../common/services/mongoose.service';
import { CreateGas } from '../models/gas.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class GasDao {
  Schema = mongooseService.getMongoose().Schema;
  
  gasSchema = new this.Schema({
    fast: {
      type: Number,
      required: true
    },
    average: {
      type: Number,
      required: true
    },
    low: {
      type: Number,
      required: true
    },
    blockNum: {
      type: Number,
      required: true
    },
  });

  Gas = mongooseService.getMongoose().model('Gas', this.gasSchema);

  constructor() {

  }

  async addGas(gasFields: CreateGas) {
    const gas = new this.Gas({
      ...gasFields
    });

    await gas.save();
    return gas.id;
  }

  async getCurrentGas() {
    return this.Gas.findOne({}, { _id: 0, __v: 0 }).sort('-blockNum');
  }

  async getGasById(id: string) {
    return this.Gas.findOne({ _id: id }, { _id: 0, __v: 0 }).exec();
  }

  async getGasByBlockNum(blockNum: number) {
    return this.Gas.findOne({ blockNum }, { _id: 0, __v: 0 }).exec();
  }
}

export default new GasDao();
