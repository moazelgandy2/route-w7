"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.signIn = exports.getUser = exports.addUser = exports.getUsers = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var db_1 = require("../../db/db");
var mongodb_1 = require("mongodb");
var users = db_1.db.collection("users");
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users.find().toArray()];
            case 1:
                allUsers = _a.sent();
                res.json({ users: allUsers });
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
exports.getUsers = getUsers;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, users.findOne({ _id: new mongodb_1.ObjectId(id) })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "User Not Found" })];
                res.json({ user: user });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, userWithoutPassword, valid, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                console.log(email, password);
                if (!email || !password) {
                    return [2 /*return*/, res.status(400).json({ message: "Email and password are required" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, users.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "User Not Found" })];
                }
                console.log(user);
                userWithoutPassword = __assign(__assign({}, user), { password: undefined });
                delete userWithoutPassword.password;
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 3:
                valid = _b.sent();
                if (valid) {
                    return [2 /*return*/, res.json({ message: "User LoggedIn Successfully", userWithoutPassword: userWithoutPassword })];
                }
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.log(err_1);
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signIn = signIn;
var addUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, phone, userStructure, existUser, hashedPassword, insertedId, user, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, phone = _a.phone;
                userStructure = {
                    name: "string .. required",
                    email: "string .. required",
                    password: "string .. required",
                    phone: "string .. required",
                };
                if (!name || !email || !password || !phone) {
                    return [2 /*return*/, res.status(400).json({
                            message: "The input should be on the following structure:",
                            userStructure: userStructure,
                        })];
                }
                if (phone.length !== 11) {
                    return [2 /*return*/, res.status(400).json({ message: "Phone number: ".concat(phone, " is not valid!") })];
                }
                return [4 /*yield*/, users.findOne({ email: email })];
            case 1:
                existUser = _b.sent();
                if (existUser) {
                    return [2 /*return*/, res.status(400).json({ message: "User with this email already exist" })];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                hashedPassword = bcryptjs_1.default.hashSync(password, 8);
                return [4 /*yield*/, users.insertOne({ name: name, email: email, password: hashedPassword, phone: phone })];
            case 3:
                insertedId = (_b.sent()).insertedId;
                return [4 /*yield*/, users.findOne({ _id: new mongodb_1.ObjectId(insertedId) })];
            case 4:
                user = _b.sent();
                res.json({ user: user });
                return [3 /*break*/, 6];
            case 5:
                e_2 = _b.sent();
                console.log(e_2);
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addUser = addUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, phone, oldPassword, newPassword, fields, user, valid, hashedPass, updatedUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, phone = _a.phone, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                if (!name || !phone || !oldPassword || !newPassword) {
                    fields = ["name", "phone", "oldPassword", "newPassword"];
                    return [2 /*return*/, res.status(400).json({ message: "All fields are required", fields: fields })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, users.findOne({ _id: new mongodb_1.ObjectId(id) })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "User Not Found" })];
                valid = bcryptjs_1.default.compareSync(oldPassword, user.password);
                if (!valid)
                    return [2 /*return*/, res.status(400).json({ message: "Password is incorrect" })];
                hashedPass = bcryptjs_1.default.hashSync(newPassword, 8);
                return [4 /*yield*/, users.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: name, phone: phone, password: hashedPass } })];
            case 3:
                _b.sent();
                return [4 /*yield*/, users.findOne({ _id: new mongodb_1.ObjectId(id) })];
            case 4:
                updatedUser = _b.sent();
                res.json({ message: "User Updated", user: updatedUser });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, password, user, valid, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, users.findOne({ _id: new mongodb_1.ObjectId(id) })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "User Not Found" })];
                valid = bcryptjs_1.default.compareSync(password, user.password);
                if (!valid)
                    return [2 /*return*/, res.status(400).json({ message: "Password is incorrect" })];
                return [4 /*yield*/, users.deleteOne({ _id: new mongodb_1.ObjectId(id) })];
            case 3:
                _a.sent();
                res.json({ message: "User Deleted" });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
