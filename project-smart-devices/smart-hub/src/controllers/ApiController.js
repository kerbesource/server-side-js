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
const Database_1 = require("../system/Database");
const WebSocketService_1 = require("../services/WebSocketService");
class ApiController {
    constructor() {
        this.report = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const document = {
                deviceId: req.params.deviceId,
                value: req.body
            };
            const db = Database_1.Database.getDb();
            const collection = db.collection('reports');
            yield collection.insertOne(document);
            WebSocketService_1.Service.refreshFrontend(document);
            res.send({ success: true });
            next();
        });
    }
}
exports.default = ApiController;
