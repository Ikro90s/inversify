"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const ReportController_1 = require("./http/ReportController");
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3000;
// Rota conforme especificado
app.get("/relatorio/:n", ReportController_1.ReportController.handle);
app.listen(port, () => {
    console.log(`[SERVER] Rodando em http://localhost:${port}`);
    console.log(`[ENV] Ambiente: ${process.env.APP_ENV}`);
});
