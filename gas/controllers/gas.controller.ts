import express from 'express';
import debug from 'debug';

import gasService from '../services/gas.service';
import { CreateGas } from '../models/gas.dto';

const log: debug.IDebugger = debug('app:gas-controller');

class GasController {
    async createGas(req: express.Request, res: express.Response) {
        const id = await gasService.create(req.body);

        return res.status(201).send({ id: id });
    }

    async getCurrentGas(req: express.Request, res: express.Response) {
        const gas = await gasService.readCurrentGas();

        return res.status(200).send({
            error: false,
            message: {
                ...gas
            }
        });
    }

    async getGasById(req: express.Request, res: express.Response) {
        const gas = await gasService.readById(req.body.id);

        return res.status(200).send({
            error: false,
            message: {
                ...gas
            }
        });
    }

    async getGasByBlockNum(req: express.Request, res: express.Response) {
        const gas = await gasService.readByBlockNum(req.body.blockNum);

        return res.status(200).send({
            error: false,
            message: {
                ...gas
            }
        });
    }

    async getAverage(req: express.Request, res: express.Response) {
        const fromTime = parseInt(req.query.fromTime as string);
        const toTime = parseInt(req.query.toTime as string);
        const gasInRange = await gasService.readGasInRange(fromTime, toTime);

        if (gasInRange.length === 0) {
            return res.status(404).send({
                error: true,
                message: 'No blocks found within that time range.'
            });
        }

        const averagePerBlock = gasInRange.map((gas: CreateGas) => {
            return (gas.fast + gas.average + gas.low) / 3;
        });
        const totalAverage = averagePerBlock
            .reduce((a: number, b: number) => a + b) / averagePerBlock.length;

        return res.status(200).send({
            error: false,
            message: {
                averageGasPrice: totalAverage,
                fromTime,
                toTime
            }
        });
    }
}

export default new GasController;