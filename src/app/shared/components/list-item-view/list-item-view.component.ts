import { Component, Input } from '@angular/core';
import { ItemVersionState } from 'src/app/core/model/model';
import { IdType, ItemVersionVO } from 'src/app/core/model/model';

@Component({
  selector: 'pure-list-item-view',
  templateUrl: './list-item-view.component.html',
  styleUrls: ['./list-item-view.component.scss']
})
export class ListItemViewComponent {

  @Input() item: ItemVersionVO | undefined;
  @Input()
  authenticated: boolean = false;

  no_name = 'n/a';

  stateColor(state: any) {
    if (state) {
      switch (state.valueOf()) {
        case 'PENDING':
          return 'text-warning';
        case 'SUBMITTED':
          return 'text-priary';
        case 'IN_REVISION':
          return 'text-dark';
        case 'RELEASED':
          return 'text-success';
        case 'WITHDRAWN':
          return 'text-danger';
        default:
          return 'text-muted';
      }
    }
    return '';
  }
}
