import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, take } from 'rxjs';

@Component({
  selector: 'pure-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  item: any;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => {
        console.log('dada', data)
        this.item = data['item'];
      }),
      take(1)
    ).subscribe();
  }
}

