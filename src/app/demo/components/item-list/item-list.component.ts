import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ItemVersionVO } from 'src/app/core/model/model';
import { AaService } from 'src/app/core/services/aa.service';
import { ItemService } from 'src/app/core/services/impl/item.service';

@Component({
  selector: 'pure-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items: Observable<ItemVersionVO[]> | undefined;
  totalItems: number = 0;

  constructor(
    private service: ItemService,
    private aa: AaService
  ) { }

  ngOnInit(): void {
    this.items = this.service.listItems(this.aa.token, 'test', 25).pipe(
      tap(result => {
        this.totalItems = result.numberOfRecords;
      }),
      map(result => {
        return result.records?.map((rec) => rec.data);
      })
    );
  }

}

