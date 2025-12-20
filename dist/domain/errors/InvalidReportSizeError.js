"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidReportSizeError = void 0;
class InvalidReportSizeError extends Error {
    constructor() {
        super("O tamanho do relatório é inválido. O máximo permitido é 10.");
        this.name = "InvalidReportSizeError";
    }
}
exports.InvalidReportSizeError = InvalidReportSizeError;
