import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';
import { Observable, catchError, map, throwError } from 'rxjs';

export interface SearchResult {
  numberOfRecords: number,
  records: {
    data: any,
    persistenceId: string
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class IngeCrudService {

  restUri = this.props.properties.inge_rest_uri;

  constructor(
    protected httpClient: HttpClient,
    protected props: PropertiesService
  ) { }

  private getSearchResults(method: string, path: string, body?: any, headers?: HttpHeaders, params?: HttpParams): Observable<SearchResult> {
    const requestUrl = this.restUri + path;
    return this.httpClient.request<SearchResult>(method, requestUrl, {
      body,
      headers,
      params
    }).pipe(
      map((searchResult: SearchResult) => searchResult),
      catchError((error) => {
        return throwError(() => new Error(JSON.stringify(error) || 'UNKNOWN ERROR!'));
      })
    );
  }

  private getResource(method: string, path: string, body?: any, headers?: HttpHeaders, params?: HttpParams): Observable<any> {
    const requestUrl = this.restUri + path;
    return this.httpClient.request(method, requestUrl, {
      body,
      headers,
      params,
    }).pipe(
      map((response: any) => response),
      catchError((error) => {
        return throwError(() => new Error(JSON.stringify(error) || 'UNKNOWN ERROR!'));
      })
    );
  }

  private getHttpStatus(method: string, path: string, body: Date | undefined, headers: HttpHeaders): Observable<any> {
    const requestUrl = this.restUri + path;
    return this.httpClient.request(method, requestUrl, {
      body,
      headers,
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

  private addContentTypeHeader(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return headers;
  }

  private addAuhorizationHeader(token: string): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', token);
    return headers;
  }

  private addAuthAndContentType(token: string): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    return headers;
  }

  list(path: string, body?: any, token?: string,  params?: HttpParams): Observable<SearchResult> {
    if (token) {
      return this.getSearchResults('GET', path, body, this.addAuhorizationHeader(token), params);
    }
    return this.getSearchResults('GET', path, body, undefined, params);
  }

  search(path: string, body: any, token?: string, params?: HttpParams): Observable<SearchResult> {
    if (token) {
      return this.getSearchResults('POST', path.concat('/search'), body, this.addAuthAndContentType(token), params);
    }
    return this.getSearchResults('POST', path.concat('/search'), body, this.addContentTypeHeader(), params);
  }

  get(path: string, token?: string): Observable<any> {
    if (token) {
      return this.getResource('GET', path, undefined, this.addAuhorizationHeader(token));
    }
    return this.getResource('GET', path);
  }

  post(path: string, resource: any, token: string): Observable<any> {
    const body = JSON.stringify(resource);
    return this.getResource('POST', path, body, this.addAuthAndContentType(token));
  }

  put(path: string, resource: any, token: string): Observable<any> {
    const body = JSON.stringify(resource);
    return this.getResource('PUT', path, body, this.addAuthAndContentType(token));
  }

  delete(path: string, body: any, token: string): Observable<number> {
    return this.getHttpStatus('DELETE', path, body, this.addAuhorizationHeader(token));
  }
}
