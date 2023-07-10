import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { IngeCrudService, SearchResult} from '../inge-crud.service';
import { AuditDbVO, EventType, AccountUserDbVO } from '../../model/model';
import { Observable, throwError } from 'rxjs';


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
   * Get random generated password for a user by its id
   * @param userId
   * @param token 
   * @returns an password
   */
  getRandomPassword(userId: string, token?: string): Observable<AccountUserDbVO> {
    const path = this.contextPath + '/generateRandomPassword' + userId;
    return this.get(path, token);
  }

}