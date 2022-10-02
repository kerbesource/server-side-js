"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ViewController_1 = __importDefault(require("../controllers/ViewController"));
class Routes {
    constructor() {
        this.router = express_1.default.Router();
        const viewController = new ViewController_1.default();
        this.router.get('', viewController.index);
    }
    getRoutes() {
        return this.router;
    }
}
exports.default = Routes;
