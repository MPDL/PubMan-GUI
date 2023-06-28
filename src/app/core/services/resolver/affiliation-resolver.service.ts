import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { AffiliationService } from '../impl/affiliation.service';
import { AaService } from '../aa.service';
import { EMPTY, mergeMap, of } from 'rxjs';

export class AffiliationResolverService {

  constructor() { }
}


export const affiliationResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const service = inject(AffiliationService);
  const aa = inject(AaService);
  const objectId = route.paramMap.get('id');
  return service.getAffiliation(objectId!, aa.token).pipe(
    mergeMap(affiliation => {
      if (affiliation) {
        return of(affiliation);
      } else {
        console.error('invalid id:', objectId);
        router.navigate(['affiliations']);
        return EMPTY;
      }
    })
  )
};
