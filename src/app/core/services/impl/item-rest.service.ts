import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { ItemVersionVO } from '../../model/model';
import { IngeRestService } from '../inge-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ItemRestService extends IngeRestService {
  itemsPath : string = 'items';

  constructor(
    httpClient : HttpClient,
  ) { 
    super(httpClient);
  }

  /**
   * Create a new publication item
   * @param item 
   * @returns the newly created item including added techincal metadata
   */
  createItem(item : ItemVersionVO) : Observable<ItemVersionVO> {
    const path = this.itemsPath ;
    return this.post(path, item);
  }

  /**
   * Retrieve a publication item by itemId
   * @param itemId 
   * @returns an item
   */
  getItem(itemId : string) : Observable<ItemVersionVO> {
    const path = this.itemsPath + '/' + itemId;
    return this.get(path);
  }

  /**
   * Update a publication item
   * @param itemId 
   * @param item 
   * @returns update publication item with updated technical metadata
   */
  updateItem(itemId : string, item : ItemVersionVO) : Observable<ItemVersionVO> {
    const path = this.itemsPath + '/' + itemId;
    return this.put(path, item);
  }

  /**
   * Delete an item by its id
   * @param itemId 
   * @param token 
   * @returns standard http response (status code will indicate success)
   */
  deleteItem(itemId : string) : Observable<number> {
    const path = this.itemsPath + '/' + itemId;
    return this.delete(path);
  }

  getComponentContent(itemId : string, componentId : string, download : string) {
    if (!itemId || !componentId) {
      throwError(() => new Error('itemId and componentId is required!'));
    }
    const path = this.itemsPath + '/' + itemId + '/component/' + componentId + '/content';
    return this.get(path);
  }

  getComponentMetadata(itemId : string, componentId : string) : Observable<string>{
    if (!itemId || !componentId) {
      throwError(() => new Error('itemId and componentId is required!'));
    }
    const path = this.itemsPath + '/' + itemId + '/component/' + componentId + '/content';
    return this.get(path);
  }

  getVersionHistory(itemId : string) {
    if (!itemId) {
      throwError(() => new Error('itemId and componentId is required!'));
    }
    const path = this.itemsPath + '/' + itemId + '/history';
    return this.get(path);
  }

  releaseItem(itemId : string, lastModificationDate : string, comment : string) {
    const path = this.itemsPath + '/' + itemId + '/release';
    const commentAndModificationDate = {comment, lastModificationDate}
    return this.put(path, commentAndModificationDate);
  }

  reviseItem(itemId : string, lastModificationDate : string, comment : string) {
    const path = this.itemsPath + '/' + itemId + '/revise';
    const commentAndModificationDate = {comment, lastModificationDate}
    return this.put(path, commentAndModificationDate);
  }

  submitItem(itemId : string, lastModificationDate : string, comment : string) {
    const path = this.itemsPath + '/' + itemId + '/submit';
    const commentAndModificationDate = {comment, lastModificationDate}
    return this.put(path, commentAndModificationDate);
  }

  withdrawItem(itemId : string, lastModificationDate : string, comment : string) {
    const path = this.itemsPath + '/' + itemId + '/withdraw';
    const commentAndModificationDate = {comment, lastModificationDate}
    return this.put(path, commentAndModificationDate);
  }

  searchItems(query : string, citation : string, cslConeId : string, format : string) {
    const path = this.itemsPath + 'search'
    let params = new HttpParams();
    if (citation) params.append('citation', citation);
    if (cslConeId) params.append('cslConeId', cslConeId);
    if (format) params.append('format=', format);
    return this.query(path, query, params);
    
    
  }

  scrollItems(query : string, citation : string, cslConeId : string, format : string, scrollId : string) {
    if (!format) {
      throwError(() => new Error('scrollId is required!'));
    }
    const path = this.itemsPath + 'search/scroll'
    let params = new HttpParams();
    if (citation) params.append('citation', citation);
    if (cslConeId) params.append('cslConeId', cslConeId);
    if (format) params.append('format=', format);
    return this.query(path, query, params);
  }
}
