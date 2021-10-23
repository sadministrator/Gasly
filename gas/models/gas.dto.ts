export interface CreateGas {
  blockNum: number,
  fast: number,
  average: number,
  low: number,
}

export interface GasAverage {
  averageGasPrice: number,
  fromTime: number,
  toTime: number
}

export interface EtherscanGas {
  LastBlock: string,
  SafeGasPrice: string,
  ProposeGasPrice: string,
  FastGasPrice: string,
  suggestBaseFee: string,
  gasUsedRatio: string
}