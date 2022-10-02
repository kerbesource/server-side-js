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
const path_1 = __importDefault(require("path"));
const TVehicle_1 = require("../models/TVehicle");
class VehiclesController {
    constructor() {
        this.list = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.sendFile(path_1.default.join(__dirname, '../views/vehicles/list.html'), function (err) {
                const status = err ? 500 : 200;
                res.status(status).end();
                next();
            });
        });
        this.getAdd = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.sendFile(path_1.default.join(__dirname, '../views/vehicles/add.html'), function (err) {
                const status = err ? 500 : 200;
                res.status(status).end();
                next();
            });
        });
        this.postAdd = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield TVehicle_1.Vehicle.create(req.body);
            res.redirect('/vehicles');
            next();
        });
        this.getEdit = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.sendFile(path_1.default.join(__dirname, '../views/vehicles/edit.html'), function (err) {
                const status = err ? 500 : 200;
                res.status(status).end();
                next();
            });
        });
        this.postEdit = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield TVehicle_1.Vehicle.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/vehicles');
            next();
        });
        this.postDelete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield TVehicle_1.Vehicle.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/vehicles');
            next();
        });
    }
}
exports.default = VehiclesController;
