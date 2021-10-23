export interface CreateGas {
    fast: number,
    average: number,
    low: number,
    blockNum: number
}

export interface GasAverage {
    averageGasPrice: number,
    fromTime: number,
    toTime: number
}