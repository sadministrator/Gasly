import express from 'express';
import axios from 'axios';
import debug from 'debug';

import { CreateGas, EtherscanGas } from '../models/gas.dto';
require('dotenv').config();

const log: debug.IDebugger = debug('app:poll-gas');
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY!;
const ETHERSCAN_GAS_ENDPOINT = process.env.ETHERSCAN_GAS_ENDPOINT!;

class PollGas {
  constructor(seconds: number) {
    this.callPeriodically(seconds);
  }

  async getCurrentGas() {
    try {
      const response: any = await axios.get(ETHERSCAN_GAS_ENDPOINT + ETHERSCAN_API_KEY);
      log(response.data.result);

      const etherscanGas: EtherscanGas = response.data.result as EtherscanGas;
      const gas: CreateGas = this.convertEtherscanObject(etherscanGas);
      
      await axios.post('http://localhost:3000/gas', gas);
    } catch (error) {
      log(error);
    }
  }

  callPeriodically(seconds: number) {
    this.getCurrentGas();

    const millis = seconds * 1000;
    setTimeout(() => {
      this.callPeriodically(seconds);
    }, millis);
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