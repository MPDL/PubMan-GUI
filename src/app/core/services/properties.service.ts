import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: any;

  constructor(private http: HttpClient) { }

  init() {
    this.http.get('./assets/properties.json').pipe(
      map(props => this.properties = props),
      take(1)
    ).subscribe();
  }
}
