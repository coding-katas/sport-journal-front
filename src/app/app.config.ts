import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
/*import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings } from '@gilsdav/ngx-translate-router';
import { Location } from '@angular/common';
import { localizeLoaderFactory } from './core/translate/localize-loader-factory';
import { translateLoaderFactory } from './core/translate-loader-factory';
import { HttpClient } from '@angular/common/http';*/



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideClientHydration(),
              provideHttpClient(withFetch()),
/*,
              importProvidersFrom(
                TranslateModule.forRoot({
                  defaultLanguage: 'en',
                  loader: {
                    provide: TranslateLoader,
                    useFactory: translateLoaderFactory,
                    deps: [HttpClient],
                  },
                }),
                LocalizeRouterModule.forRoot(routes, {
                  parser: {
                    provide: LocalizeParser,
                    useFactory: localizeLoaderFactory,
                    deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient],
                  },
                  initialNavigation: true,
                }),
              ),*/

            ]
};
