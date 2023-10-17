import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { OuTreeComponent } from './components/ou-tree/ou-tree.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item/item.component';
import { OuComponent } from './components/ou/ou.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { CreatorComponent } from './metadata/creator/creator.component';
import { PersonComponent } from './metadata/person/person.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationComponent } from './metadata/organization/organization.component';
import { SourceComponent } from './metadata/source/source.component';


@NgModule({
  declarations: [
    DemoComponent,
    OuTreeComponent,
    ItemListComponent,
    ItemComponent,
    OuComponent,
    UserListComponent,
    UserComponent,
    EditItemComponent,
    CreatorComponent,
    PersonComponent,
    OrganizationComponent,
    SourceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DemoRoutingModule,
    ReactiveFormsModule
  ]
})
export class DemoModule { }
