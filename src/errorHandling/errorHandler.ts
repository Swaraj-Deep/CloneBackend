export default class ErrorHandler extends Error {
    constructor(statusCode: number, message: string) {
        const customMessage = {
            statusCode,
            message
        }
        super(JSON.stringify(customMessage));
    }
}
