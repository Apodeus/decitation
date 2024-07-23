import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding, withRouterConfig} from '@angular/router';

import { routes } from './app.routes';
import {DecitationGateway} from "./ports/decitation.gateway";
import { InMemoryDecitationService } from './adapters/in-memory-decitation.service';
import {CITATIONS} from "./citations.stub";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({paramsInheritanceStrategy: 'always'})),
    {provide: DecitationGateway, useFactory: () => new InMemoryDecitationService().withCitations(CITATIONS)}
  ]
};
