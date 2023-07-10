import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DialogModule } from '@angular/cdk/dialog';
import { SwitchThemeComponent } from './components/switch-theme/switch-theme.component';
import { ListItemViewComponent } from './components/list-item-view/list-item-view.component';
import { ListUserViewComponent } from './components/list-user-view/list-user-view.component';


@NgModule({
  declarations: [
    SwitchThemeComponent,
    ListItemViewComponent,
    ListUserViewComponent
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
    ListItemViewComponent,
    ListUserViewComponent 
  ]
})
export class SharedModule { }
