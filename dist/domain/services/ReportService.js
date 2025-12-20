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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const inversify_1 = require("inversify");
const faker_1 = require("@faker-js/faker");
const InvalidReportSizeError_1 = require("../errors/InvalidReportSizeError");
const types_1 = require("../../config/types");
let ReportService = class ReportService {
    constructor(logger, mailer) {
        this.logger = logger;
        this.mailer = mailer;
    }
    generateAndSend(email, n) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validação
            if (n <= 0 || n > 10) {
                throw new InvalidReportSizeError_1.InvalidReportSizeError();
            }
            this.logger.info(`Iniciando geração de relatório com ${n} registros.`);
            // Geração de dados fictícios
            const data = Array.from({ length: n }, () => ({
                nome: faker_1.faker.person.fullName(),
                cidade: faker_1.faker.location.city(),
            }));
            const reportBody = `Relatório de Dados Fictícios:\n\n` +
                data.map(d => `- Nome: ${d.nome}, Cidade: ${d.cidade}`).join("\n");
            // Enviar e-mail
            yield this.mailer.send(email, "Seu Relatório Acadêmico", reportBody);
            this.logger.info(`Relatório enviado com sucesso para ${email}.`);
        });
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.Logger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.Mailer)),
    __metadata("design:paramtypes", [Object, Object])
], ReportService);
