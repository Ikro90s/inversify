"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const WinstonLogger_1 = require("../infra/logger/WinstonLogger");
const NodemailerMailer_1 = require("../infra/mailer/NodemailerMailer");
const ReportService_1 = require("../domain/services/ReportService");
const container = new inversify_1.Container();
exports.container = container;
// Singleton para infraestrutura (reuso de instâncias)
container.bind(types_1.TYPES.Logger).to(WinstonLogger_1.WinstonLogger).inSingletonScope();
container.bind(types_1.TYPES.Mailer).to(NodemailerMailer_1.NodemailerMailer).inSingletonScope();
// Transient (padrão) para o serviço de domínio
container.bind(types_1.TYPES.ReportService).to(ReportService_1.ReportService);
