import express from 'express';
import debug from 'debug';

import gasService from '../services/gas.service';

const log: debug.IDebugger = debug('app:gas-middleware');

class GasMiddleware {
  async validateRequiredAverageGasFields(
    req: express.Request, res: express.Response, next: express.NextFunction,
  ) {
    if (req.query && req.query.fromTime && req.query.toTime) {
      next();
    } else {
      res.status(400).send({
        error: true,
        message: 'Missing required fields fromTime and toTime.',
      });
    }
  }

  async validateSameGasDoesntExist(
    req: express.Request, res: express.Response, next: express.NextFunction
  ) {
    const gas = await gasService.readByBlockNum(req.body.blockNum);

    if (!gas) {
      next();
    } else {
      res.status(400).send({ 
        error: true,
        message: 'The gas info for that block already exists.'
      });
    }
  }

  async validateBlockNum(
    req: express.Request, res: express.Response, next: express.NextFunction
  ) {
    // validate blockNum is valid and not in future
    if (true) {
      next();
    } else {
      res.status(404).send({
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
