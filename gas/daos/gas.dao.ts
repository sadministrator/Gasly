import shortid from 'shortid';
import debug from 'debug';

import { CreateGas, PatchGas } from '../models/gas.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class GasDao {
  gasArray: Array<CreateGas> = [];

  constructor() {
    log('Created new instance of gasArray.');
  }

  async addGas(gas: CreateGas) {
    gas.id = shortid.generate();
    this.gasArray.push(gas);

    return gas.id;
  }

  async getGasById(id: string) {
    return this.gasArray.find(gas => gas.id === id);
  }

  async getGasByBlockNum(blockNum: number) {
    return this.gasArray.find(gas => gas.blockNum === blockNum);
  }
}

export default new GasDao();
