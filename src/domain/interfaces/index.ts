export interface ILogger {
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
}

export interface IMailer {
    send(to: string, subject: string, body: string): Promise<void>;
}

export interface IReportService {
    generateAndSend(email: string, n: number): Promise<void>;
}