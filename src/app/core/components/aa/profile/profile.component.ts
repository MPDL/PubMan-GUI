import { Component, Inject } from '@angular/core';
import { AccountUserDbVO } from 'src/app/core/model/model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'pure-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  no_name = 'n/a';
  state = '';

  constructor(
    @Inject(DIALOG_DATA) public data: {user: AccountUserDbVO},
    private dialogRef: DialogRef<string>
  ) { 
    this.state = this.data.user.active ? 'ACTIVE' : 'DEACTIVATED' ; 
  }

  close(): void {
    this.dialogRef.close();
  }

}
