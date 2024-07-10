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
exports.deleteRent = exports.updateRent = exports.addRent = exports.getRent = exports.getRents = void 0;
var db_1 = require("../../db/db");
var mongodb_1 = require("mongodb");
var rents = db_1.db.collection("rents");
var getRents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allRents, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, rents.find().toArray()];
            case 1:
                allRents = _a.sent();
                res.json({ rents: allRents });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRents = getRents;
var addRent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, carId, userId, startDate, returnDate, fields, car, rent, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, carId = _a.carId, userId = _a.userId, startDate = _a.startDate, returnDate = _a.returnDate;
                if (!carId || !userId || !startDate || !returnDate) {
                    fields = ["carId", "userId", "startDate", "returnDate"];
                    return [2 /*return*/, res.status(400).json({ message: "All fields are required", fields: fields })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, db_1.db.collection("cars").findOne({ _id: new mongodb_1.ObjectId(carId) })];
            case 2:
                car = _b.sent();
                if (!car) {
                    return [2 /*return*/, res.status(404).json({ message: "Car not found" })];
                }
                if (car.rented) {
                    return [2 /*return*/, res.status(400).json({ message: "Car is already rented" })];
                }
                return [4 /*yield*/, rents.insertOne({
                        carId: new mongodb_1.ObjectId(carId),
                        userId: new mongodb_1.ObjectId(userId),
                        startDate: startDate,
                        returnDate: returnDate,
                    })];
            case 3:
                rent = _b.sent();
                return [4 /*yield*/, db_1.db.collection("cars").updateOne({ _id: new mongodb_1.ObjectId(carId) }, { $set: { rented: true } })];
            case 4:
                _b.sent();
                res.json({ message: "Rent added successfully" });
                return [3 /*break*/, 6];
            case 5:
                e_2 = _b.sent();
                console.log(e_2);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addRent = addRent;
var updateRent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, startDate, returnDate, rent, updatedRent, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, startDate = _a.startDate, returnDate = _a.returnDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, rents.findOne({ _id: new mongodb_1.ObjectId(id) })];
            case 2:
                rent = _b.sent();
                if (!rent) {
                    return [2 /*return*/, res.status(404).json({ message: "Rent not found" })];
                }
                return [4 /*yield*/, rents.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { startDate: startDate, returnDate: returnDate } })];
            case 3:
                _b.sent();
                return [4 /*yield*/, rents
                        .aggregate([
                        { $match: { _id: new mongodb_1.ObjectId(id) } },
                        {
                            $lookup: {
                                from: "cars",
                                localField: "carId",
                                foreignField: "_id",
                                as: "car",
                            },
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "userId",
                                foreignField: "_id",
                                as: "user",
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                startDate: 1,
                                returnDate: 1,
                                car: { _id: 1, carName: 1, carModel: 1 },
                                user: { _id: 1, name: 1, email: 1 },
                            },
                        },
                    ])
                        .toArray()];
            case 4:
                updatedRent = _b.sent();
                res.json({ message: "Rent updated successfully", updatedRent: updatedRent });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateRent = updateRent;
var deleteRent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rent, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, rents.findOne({ _id: new mongodb_1.ObjectId(id) })];
            case 2:
                rent = _a.sent();
                if (!rent) {
                    return [2 /*return*/, res.status(404).json({ message: "Rent not found" })];
                }
                return [4 /*yield*/, rents.deleteOne({ _id: new mongodb_1.ObjectId(id) })];
            case 3:
                _a.sent();
                return [4 /*yield*/, db_1.db.collection("cars").updateOne({ _id: rent.carId }, { $set: { rented: false } })];
            case 4:
                _a.sent();
                res.json({ message: "Rent deleted successfully" });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteRent = deleteRent;
var getRent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rent, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, rents
                        .aggregate([
                        { $match: { _id: new mongodb_1.ObjectId(id) } },
                        {
                            $lookup: {
                                from: "cars",
                                localField: "carId",
                                foreignField: "_id",
                                as: "car",
                            },
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "userId",
                                foreignField: "_id",
                                as: "user",
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                startDate: 1,
                                returnDate: 1,
                                car: { _id: 1, carName: 1, carModel: 1 },
                                user: { _id: 1, name: 1, email: 1 },
                            },
                        },
                    ])
                        .toArray()];
            case 2:
                rent = _a.sent();
                if (!rent.length) {
                    return [2 /*return*/, res.status(404).json({ message: "Rent not found" })];
                }
                res.json({ rentDetails: rent[0] });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getRent = getRent;
