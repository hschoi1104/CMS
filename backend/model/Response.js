// class handleResponse {
//   static getResponse(res, status, statusCode, message) {
//     const result = {
//       status,
//       statusCode,
//       message,
//     };
//     return res.status(statusCode).json(result);
//   }
// }

class Response {
  constructor(statusCode, status, message, result) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.result = result;
  }
}
module.exports = { Response };
