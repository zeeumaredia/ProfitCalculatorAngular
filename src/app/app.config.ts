import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptor';

/**
 * Root application configuration.
 *
 * Registers framework-level providers following the standalone API
 * introduced in Angular 17 (no NgModule required).
 *
 * Providers:
 *  - Router with component-input binding enabled.
 *  - HttpClient with the global {@link errorInterceptor}.
 *  - Async animations (loaded lazily to reduce initial bundle size).
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimationsAsync(),
  ],
};
