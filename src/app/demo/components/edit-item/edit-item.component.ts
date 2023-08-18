import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, take } from 'rxjs';
import { CreatorType } from 'src/app/core/model/model';


@Component({
  selector: 'pure-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent {
  item: any;
  creatorTypeEnum: typeof CreatorType = CreatorType
  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => {
        this.item = data['item'];
      }),
      take(1)
    ).subscribe();
  }
}
