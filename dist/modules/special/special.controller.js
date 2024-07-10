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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByAvailableOrRented = exports.getByModelOrRented = exports.getAvailableCars = exports.searchCars = void 0;
var db_1 = require("../../db/db");
var rents = db_1.db.collection("rents");
var users = db_1.db.collection("users");
var cars = db_1.db.collection("cars");
var searchCars = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, model, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.query;
                model = params.model;
                if (!model) {
                    res.status(400).json({ message: "Car model is required" });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cars.find({ carModel: { $regex: model, $options: "i" } }).toArray()];
            case 2:
                result = _a.sent();
                if (result.length === 0) {
                    res.status(404).json({ message: "No cars found" });
                    return [2 /*return*/];
                }
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.searchCars = searchCars;
var getAvailableCars = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, model, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.query;
                model = params.model;
                if (!model) {
                    res.status(400).json({ message: "Car model is required" });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cars
                        .find({ carModel: { $regex: model, $options: "i" }, rented: false })
                        .toArray()];
            case 2:
                result = _a.sent();
                if (result.length === 0) {
                    res.status(404).json({ message: "No cars found" });
                    return [2 /*return*/];
                }
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAvailableCars = getAvailableCars;
var getByModelOrRented = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, model, rented, isRented, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.query;
                model = params.model, rented = params.rented;
                isRented = rented === "true" ? true : false;
                if (!model) {
                    res.status(400).json({ message: "Car model is required" });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log(model, isRented);
                return [4 /*yield*/, cars
                        .find({ carModel: { $regex: model, $options: "i" }, rented: isRented })
                        .toArray()];
            case 2:
                result = _a.sent();
                if (result.length === 0) {
                    res.status(404).json({ message: "No cars found" });
                    return [2 /*return*/];
                }
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log(err_3);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getByModelOrRented = getByModelOrRented;
var getByAvailableOrRented = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, model, rented, filter, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.query;
                model = params.model, rented = params.rented;
                filter = {};
                if (model) {
                    filter.carModel = { $regex: model, $options: "i" };
                }
                if (rented !== undefined) {
                    filter.rented = rented === "true"; // Convert string to boolean
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cars.find(filter).toArray()];
            case 2:
                result = _a.sent();
                if (result.length === 0) {
                    res.status(404).json({ message: "No cars found" });
                    return [2 /*return*/];
                }
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getByAvailableOrRented = getByAvailableOrRented;
