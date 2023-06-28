import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OuTreeComponent } from './components/ou-tree/ou-tree.component';
import { DemoComponent } from './demo.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { itemResolver } from '../core/services/resolver/item-resolver.service';
import { ItemComponent } from './components/item/item.component';
import { affiliationResolver } from '../core/services/resolver/affiliation-resolver.service';
import { OuComponent } from './components/ou/ou.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
  },
  { path: 'ou_tree', component: OuTreeComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'items/:id', component: ItemComponent, resolve: {item: itemResolver} },
  { path: 'ous/:id', component: OuComponent, resolve: {ou: affiliationResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
