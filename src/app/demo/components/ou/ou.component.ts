import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, take } from 'rxjs';

@Component({
  selector: 'pure-ou',
  templateUrl: './ou.component.html',
  styleUrls: ['./ou.component.scss']
})
export class OuComponent implements OnInit {
  ou: any;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => {
        this.ou = data['ou'];
      }),
      take(1)
    ).subscribe();
  }
}
