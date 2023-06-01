import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: any;

  constructor(private http: HttpClient) { }

  init(): Observable<any> {
    return this.http.get('./assets/properties.json').pipe(
      map(props => this.properties = props),
      take(1)
    );
  }
}
