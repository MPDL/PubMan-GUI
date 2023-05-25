import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { OuTreeComponent } from './components/ou-tree/ou-tree.component';
import { ItemListComponent } from './components/item-list/item-list.component';


@NgModule({
  declarations: [
    DemoComponent,
    OuTreeComponent,
    ItemListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }
