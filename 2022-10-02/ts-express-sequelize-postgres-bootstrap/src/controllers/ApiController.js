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
Object.defineProperty(exports, "__esModule", { value: true });
const TVehicle_1 = require("../models/TVehicle");
class ApiController {
    constructor() {
        this.getVehicles = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const vehicles = yield TVehicle_1.Vehicle.findAll();
            res.send(vehicles);
            next();
        });
        this.getVehicle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const vehicle = yield TVehicle_1.Vehicle.findByPk(req.params.id);
            if (vehicle == null) {
                res.status(404);
                res.send();
            }
            else {
                res.send(vehicle);
            }
            next();
        });
        this.createVehicle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var vehicle;
            try {
                vehicle = yield TVehicle_1.Vehicle.create(req.body);
                res.status(201);
                res.send(vehicle);
            }
            catch (err) {
                res.status(422);
                res.send(err);
            }
            finally {
                next();
            }
        });
        this.updateVehicle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const rowsAffected = yield TVehicle_1.Vehicle.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            if (rowsAffected[0] == 0) {
                res.status(404);
                res.send();
            }
            else {
                res.status(204);
                res.send();
            }
            next();
        });
        this.deleteVehicle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield TVehicle_1.Vehicle.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.send();
            next();
        });
        this.restoreVehicle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield TVehicle_1.Vehicle.restore({
                where: {
                    id: req.params.id
                }
            });
            res.send();
            next();
        });
    }
}
exports.default = ApiController;
