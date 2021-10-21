"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const gas_service_1 = __importDefault(require("../services/gas.service"));
const log = (0, debug_1.default)('app:gas-controller');
class GasController {
    createGas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield gas_service_1.default.create(req.body);
            res.status(201).send({ id: id });
        });
    }
    listGas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gasList = yield gas_service_1.default.list(100, 0);
            res.status(200).send(gasList);
        });
    }
    getCurrentGas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // call a service to get current gas
            const gas = yield gas_service_1.default.readById(req.body.id);
            res.status(200).send(gas);
        });
    }
    getGasById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gas = yield gas_service_1.default.readById(req.body.id);
            res.status(200).send(gas);
        });
    }
    getGasByBlockNum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gas = yield gas_service_1.default.readByBlockNum(req.body.blockNum);
            res.status(200).send(gas);
        });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield gas_service_1.default.patchById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    deleteGas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield gas_service_1.default.deleteById(req.body.id));
            res.status(204).send();
        });
    }
    getAverage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const average = 1337; // replace with getAverage service
            res.status(200).send({
                error: false,
                message: {
                    averageGasPrice: average,
                    fromTime: req.query.fromTime,
                    toTime: req.query.toTime
                }
            });
        });
    }
}
exports.default = new GasController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nYXMvY29udHJvbGxlcnMvZ2FzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBMEI7QUFFMUIsMEVBQWlEO0FBRWpELE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRXpELE1BQU0sYUFBYTtJQUNULFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN2RCxNQUFNLEVBQUUsR0FBRyxNQUFNLHFCQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNyRCxNQUFNLE9BQU8sR0FBRyxNQUFNLHFCQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFSyxhQUFhLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDM0Qsb0NBQW9DO1lBQ3BDLE1BQU0sR0FBRyxHQUFHLE1BQU0scUJBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDeEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxxQkFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7S0FBQTtJQUVLLGdCQUFnQixDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzlELE1BQU0sR0FBRyxHQUFHLE1BQU0scUJBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQUE7SUFFSyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDbkQsR0FBRyxDQUFDLE1BQU0scUJBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDdkQsR0FBRyxDQUFDLE1BQU0scUJBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3hELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLGtDQUFrQztZQUN4RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osT0FBTyxFQUFFO29CQUNMLGVBQWUsRUFBRSxPQUFPO29CQUN4QixRQUFRLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUM1QixNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUMzQjthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsSUFBSSxhQUFhLENBQUMifQ==