export class HttpError extends Error {
  status: number;
  constructor(statusCode: number, message?: string) {
    super();
    this.message = message ? message : "Что-то пошло не так";
    this.name = "HttpError";
    this.status = statusCode;
  }
}
