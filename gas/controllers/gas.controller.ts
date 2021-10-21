import express from 'express';
import debug from 'debug';

import gasService from '../services/gas.service';

const log: debug.IDebugger = debug('app:gas-controller');

class GasController {
    async createGas(req: express.Request, res: express.Response) {
        const id = await gasService.create(req.body);
        res.status(201).send({ id: id });
    }

    async getCurrentGas(req: express.Request, res: express.Response) {
        // call a service to get current gas
        const gas = await gasService.readById(req.body.id);
        res.status(200).send(gas);
    }

    async getGasById(req: express.Request, res: express.Response) {
        const gas = await gasService.readById(req.body.id);
        res.status(200).send(gas);
    }

    async getGasByBlockNum(req: express.Request, res: express.Response) {
        const gas = await gasService.readByBlockNum(req.body.blockNum);
        res.status(200).send(gas);
    }

    async getAverage(req: express.Request, res: express.Response) {
        const average = 1337; // replace with getAverage service
        res.status(200).send({
            error: false,
            message: {
                averageGasPrice: average,
                fromTime: req.query.fromTime,
                toTime: req.query.toTime
            }
        });
    }
}

export default new GasController;