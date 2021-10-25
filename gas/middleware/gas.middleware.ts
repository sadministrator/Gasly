import express, { query } from 'express';
import debug from 'debug';

import gasService from '../services/gas.service';

const log: debug.IDebugger = debug('app:gas-middleware');

class GasMiddleware {
  validateRequiredAverageGasFields = async (
    req: express.Request, res: express.Response, next: express.NextFunction,
  ) => {
    if(!await this.isValidAverageQuery(req, res, next)) {
      return res.status(400).send({
        error: true,
        message: 'Missing required fields \'fromTime\' and/or \'toTime.\'',
      });
    } else if (!await this.isValidAverageDates(req, res, next)) {
      return res.status(400).send({
        error: true,
        message: 'Invalid values for \'fromTime\' and/or \'toTime\'.'
      });
    } else {
      next();
    }
  }

  async isValidAverageQuery(
    req: express.Request, res: express.Response, next: express.NextFunction
  ) {
    if ( // query arguments exist and are both strings
      req.query &&
      req.query.fromTime &&
      req.query.toTime &&
      typeof(req.query.toTime) === 'string' &&
      typeof(req.query.fromTime) === 'string'
    ) {
      return true;
    } else {
      return false;
    }
  }

  isValidAverageDates = async (
    req: express.Request, res: express.Response, next: express.NextFunction
  ) => {
    const fromTime = parseInt(req.query.fromTime as string);
    const toTime = parseInt(req.query.toTime as string);
    const currentTime = Math.floor(new Date().getTime() / 1000);

    if ( // query arguments are not in the future, in the wrong order, and are valid Dates
      await this.isValidDate(fromTime) &&
      await this.isValidDate(toTime) &&
      fromTime <= currentTime &&
      toTime <= currentTime &&
      fromTime <= toTime &&
      this.isValidDate(fromTime) &&
      this.isValidDate(toTime)
    ) {
      return true;
    } else {
      return false;
    }
  }

  async isValidDate(date: number | Date) {
    const isValid = new Date(date).getTime() > 0;

    return isValid;
  }

  async validateSameGasDoesntExist(
    req: express.Request, res: express.Response, next: express.NextFunction
  ) {
    const gas = await gasService.readByBlockNum(req.body.blockNum);

    if (!gas) {
      next();
    } else {
      log('The gas info for that block already exists');
      return res.status(400).send({ 
        error: true,
        message: 'The gas info for that block already exists.'
      });
    }
  }

  async validateBlockNum(
    req: express.Request, res: express.Response, next: express.NextFunction
  ) {
    const gas = await gasService.readByBlockNum(req.body.blockNum);

    if (gas) {
      next();
    } else {
      return res.status(404).send({
        error: true,
        message: 'The gas information for that block doesn\'t exist.'
      });
    }
  }

  async extractBlockNum(
    req: express.Request, res: express.Response, next: express.NextFunction
  ) {
    req.body.blockNum = parseInt(req.params.blockNum);
    next();
  }
}

export default new GasMiddleware();
