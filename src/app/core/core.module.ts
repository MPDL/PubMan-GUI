import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreRoutingModule } from './core-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StartComponent } from './components/start/start.component';
import { HeadComponent } from './components/head/head.component';
import { FootComponent } from './components/foot/foot.component';
import { SharedModule } from '../shared/shared.module';
import { httpInterceptorProviders } from './services/interceptors';
import { AaComponent } from './components/aa/aa.component';
import { LoginComponent } from './components/aa/login/login.component';
import { PropertiesService } from './services/properties.service';
import { ProfileComponent } from './components/aa/profile/profile.component';
import { SettingsComponent } from './components/aa/settings/settings.component';

export const propertiesFactory = (propertiesService: PropertiesService) => {
  return () => propertiesService.init();
};

@NgModule({
  declarations: [
    StartComponent,
    HeadComponent,
    FootComponent,
    AaComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent
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
    httpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: propertiesFactory,
      deps: [PropertiesService],
      multi: true
    }
  ]
})
export class CoreModule { }
