"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLogger = void 0;
const inversify_1 = require("inversify");
const winston_1 = __importDefault(require("winston"));
let WinstonLogger = class WinstonLogger {
    constructor() {
        const isProd = process.env.APP_ENV === "prod";
        this.logger = winston_1.default.createLogger({
            level: "info",
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), isProd ? winston_1.default.format.json() : winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())),
            transports: isProd
                ? [new winston_1.default.transports.File({ filename: "app.log" })]
                : [new winston_1.default.transports.Console()]
        });
    }
    info(msg) { this.logger.info(msg); }
    warn(msg) { this.logger.warn(msg); }
    error(msg) { this.logger.error(msg); }
};
exports.WinstonLogger = WinstonLogger;
exports.WinstonLogger = WinstonLogger = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], WinstonLogger);
