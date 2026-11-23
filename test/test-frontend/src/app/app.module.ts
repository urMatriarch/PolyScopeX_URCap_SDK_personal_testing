import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { TestComponent } from './components/test/test.component';
import { Test1Component } from './components/test1/test1.component';

import { UIAngularComponentsModule } from '@universal-robots/ui-angular-components';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import { PATH } from '../generated/contribution-constants';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const httpLoaderFactory = (http: HttpBackend) =>
    new MultiTranslateHttpLoader(http, [
      { prefix: PATH + '/assets/i18n/', suffix: '.json' },
      { prefix: './ui/assets/i18n/', suffix: '.json' },
    ]);

@NgModule({

  declarations: [
      TestComponent,
      Test1Component
],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      UIAngularComponentsModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpBackend] },
        useDefaultLang: false,
      })
    ],
    providers: [],
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const testComponent = createCustomElement(TestComponent, {injector: this.injector});
    customElements.define('marquardt-test-test', testComponent);
    const test1Component = createCustomElement(Test1Component, {injector: this.injector});
    customElements.define('marquardt-test-test1', test1Component);
  }

  // This function is never called, because we don't want to actually use the workers, just tell webpack about them
  registerWorkersWithWebPack() {
    new Worker(new URL('./components/test/test.behavior.worker.ts'
        /* webpackChunkName: "test.worker" */, import.meta.url), {
      name: 'test',
      type: 'module'
    });new Worker(new URL('./components/test1/test1.behavior.worker.ts'
        /* webpackChunkName: "test1.worker" */, import.meta.url), {
      name: 'test1',
      type: 'module'
    });
  }
}

