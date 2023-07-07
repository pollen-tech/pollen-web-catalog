export default class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originError?: Error
  ) {
    super(message)
  }
}
