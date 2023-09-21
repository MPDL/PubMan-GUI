import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'pure-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {
  @Input() organizationForm!: FormGroup;
  @Output() notice = new EventEmitter();

  addOrganization() {
    this.notice.emit('add');
  }

  removeOrganization() {
    this.notice.emit('remove');
  }

  get organizationIdentifierPath() {
    return this.organizationForm.get('organizationIdentifierPath') as FormArray;
  }

}
