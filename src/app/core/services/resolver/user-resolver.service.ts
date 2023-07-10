import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { UserService } from '../impl/user.service';
import { AaService } from '../aa.service';
import { EMPTY, mergeMap, of } from 'rxjs';

export const userResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const service = inject(UserService);
  const aa = inject(AaService);
  const userId = route.paramMap.get('id');
  return service.getUser(userId!, aa.token).pipe(
    mergeMap(user => {
      if (user) {
        return of(user);
      } else {
        console.error('invalid id:', userId);
        router.navigate(['users']);
        return EMPTY;
      }
    })
  )
};
