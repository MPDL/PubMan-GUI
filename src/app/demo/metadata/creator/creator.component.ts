import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreatorRole, CreatorType } from 'src/app/core/model/model';

@Component({
  selector: 'pure-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent {

  @Input() creatorForm!: FormGroup;
  @Output() notice = new EventEmitter();

  creatorRoleEnum: typeof CreatorRole = CreatorRole;
  creatorTypeEnum: typeof CreatorType = CreatorType;

  addCreator() {
    this.notice.emit('add');
  }

  removeCreator() {
    this.notice.emit('remove');
  }

  updateCreatorType() {

  }
  
  updateCreatorRole() {

  }

  getEnumValues(myEnum: Object): string[] {
    /*
    (<string[]> Object.keys(myEnum)).forEach( element => {
      console.log("XXX " + element);
    })
    */
    return <string[]>Object.keys(myEnum);
  }
  
}
