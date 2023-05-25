import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountUserDbRO, AccountUserDbVO, ItemVersionState, ItemVersionVO } from 'src/app/core/model/model';
import { ItemRestService } from 'src/app/core/services/impl/item-rest.service';

@Component({
  selector: 'pure-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  // items: Observable<ItemVersionVO> | undefined;
  items:any;

  constructor(private service: ItemRestService) {}

  ngOnInit(): void {
    this.items = this.service.getAll('items', undefined, 1);
    // this.items = this.service.getItem('item_2632212');
  }

}

