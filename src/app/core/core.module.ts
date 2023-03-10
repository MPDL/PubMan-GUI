import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreRoutingModule } from './core-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StartComponent } from './components/start/start.component';
import { HeadComponent } from './components/head/head.component';
import { FootComponent } from './components/foot/foot.component';
import { SharedModule } from '../shared/shared.module';
import { httpInterceptorProviders } from './services/interceptors';


@NgModule({
  declarations: [
    StartComponent,
    HeadComponent,
    FootComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    RouterModule,
    HeadComponent,
    FootComponent,
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class CoreModule { }
