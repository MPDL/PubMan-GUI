import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DialogModule } from '@angular/cdk/dialog';
import { SwitchThemeComponent } from './components/switch-theme/switch-theme.component';


@NgModule({
  declarations: [
    SwitchThemeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTreeModule,
    DialogModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CdkTreeModule,
    SwitchThemeComponent,
  ]
})
export class SharedModule { }
