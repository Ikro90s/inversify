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
exports.ReportController = void 0;
const container_1 = require("../config/container");
const types_1 = require("../config/types");
const InvalidReportSizeError_1 = require("../domain/errors/InvalidReportSizeError");
class ReportController {
    static handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const n = parseInt(req.params.n) || 0;
            const email = req.query.email;
            if (!email) {
                return res.status(400).send({ error: "E-mail é obrigatório." });
            }
            try {
                // Resolvendo o serviço através do container (IoC)
                const reportService = container_1.container.get(types_1.TYPES.ReportService);
                yield reportService.generateAndSend(email, n);
                res.status(200).send({ message: "Relatório gerado e enviado com sucesso!" });
            }
            catch (error) {
                if (error instanceof InvalidReportSizeError_1.InvalidReportSizeError) {
                    return res.status(400).send({ error: error.message });
                }
                console.error(error);
                res.status(500).send({ error: "Erro interno no servidor." });
            }
        });
    }
}
exports.ReportController = ReportController;
