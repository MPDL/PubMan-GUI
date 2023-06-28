import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map, startWith, tap } from 'rxjs';
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
  query: string | undefined;

  constructor(
    private service: ItemService,
    public aa: AaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      // required to work immediately. 
      startWith(this.router)
    ).subscribe(() => {
      this.query = history.state.term;
      if (this.query) {
        this.items = this.service.listItems(this.aa.token, this.query, 25).pipe(
          tap(result => {
            this.totalItems = result.numberOfRecords;
          }),
          map(result => {
            return result.records?.map((rec) => rec.data);
          })
        );
      } else {
        this.items = this.service.listItems(this.aa.token, undefined, 25).pipe(
          tap(result => {
            this.totalItems = result.numberOfRecords;
          }),
          map(result => {
            return result.records?.map((rec) => rec.data);
          })
        );
      }});
  }

  goTo(itemId: string) {
    this.router.navigate(['/demo/items', itemId]);
  }
}


