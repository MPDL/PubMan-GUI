import { HttpClient, HttpHeaders, HttpParams, HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Serializable } from '../model/model';

export interface SearchResult {
  numberOfRecords: number,
  records: {data: Serializable}[]
}

@Injectable({
  providedIn: 'root'
})
export class IngeRestService {

  defaultPageSize = 25;
  baseUrl = 'https://pure.mpg.de/rest/';

  constructor(
    protected httpClient: HttpClient
  ) { }

  private getSearchResults(method: string, path: string, headers?: HttpHeaders, body?: any, params?: HttpParams): Observable<SearchResult> {
    const requestUrl = this.baseUrl + path;
    return this.httpClient.request<SearchResult>(method, requestUrl, {
      headers,
      observe: 'body',
      responseType: 'json',
      body,
      params
    }).pipe(
      map((searchResult: SearchResult) => searchResult),
      catchError((error) => {
        return throwError(() => new Error(JSON.stringify(error) || 'UNKNOWN ERROR!'));
      })
    );
  }

  private getStringResource(method: string, path: string): Observable<any> {
    const requestUrl = this.baseUrl + path;
    return this.httpClient.request(method, requestUrl, {
      responseType: 'text',
    }).pipe(
      map((response: any) => response),
      catchError((error) => {
        return throwError(() => new Error(JSON.stringify(error) || 'UNKNOWN ERROR!'));
      })
    );
  }

  private getResource(method: string, path: string, headers?: HttpHeaders, body?: object | string | Date | undefined, params?: HttpParams): Observable<any> {
    const requestUrl = this.baseUrl + path;
    if (body == null) {
      return this.httpClient.request(method, requestUrl, {
        headers,
        params: params,
      }).pipe(
        map((response: any) => response),
        catchError((error) => {
          return throwError(() => new Error(JSON.stringify(error) || 'UNKNOWN ERROR!'));
        })
      );
    } else {
      return this.httpClient.request(method, requestUrl, {
        headers,
        body: body,
      }).pipe(
        map((response: any) => response),
        catchError((error) => {
          return throwError(() => new Error(JSON.stringify(error) || 'UNKNOWN ERROR!'));
        })
      );
    }
  }

   private addContentTypeHeader(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return headers;
  }

  getAll(path: string, page?: number): Observable<SearchResult> {
    const offset = (page! - 1) * this.defaultPageSize;
    const requestPath = path + '?size=' + this.defaultPageSize + '&from=' + offset;
    return this.getSearchResults('GET', requestPath, undefined);
  }

  filter(path: string, query: string, page: number): Observable<SearchResult> {
    const offset = (page - 1) * this.defaultPageSize;
    const requestPath = path + query + '&size=' + this.defaultPageSize + '&from=' + offset;
    return this.getSearchResults('GET', requestPath, undefined);
  }

  query(path: string, body: string, params?: HttpParams): Observable<SearchResult> {
    const headers = this.addContentTypeHeader();
    const requestPath = path + '/search';
    return this.getSearchResults('POST', requestPath, headers, body, params);
  }

  get(path: string): Observable<any> {
    return this.getResource('GET', path, undefined, undefined);
  }

  post(path: string, resource: any): Observable<any> {
    const body = JSON.stringify(resource);
    const headers = this.addContentTypeHeader();
    return this.getResource('POST', path, headers, body);
  }

  put(path: string, resource: any): Observable<any> {
    const body = JSON.stringify(resource);
    const headers = this.addContentTypeHeader();
    return this.getResource('PUT', path, headers, body);
  }

  delete(path: string): Observable<number> {
    return this.getHttpStatus('DELETE', path, undefined);
  }

  private getHttpStatus(method: string, path: string, body: Date | undefined): Observable<any> {
    const requestUrl = this.baseUrl + path;
    return this.httpClient.request(method, requestUrl, {
      body,
      observe: 'response',
      responseType: 'text',
    }).pipe(
      map((response) => {
        const status = response.status;
        return status;
      }),
      catchError((error) => {
        return throwError(() => new Error(JSON.stringify(error) || 'UNKNOWN ERROR!'));
      })
    );
  }

}
