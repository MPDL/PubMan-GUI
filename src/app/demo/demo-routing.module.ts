import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OuTreeComponent } from './components/ou-tree/ou-tree.component';
import { DemoComponent } from './demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
  },
  { path: 'ou_tree', component: OuTreeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
