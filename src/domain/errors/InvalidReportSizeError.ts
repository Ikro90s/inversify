export class InvalidReportSizeError extends Error {
    constructor() {
        super("O tamanho do relatório é inválido. O máximo permitido é 10.");
        this.name = "InvalidReportSizeError";
    }
}