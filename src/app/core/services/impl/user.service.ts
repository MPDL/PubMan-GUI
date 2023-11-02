import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { IngeCrudService, SearchResult, TaskParamVO } from '../inge-crud.service';
import { AccountUserDbVO, GrantVO } from '../../model/model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService extends IngeCrudService {

  contextPath = '/users';

  constructor(
    http: HttpClient,
    props: PropertiesService
  ) {
    super(http, props)
  }

  listUsers(token?: string, size?: number, from?: number): Observable<SearchResult> {
    if (size || from) {
      let params = new HttpParams();
      size ? params = params.append('size', size) : params;
      from ? params = params.append('from', from) : params;
      return this.list(this.contextPath, undefined, token, params);
    }
    return this.list(this.contextPath, undefined, token);
  }

   /**
   * Create a new user
   * @param token 
   * @returns the newly created user
   */
   createItem(user: AccountUserDbVO, token: string): Observable<AccountUserDbVO> {
    return this.post(this.contextPath, user, token);
  }

  /**
   * Retrieve a user by userId
   * @param userId
   * @param token 
   * @returns an user
   */
  getUser(userId: string, token?: string): Observable<AccountUserDbVO> {
    const path = this.contextPath + '/' + userId;
    return this.get(path, token);
  }

  /**
   * Update a user
   * @param userId 
   * @param user 
   * @param token
   * @returns updated user
   */
  updateUser(userId: string, user: AccountUserDbVO, token: string): Observable<AccountUserDbVO> {
    const path = this.contextPath + '/' + userId;
    return this.put(path, user, token);
  }

  /**
   * Delete an user by its id
   * @param user 
   * @param token 
   * @returns standard http response (status code will indicate success)
   */
  deleteUser(user: AccountUserDbVO, token: string, comment?: string): Observable<number> {
    const path = this.contextPath + '/' + user.objectId;
    const body: TaskParamVO = {
      comment,
      lastModificationDate: user.lastModificationDate!
    }
    return this.delete(path, body, token);
  }

  /**
   * Activate a user
   * @param userId 
   * @param user 
   * @param token
   * @returns updated user
   */
  activateUser(userId: string, user: AccountUserDbVO, token: string): Observable<AccountUserDbVO> {
    const path = this.contextPath + '/' + userId+ '/activate';
    const body = user.lastModificationDate;
    return this.put(path, body, token);
  }
  
  /**
   * Add grant to a user
   * @param userId 
   * @param user 
   * @param token
   * @returns updated user
   */  
  addGrant(userId: string, role: string, grantType: string, objectRef: string, token: string): Observable<AccountUserDbVO> {
    const path = this.contextPath + '/' + userId+ '/add';
    const body: GrantVO = {
      role: role,
      grantType: grantType,
      objectRef: objectRef
    }
    return this.put(path, body, token);
  }

  /**
   * Deactivate a user
   * @param userId 
   * @param user 
   * @param token
   * @returns updated user
   */
  deactivateUser(userId: string, user: AccountUserDbVO, token: string): Observable<AccountUserDbVO> {
    const path = this.contextPath + '/' + userId+ '/deactivate';
    const body = user.lastModificationDate;
    return this.put(path, body, token);
  }

  /**
   * Remove grant from a user
   * @param userId 
   * @param user 
   * @param token
   * @returns updated user
   */
  removeGrant(userId: string, role: string, grantType: string, objectRef: string, token: string): Observable<AccountUserDbVO> {
    const path = this.contextPath + '/' + userId+ '/remove';
    const body: GrantVO = {
      role: role,
      grantType: grantType,
      objectRef: objectRef
    }
    return this.put(path, body, token);
  }


  /**
   * Get random generated password for a user by its id
   * @param userId
   * @param token 
   * @returns an password
   */
  getRandomPassword(userId: string, token?: string): Observable<AccountUserDbVO> {
    const path = this.contextPath + '/generateRandomPassword' + userId;
    return this.get(path, token);
  }

  searchUsers(query: string, token?: string): Observable<SearchResult> {
    const path = this.contextPath + '/search'
    let params = new HttpParams();
    return this.search(path, query, token, params);
  }

}