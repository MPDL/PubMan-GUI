import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map, startWith, tap } from 'rxjs';
import { AccountUserDbVO } from 'src/app/core/model/model';
import { AaService } from 'src/app/core/services/aa.service';
import { UserService } from 'src/app/core/services/impl/user.service';


@Component({
  selector: 'pure-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Observable<AccountUserDbVO[]> | undefined;
  totalUsers: number = 0;

  constructor(
    private service: UserService,
    public aa: AaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      // required to work immediately. 
      startWith(this.router)
    ).subscribe(() => {
        this.users = this.service.listUsers(this.aa.token, 25).pipe(
          tap(result => {
            this.totalUsers = result.numberOfRecords;
          }),
          map(result => {
            return result.records?.map((rec) => rec.data);
          })
        );
      });
  }

  goTo(userId: string) {
    this.router.navigate(['/demo/users', userId]);
  }
}
