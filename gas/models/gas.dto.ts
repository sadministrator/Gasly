import mongooseService from "../../common/services/mongoose.service";

const mongoose = mongooseService.getMongoose();
const { Schema } = mongoose;

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

const gasSchema = new Schema({
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
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

gasSchema.virtual('unixTime').get(function(this: { createdAt: string }) {
  return Math.floor(new Date(this.createdAt).getTime() / 1000);
});

const GasModel = mongoose.model('Gas', gasSchema);

export default GasModel;