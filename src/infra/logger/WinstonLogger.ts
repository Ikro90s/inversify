import { injectable } from "inversify";
import winston from "winston";
import { ILogger } from "../../domain/interfaces";

@injectable()
export class WinstonLogger implements ILogger {
    private logger: winston.Logger;

    constructor() {
        const isProd = process.env.APP_ENV === "prod";

        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                isProd ? winston.format.json() : winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            ),
            transports: isProd 
                ? [new winston.transports.File({ filename: "app.log" })]
                : [new winston.transports.Console()]
        });
    }

    info(msg: string): void { this.logger.info(msg); }
    warn(msg: string): void { this.logger.warn(msg); }
    error(msg: string): void { this.logger.error(msg); }
}