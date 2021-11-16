import debug from 'debug';

import GasModel, { CreateGas } from '../models/gas.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class GasDao {
  async addGas(gasFields: CreateGas) {
    const gas = new GasModel({
      ...gasFields,
    });

    await gas.save();
    return gas.id;
  }

  async getCurrentGas() {
    return GasModel.findOne(
      {},
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0
      },
      { lean: true }
    ).sort('-blockNum').exec();
  }

  async getGasInRange(fromTime: number, toTime: number) {
    return GasModel.find({
      createdAt: {
        $gte: new Date(fromTime * 1000),
        $lte: new Date(toTime * 1000)
      }
    }).exec();
  }

  async getGasById(id: string) {
    return GasModel.findOne(
      { _id: id },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0
      },
      { lean: true }
    ).exec();
  }

  async getGasByBlockNum(blockNum: number) {
    return GasModel.findOne(
      { blockNum },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0
      },
      { lean: true }
    ).exec();
  }
}

export default new GasDao();
