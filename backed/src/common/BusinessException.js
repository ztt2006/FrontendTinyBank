class BusinessException extends Error {
  constructor(errorCode, message) {
    super(message || errorCode.message);
    this.code = errorCode.code;
    this.name = "BusinessException";
  }
}

module.exports = BusinessException;
