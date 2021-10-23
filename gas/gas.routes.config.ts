import * as express from 'express';

import CommonRoutesConfig from '../common/common.routes.config';
import gasMiddleware from './middleware/gas.middleware';
import gasController from './controllers/gas.controller';

export default class GasRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'GasRoutes');
  }

  configureRoutes() {
    this.app.route('/gas')
      .get(gasController.getCurrentGas)
      .post(
        gasMiddleware.validateSameGasDoesntExist,
        gasController.createGas
      );

    this.app.param('blockNum', gasMiddleware.extractBlockNum);
    this.app.route('/gas/:blockNum')
      .get(
        gasMiddleware.validateBlockNum,
        gasController.getGasByBlockNum
      );

    this.app.route('/average')
      .get(
        gasMiddleware.validateRequiredAverageGasFields,
        gasController.getAverage
      );

    return this.app;
  }
}
