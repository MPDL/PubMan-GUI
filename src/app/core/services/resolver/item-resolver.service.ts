import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { ItemService } from '../impl/item.service';
import { AaService } from '../aa.service';
import { EMPTY, mergeMap, of } from 'rxjs';

export const itemResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const service = inject(ItemService);
  const aa = inject(AaService);
  const itemId = route.paramMap.get('id');
  return service.getItem(itemId!, aa.token).pipe(
    mergeMap(item => {
      if (item) {
        return of(item);
      } else {
        console.error('invalid id:', itemId);
        router.navigate(['items']);
        return EMPTY;
      }
    })
  )
};
