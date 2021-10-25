import GasDao from '../daos/gas.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateGas } from '../models/gas.dto';

class GasService implements CRUD {
  async create(resource: CreateGas) {
    return GasDao.addGas(resource);
  }

  async readCurrentGas() {
    return GasDao.getCurrentGas();
  }

  async readGasInRange(fromTime: number, toTime: number) {
    return GasDao.getGasInRange(fromTime, toTime);
  }

  async readById(id: string) {
    return GasDao.getGasById(id);
  }

  async readByBlockNum(blockNum: number) {
    return GasDao.getGasByBlockNum(blockNum);
  }
}

export default new GasService();