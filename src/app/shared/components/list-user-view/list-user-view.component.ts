import { Component, Input } from '@angular/core';
import { AccountUserDbVO } from 'src/app/core/model/model';


@Component({
  selector: 'pure-list-user-view',
  templateUrl: './list-user-view.component.html',
  styleUrls: ['./list-user-view.component.scss']
})
export class ListUserViewComponent {


  @Input() user: AccountUserDbVO | undefined;
  @Input()
  authenticated: boolean = false;

  no_name = 'n/a';

}
