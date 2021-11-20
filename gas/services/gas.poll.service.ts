import axios from 'axios';
import debug from 'debug';

import { CreateGas, EtherscanGas } from '../models/gas.dto';

const log: debug.IDebugger = debug('app:poll-gas');
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY!;
const ETHERSCAN_GAS_ENDPOINT = process.env.ETHERSCAN_GAS_ENDPOINT!;
const PORT = process.env.PORT;
const SERVER = process.env.SERVER;

class PollGas {
  constructor(seconds: number) {
    setInterval(this.getCurrentGas, seconds * 1000);
  }

  async getCurrentGas() {
    try {
      const response: any = await axios.get(ETHERSCAN_GAS_ENDPOINT + ETHERSCAN_API_KEY);
      log(response.data.result);

      const etherscanGas: EtherscanGas = response.data.result as EtherscanGas;
      const gas: CreateGas = this.convertEtherscanObject(etherscanGas);
      
      await axios.post(`http://${SERVER}:${PORT}/gas`, gas);
    } catch (error) {
      log(error);
    }
  }

  convertEtherscanObject(response: EtherscanGas) {
    const gas: CreateGas = {
      blockNum: parseInt(response.LastBlock),
      low: parseInt(response.SafeGasPrice),
      average: parseInt(response.ProposeGasPrice),
      fast: parseInt(response.FastGasPrice)
    };

    return gas;
  }
}

export default PollGas;