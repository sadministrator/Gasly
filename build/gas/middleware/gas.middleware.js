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
const log = (0, debug_1.default)('app:gas-middleware');
class GasMiddleware {
    validateRequiredAverageGasFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query && req.query.fromTime && req.query.toTime) {
                next();
            }
            else {
                res.status(400).send({
                    error: true,
                    message: 'Missing required fields fromTime and toTime.',
                });
            }
        });
    }
    validateSameGasDoesntExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const gas = yield gas_service_1.default.readById(req.body.id);
            if (!gas) {
                next();
            }
            else {
                log(gas);
                res.status(400).send({
                    error: true,
                    message: 'The gas info for that block already exists.'
                });
            }
        });
    }
    validateGas(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate blockNum is valid and not in future
            if (true) {
                next();
            }
            else {
                res.status(404).send({
                    error: true,
                    message: 'The gas information for that block doesn\'t exist.'
                });
            }
        });
    }
    extractBlockNum(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.blockNum = parseInt(req.params.blockNum);
            next();
        });
    }
}
exports.default = new GasMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FzLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nYXMvbWlkZGxld2FyZS9nYXMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUEwQjtBQUUxQiwwRUFBaUQ7QUFFakQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFekQsTUFBTSxhQUFhO0lBQ1gsZ0NBQWdDLENBQ3BDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjs7WUFFdkUsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUN2RCxJQUFJLEVBQUUsQ0FBQzthQUNSO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNuQixLQUFLLEVBQUUsSUFBSTtvQkFDWCxPQUFPLEVBQUUsOENBQThDO2lCQUN4RCxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtJQUVLLDBCQUEwQixDQUM5QixHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7O1lBRXZFLE1BQU0sR0FBRyxHQUFHLE1BQU0scUJBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLElBQUksRUFBRSxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNuQixLQUFLLEVBQUUsSUFBSTtvQkFDWCxPQUFPLEVBQUUsNkNBQTZDO2lCQUN2RCxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FDZixHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7O1lBRXZFLCtDQUErQztZQUMvQyxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLEVBQUUsQ0FBQzthQUNSO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNuQixLQUFLLEVBQUUsSUFBSTtvQkFDWCxPQUFPLEVBQUUsb0RBQW9EO2lCQUM5RCxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtJQUVLLGVBQWUsQ0FDbkIsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCOztZQUV2RSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxhQUFhLEVBQUUsQ0FBQyJ9