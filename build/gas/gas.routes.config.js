"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../common/common.routes.config"));
const gas_middleware_1 = __importDefault(require("./middleware/gas.middleware"));
const gas_controller_1 = __importDefault(require("./controllers/gas.controller"));
class GasRoutes extends common_routes_config_1.default {
    constructor(app) {
        super(app, 'GasRoutes');
    }
    configureRoutes() {
        this.app.route('/gas')
            .get(gas_controller_1.default.getCurrentGas)
            .post(gas_middleware_1.default.validateSameGasDoesntExist, gas_controller_1.default.createGas);
        this.app.param('blockNum', gas_middleware_1.default.extractBlockNum);
        this.app.route('/gas/:blockNum')
            .get(gas_middleware_1.default.validateGas, gas_controller_1.default.getGasByBlockNum);
        this.app.route('/average')
            .get(gas_middleware_1.default.validateRequiredAverageGasFields, gas_controller_1.default.getAverage);
        return this.app;
    }
}
exports.default = GasRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FzLnJvdXRlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9nYXMvZ2FzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSwwRkFBZ0U7QUFDaEUsaUZBQXdEO0FBQ3hELGtGQUF5RDtBQUV6RCxNQUFxQixTQUFVLFNBQVEsOEJBQWtCO0lBQ3ZELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNuQixHQUFHLENBQUMsd0JBQWEsQ0FBQyxhQUFhLENBQUM7YUFDaEMsSUFBSSxDQUNILHdCQUFhLENBQUMsMEJBQTBCLEVBQ3hDLHdCQUFhLENBQUMsU0FBUyxDQUN4QixDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLHdCQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDN0IsR0FBRyxDQUNGLHdCQUFhLENBQUMsV0FBVyxFQUN6Qix3QkFBYSxDQUFDLGdCQUFnQixDQUMvQixDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2FBQ3ZCLEdBQUcsQ0FDRix3QkFBYSxDQUFDLGdDQUFnQyxFQUM5Qyx3QkFBYSxDQUFDLFVBQVUsQ0FDekIsQ0FBQztRQUVKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUE1QkQsNEJBNEJDIn0=