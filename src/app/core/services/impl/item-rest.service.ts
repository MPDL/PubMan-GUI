import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {PubmanRestService} from '../pubman-rest.service';
import { ItemVersionVO } from '../../model/model';

@Injectable({
  providedIn: 'root'
})
export class ItemRestService extends PubmanRestService {
  itemsPath : string = 'items';

  constructor(
    httpClient : HttpClient,
  ) { 
    super(httpClient);
  }

  createItem(itemId : string, item : ItemVersionVO, token : string) : Observable<ItemVersionVO> {
    const path = this.itemsPath ;
    const headers = this.addHeaders(token, false);
    return this.getResource('POST', path, headers, item);
  }

  getItem(itemId : string, token : string) : Observable<ItemVersionVO> {
    const path = this.itemsPath + '/' + itemId;
    const headers = this.addHeaders(token, false);
    return this.getResource('GET', path, headers, undefined);
  }

  updateItem(itemId : string, item : ItemVersionVO, token : string) : Observable<ItemVersionVO> {
    const path = this.itemsPath + '/' + itemId;
    const headers = this.addHeaders(token, false);
    return this.getResource('PUT', path, headers, item);
  }

  deleteItem(itemId : string, item : ItemVersionVO, token : string) {
    const path = this.itemsPath + '/' + itemId;
    const headers = this.addHeaders(token, false);
    return this.getResource('DELETE', path, headers, undefined);
  }

  getComponentContent(itemId : string, componentId : string, download : string, token : string) {
    if (!itemId || !componentId) {
      throwError(() => new Error('itemId and componentId is required!'));
    }
    const path = this.itemsPath + '/' + itemId + '/component/' + componentId + '/content';
    const headers = this.addHeaders(token, false);
    return this.getResource('GET', path, headers, undefined);
  }

  getComponentMetadata(itemId : string, componentId : string, token : string) : Observable<string>{
    if (!itemId || !componentId) {
      throwError(() => new Error('itemId and componentId is required!'));
    }
    const path = this.itemsPath + '/' + itemId + '/component/' + componentId + '/content';
    const headers = this.addHeaders(token, false);
    return this.getResource('GET', path, headers, undefined);
  }

  getVersionHistory(itemId : string, token : string) {
    if (!itemId) {
      throwError(() => new Error('itemId and componentId is required!'));
    }
    const path = this.itemsPath + '/' + itemId + '/history';
    const headers = this.addHeaders(token, false);
    return this.getResource('GET', path, headers, undefined);
  }

  releaseItem(itemId : string, lastModificationDate : string, comment : string, token : string) {
    const path = this.itemsPath + '/' + itemId + '/release';
    const headers = this.addHeaders(token, false);
    const commentAndModificationDate = {comment, lastModificationDate}
    return this.getResource('PUT', path, headers, commentAndModificationDate);
  }

  reviseItem(itemId : string, lastModificationDate : string, comment : string, token : string) {
    const path = this.itemsPath + '/' + itemId + '/revise';
    const headers = this.addHeaders(token, false);
    const commentAndModificationDate = {comment, lastModificationDate}
    return this.getResource('PUT', path, headers, commentAndModificationDate);
  }

  submitItem(itemId : string, lastModificationDate : string, comment : string, token : string) {
    const path = this.itemsPath + '/' + itemId + '/submit';
    const headers = this.addHeaders(token, false);
    const commentAndModificationDate = {comment, lastModificationDate}
    return this.getResource('PUT', path, headers, commentAndModificationDate);
  }

  withdrawItem(itemId : string, lastModificationDate : string, comment : string, token : string) {
    const path = this.itemsPath + '/' + itemId + '/withdraw';
    const headers = this.addHeaders(token, false);
    const commentAndModificationDate = {comment, lastModificationDate}
    return this.getResource('PUT', path, headers, commentAndModificationDate);
  }

  searchItems(query : string, citation : string, cslConeId : string, format : string, token : string) {
    const path = this.itemsPath + 'search'
    var params = new HttpParams();
    if (citation) params.append('citation', citation);
    if (cslConeId) params.append('cslConeId', cslConeId);
    if (format) params.append('format=', format);
    const headers = this.addHeaders(token, false);
    if (params) {
      return this.getResource('GET', path, headers, query, params);
    } else {
      return this.getResource('GET', path, headers, query);
    }
    
  }

  scrollItems(query : string, citation : string, cslConeId : string, format : string, token : string, scrollId : string) {
    if (!format) {
      throwError(() => new Error('scrollId is required!'));
    }
    const path = this.itemsPath + 'search/scroll'
    var params = new HttpParams();
    if (citation) params.append('citation', citation);
    if (cslConeId) params.append('cslConeId', cslConeId);
    if (format) params.append('format=', format);
    const headers = this.addHeaders(token, false);
    if (params) {
      return this.getResource('GET', path, headers, query, params);
    } else {
      return this.getResource('GET', path, headers, query);
    }
  }
}
