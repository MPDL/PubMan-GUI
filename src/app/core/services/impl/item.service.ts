import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { IngeCrudService, SearchResult, TaskParamVO } from '../inge-crud.service';
import { AuditDbVO, EventType, ItemVersionVO } from '../../model/model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends IngeCrudService {

  contextPath = '/items';

  constructor(
    http: HttpClient,
    props: PropertiesService
  ) {
    super(http, props)
  }

  listItems(token?: string, query?: string, size?: number, from?: number): Observable<SearchResult> {
    if (query || size || from) {
      let params = new HttpParams();
      console.log('params', query, size, from)
      query ? params = params.append('q', query) : params;
      size ? params = params.append('size', size) : params;
      from ? params = params.append('from', from) : params;
      console.log(params.toString())
      return this.list(this.contextPath, undefined, token, params);
    }
    return this.list(this.contextPath, undefined, token);
  }

  /**
   * Create a new publication item
   * @param item 
   * @param token 
   * @returns the newly created item including added techincal metadata
   */
  createItem(item: ItemVersionVO, token: string): Observable<ItemVersionVO> {
    return this.post(this.contextPath, item, token);
  }

  /**
   * Retrieve a publication item by itemId
   * @param itemId
   * @param token 
   * @returns an item
   */
  getItem(itemId: string, token?: string): Observable<ItemVersionVO> {
    const path = this.createItem + '/' + itemId;
    return this.get(path, token);
  }

  /**
   * Update a publication item
   * @param itemId 
   * @param item 
   * @param token
   * @returns update publication item with updated technical metadata
   */
  updateItem(itemId: string, item: ItemVersionVO, token: string): Observable<ItemVersionVO> {
    const path = this.contextPath + '/' + itemId;
    return this.put(path, item, token);
  }

  /**
   * Delete an item by its id
   * @param item 
   * @param token 
   * @returns standard http response (status code will indicate success)
   */
  deleteItem(item: ItemVersionVO, token: string, comment?: string): Observable<number> {
    const path = this.contextPath + '/' + item.objectId;
    const body: TaskParamVO = {
      comment,
      lastModificationDate: item.lastModificationDate
    }
    return this.delete(path, body, token);
  }

  /**
   * Get component content of an item by its id
   * @param itemId
   * @param componentId
   * @param token 
   * @returns component contet?
   */
  getComponentContent(itemId: string, componentId: string, download?: boolean, token?: string) {
    if (!itemId || !componentId) {
      throwError(() => new Error('itemId and componentId are required!'));
    }
    const path = this.contextPath + '/' + itemId + '/component/' + componentId + '/content';
    if (download) {
      const params = new HttpParams()
        .set('download', true);
        return this.get(path, token, params);
    }
    return this.get(path, token);
  }

  /**
   * Get component metadata of an item by its id
   * @param itemId
   * @param componentId
   * @param token 
   * @returns component metadata?
   */
  getComponentMetadata(itemId: string, componentId: string): Observable<string> {
    if (!itemId || !componentId) {
      throwError(() => new Error('itemId and componentId are required!'));
    }
    const path = this.contextPath + '/' + itemId + '/component/' + componentId + '/metadata';
    return this.get(path);
  }

  /**
   * Get version history of an item by its id
   * @param itemId
   * @param token 
   * @returns version history
   */
  getVersionHistory(itemId: string): Observable<AuditDbVO[]>{
    if (!itemId) {
      throwError(() => new Error('itemId is required!'));
    }
    const path = this.contextPath + '/' + itemId + '/history';
    return this.get(path);
  }

  /**
   * submit, release, revise or withdraw an item
   * @param event
   * @param item
   * @param comment
   * @param token 
   * @returns item
   */
  srrw(event: EventType, item: ItemVersionVO, comment: string, token: string): Observable<ItemVersionVO> {
    const path = this.contextPath + '/' + item.objectId + '/' + event.toLocaleLowerCase();
    const body: TaskParamVO = {
      comment,
      lastModificationDate: item.lastModificationDate
    }
    return this.put(path, body, token);
  }

  searchItems(query: string, token?: string, citation?: string, cslConeId?: string, format?: string): Observable<SearchResult> {
    const path = this.contextPath + 'search'
    let params = new HttpParams();
    if (citation) params.append('citation', citation);
    if (cslConeId) params.append('cslConeId', cslConeId);
    if (format) params.append('format=', format);
    return this.search(path, query, token, params);
  }

  scrollItems(query: string, scrollId: string, token?: string, citation?: string, cslConeId?: string, format?: string): Observable<SearchResult> {
    if (!scrollId) {
      throwError(() => new Error('scrollId is required!'));
    }
    const path = this.contextPath + 'search/scroll'
    let params = new HttpParams();
    params.append('scrollId', scrollId);
    if (citation) params.append('citation', citation);
    if (cslConeId) params.append('cslConeId', cslConeId);
    if (format) params.append('format=', format);
    return this.search(path, query, token, params);
  }
}

