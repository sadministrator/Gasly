export interface CreateGas {
    id: string,
    fast: number,
    average: number,
    low: number,
    blockNum: number
}

export interface PatchGas extends Partial<CreateGas> {};

export interface GasAverage {
    averageGasPrice: number,
    fromTime: number,
    toTime: number
}