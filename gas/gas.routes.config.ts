import * as express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';

export class GasRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'GasRoutes');
    }

    configureRoutes() {
        this.app.route('/gas')
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send('Here\'s your gas.');
            });

        this.app.route('/average')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // check if fromTime and toTime query strings exist
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send('Here\'s the average: ' + JSON.stringify(req.query));
            });

        return this.app;
    }
}