import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OuTreeComponent } from './components/ou-tree/ou-tree.component';
import { DemoComponent } from './demo.component';
import { ItemListComponent } from './components/item-list/item-list.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
  },
  { path: 'ou_tree', component: OuTreeComponent },
  { path: 'item_list', component: ItemListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
