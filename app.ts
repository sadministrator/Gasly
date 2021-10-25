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

import CommonRoutesConfig from './common/common.routes.config';
import GasRoutes from './gas/gas.routes.config';
import PollGas from './gas/services/gas.poll.service';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const PORT = process.env.PORT;
const routes: Array<CommonRoutesConfig> = [];
const seconds = 10;
const log: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // log requests as one-liners when not debugging
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new GasRoutes(app));

const runningMessage = `Server running at http://localhost:${PORT}.`;
const pollingMessage = `Polling gas prices every ${seconds} seconds.`;
server.listen(PORT, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        log(`Configuring ${route.getName()}`);
    });
    console.log(runningMessage);
    new PollGas(seconds);
    console.log(pollingMessage);
});
