export class ApiError extends Error {
  title: string
  message: string
  timestamp: string
  fieldErrors?: Record<string, string>
  constructor(
    title: string,
    message: string,
    timestamp: string,
    fieldErrors?: Record<string, string>
  ) {
    super(message)
    this.title = title
    this.message = message
    this.timestamp = timestamp
    this.fieldErrors = fieldErrors
  }

  static fromMap(map: ErrorResponse): ApiError {
    if (!map || typeof map.message !== 'string') {
      return new ApiError(
        'Unknown Error',
        'An unexpected error occurred',
        new Date().toISOString()
      )
    }
    return new ApiError(map.title, map.message, map.timestamp, map.fieldErrors)
  }
}

export interface ErrorResponse {
  title: string
  message: string
  timestamp: string
  fieldErrors?: Record<string, string>
}
