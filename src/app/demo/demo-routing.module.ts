import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OuTreeComponent } from './components/ou-tree/ou-tree.component';
import { DemoComponent } from './demo.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { itemResolver } from '../core/services/resolver/item-resolver.service';
import { ItemComponent } from './components/item/item.component';
import { affiliationResolver } from '../core/services/resolver/affiliation-resolver.service';
import { OuComponent } from './components/ou/ou.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { userResolver } from '../core/services/resolver/user-resolver.service';
import { UserComponent } from './components/user/user.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { CreateItemComponent } from './components/create-item/create-item.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
  },
  { path: 'ou_tree', component: OuTreeComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'items/create', component: CreateItemComponent },
  { path: 'items/:id', component: ItemComponent, resolve: {item: itemResolver} },
  { path: 'items/:id/edit', component: EditItemComponent, resolve: {item: itemResolver} },
  { path: 'ous/:id', component: OuComponent, resolve: {ou: affiliationResolver} },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserComponent, resolve: {item: userResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
