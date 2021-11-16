import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import CommonRoutesConfig from './common/common.routes.config';
import GasRoutes from './gas/gas.routes.config';
import PollGas from './gas/services/gas.poll.service';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const PORT = process.env.PORT;
const routes: Array<CommonRoutesConfig> = [];
const seconds = 10;
const log: debug.IDebugger = debug('app');
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (process.env.DEBUG === 'debug') {
    loggerOptions.meta = false; // terse output when not debugging
    if (typeof global.it === 'function') {
        loggerOptions.level = 'http'; // no logging on tests
    }
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new GasRoutes(app));

const runningMessage = `Server running at http://localhost:${PORT}.`;
const pollingMessage = `Polling gas prices every ${seconds} seconds.`;

export default server.listen(PORT, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        log(`Configuring ${route.getName()}`);
    });
    log(runningMessage);
    new PollGas(seconds);
    log(pollingMessage);
});
