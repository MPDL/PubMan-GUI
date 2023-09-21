import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'pure-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  @Input() personForm!: FormGroup;
  @Output() notice = new EventEmitter();

  addPerson() {
    this.notice.emit('add');
  }

  removePerson() {
    this.notice.emit('remove');
  }

  get organizations() {
    return this.personForm.get('personOrganization') as FormArray;
  }
}
