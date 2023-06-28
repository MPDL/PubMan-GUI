import { Injectable } from '@angular/core';
import { IngeCrudService } from '../inge-crud.service';
import { HttpClient } from '@angular/common/http';
import { PropertiesService } from '../properties.service';
import { Observable } from 'rxjs';
import { AffiliationDbVO } from '../../model/model';

@Injectable({
  providedIn: 'root'
})
export class AffiliationService extends IngeCrudService {

  contextPath = '/ous';

  constructor(
    http: HttpClient,
    props: PropertiesService
  ) {
    super(http, props)
  }

  topLevel(): Observable<AffiliationDbVO[]> {
    return this.get(`${this.contextPath}/toplevel`);
  }

  children(ou: any): Observable<AffiliationDbVO[]> {
    return this.get(`${this.contextPath}/${ou.objectId}/children`);
  }

    /**
   * Retrieve a publication affiliation by objectId
   * @param objectId
   * @param token 
   * @returns an affiliation
   */
    getAffiliation(objectId: string, token?: string): Observable<AffiliationDbVO> {
      const path = this.contextPath + '/' + objectId;
      return this.get(path, token);
    }
}
