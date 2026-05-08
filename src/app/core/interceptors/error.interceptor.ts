import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * Functional HTTP interceptor that provides centralised error handling.
 *
 * Responsibilities (Single Responsibility Principle):
 *  - Translate HTTP error status codes into user-friendly messages.
 *  - Log errors to the console in non-production environments.
 *  - Re-throw a normalised {@link Error} so components can display it.
 *
 * Registered via {@code withInterceptors([errorInterceptor])} in app.config.ts.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = resolveErrorMessage(error);
      console.error(`[ErrorInterceptor] ${req.method} ${req.url} →`, message, error);
      return throwError(() => new Error(message));
    })
  );

/**
 * Maps an {@link HttpErrorResponse} to a readable message string.
 *
 * Priority order:
 *  1. RFC 7807 ProblemDetail {@code detail} field (used by the Spring backend).
 *  2. Server-side {@code message} field from our generic API envelope.
 *  3. Fallback text based on the HTTP status code.
 *
 * @param error The HTTP error response received from the server.
 * @returns A user-facing error message string.
 */
function resolveErrorMessage(error: HttpErrorResponse): string {
  if (error.error instanceof ErrorEvent) {
    // Client-side / network error
    return `Network error: ${error.error.message}`;
  }

  // Try RFC 7807 ProblemDetail (Spring Boot 3 default error format)
  if (error.error?.detail) {
    return error.error.detail as string;
  }

  // Try our custom API envelope message
  if (error.error?.message) {
    return error.error.message as string;
  }

  // Fall back to status-based messages
  switch (error.status) {
    case 400: return 'Bad request — please check your input.';
    case 404: return 'The requested resource was not found.';
    case 409: return 'A conflict occurred. The resource may already exist.';
    case 500: return 'An internal server error occurred. Please try again later.';
    default:  return `Unexpected error (HTTP ${error.status}).`;
  }
}
