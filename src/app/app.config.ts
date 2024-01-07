import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { markedOptionsCustom } from './markedcustomization';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsCustom,
      }
    }),
  ]
};
