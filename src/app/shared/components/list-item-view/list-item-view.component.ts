import { Component, Input } from '@angular/core';
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
}
