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
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:in-memory-dao');
class GasDao {
    constructor() {
        this.gasArray = [];
        log('Created new instance of gasArray.');
    }
    addGas(gas) {
        return __awaiter(this, void 0, void 0, function* () {
            gas.id = shortid_1.default.generate();
            this.gasArray.push(gas);
            return gas.id;
        });
    }
    getGas() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.gasArray;
        });
    }
    getGasById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.gasArray.find(gas => {
                log('gas: ', gas);
                log('id: ', id);
                gas.id === id;
            });
        });
    }
    getGasByBlockNum(blockNum) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.gasArray.find(gas => gas.blockNum === blockNum);
        });
    }
    putGasById(id, gas) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.gasArray.findIndex((gas) => gas.id === id);
            this.gasArray.splice(index, 1, gas);
            return `${id} updated via PUT.`;
        });
    }
    patchGasById(id, gas) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.gasArray.findIndex((gas) => gas.id === id);
            const currentGas = this.gasArray[index];
            const newGas = Object.assign(Object.assign({}, currentGas), gas);
            this.gasArray.splice(index, 1, newGas);
            return `${id} updated via PATCH`;
        });
    }
    deleteGasById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.gasArray.findIndex((gas) => gas.id === id);
            this.gasArray.splice(index, 1);
            return `${id} removed via DELETE.`;
        });
    }
}
exports.default = new GasDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FzLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dhcy9kYW9zL2dhcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBSTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRXhELE1BQU0sTUFBTTtJQUdWO1FBRkEsYUFBUSxHQUFxQixFQUFFLENBQUM7UUFHOUIsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVLLE1BQU0sQ0FBQyxHQUFjOztZQUN6QixHQUFHLENBQUMsRUFBRSxHQUFHLGlCQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEIsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVLLE1BQU07O1lBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxFQUFVOztZQUN6QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QixHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFBO2dCQUNmLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFBO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFSyxnQkFBZ0IsQ0FBQyxRQUFnQjs7WUFDckMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUM7UUFDOUQsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEVBQVUsRUFBRSxHQUFjOztZQUN6QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDbkMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUN2QixDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVwQyxPQUFPLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFSyxZQUFZLENBQUMsRUFBVSxFQUFFLEdBQWE7O1lBQzFDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUNuQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQ3ZCLENBQUM7WUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sTUFBTSxtQ0FBUSxVQUFVLEdBQUssR0FBRyxDQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUV2QyxPQUFPLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFSyxhQUFhLENBQUMsRUFBVTs7WUFDNUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQ25DLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FDdkIsQ0FBQztZQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQixPQUFPLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQztRQUNyQyxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksTUFBTSxFQUFFLENBQUMifQ==