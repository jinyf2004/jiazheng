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
exports.__esModule = true;
exports.User = exports.UserRole = void 0;
var mongoose_1 = require("mongoose");
var bcrypt = require("bcryptjs");
var crypto_1 = require("../utils/crypto");
var UserRole;
(function (UserRole) {
    UserRole["CLIENT"] = "client";
    UserRole["WORKER"] = "worker";
    UserRole["COMPANY"] = "company";
    UserRole["TRAINER"] = "trainer";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var userSchema = new mongoose_1.Schema({
    roles: [{ type: String, "enum": Object.values(UserRole) }],
    profile: {
        skills: [String],
        certifications: [String],
        experience: String
    },
    password: { type: String, required: true }
});
// 密码加密中间件
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!this.isModified('password'))
                        return [2 /*return*/, next()];
                    return [4 /*yield*/, bcrypt.genSalt(10)];
                case 1:
                    salt = _b.sent();
                    _a = this;
                    return [4 /*yield*/, bcrypt.hash(this.password, salt)];
                case 2:
                    _a.password = _b.sent();
                    // 加密认证和经验字段
                    if (this.profile && this.isModified('profile')) {
                        this.profile.certifications = this.profile.certifications.map(function (cert) {
                            return (0, crypto_1.encrypt)(cert, process.env.CRYPTO_SECRET).encrypted;
                        });
                        this.profile.experience = (0, crypto_1.encrypt)(this.profile.experience.toString(), process.env.CRYPTO_SECRET).encrypted; // 转换为字符串后再加密
                    }
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
// 解密认证和经验字段
userSchema.post('find', function (docs) {
    if (docs) {
        docs.forEach(function (doc) {
            if (doc.profile) {
                doc.profile.certifications = doc.profile.certifications.map(function (cert) {
                    return (0, crypto_1.decrypt)({ iv: '', encrypted: cert }, process.env.CRYPTO_SECRET);
                });
                doc.profile.experience = (0, crypto_1.decrypt)({ iv: '', encrypted: doc.profile.experience }, process.env.CRYPTO_SECRET); // 解密后转换为数字
            }
        });
    }
});
userSchema.index({ 'profile.skills': 1, 'profile.experience': -1 });
exports.User = (0, mongoose_1.model)('User', userSchema);
exports["default"] = exports.User;
