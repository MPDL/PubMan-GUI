import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { AccountUserDbRO, AccountUserDbVO, ItemVersionState, ItemVersionVO, Serializable } from 'src/app/core/model/model';
import { ItemRestService } from 'src/app/core/services/impl/item-rest.service';
import { IngeRestService, SearchResult } from 'src/app/core/services/inge-rest.service';

@Component({
  selector: 'pure-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items: Observable<Serializable> | undefined;
  // items:any;
  totalItems:number = 0;

  constructor(private service: ItemRestService) {}

  ngOnInit(): void {
    this.items = this.service.getAll('/items', 1).pipe(
      tap(result => {
        this.totalItems = result.numberOfRecords;
      }),
      map(result => {
        return result.records?.map((rec) => rec.data);
      })
    );
    // this.items = this.service.getItem('item_2632212');
  }

}

