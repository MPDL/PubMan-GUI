import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlType, FormBuilderService } from '../../services/form-builder.service';
import { CreatorRole, CreatorType, IdentifierVO, OrganizationVO, PersonVO } from 'src/app/core/model/model';
import { PersonFormComponent } from '../person-form/person-form.component';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';

@Component({
  selector: 'pure-creator-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PersonFormComponent, OrganizationFormComponent],
  templateUrl: './creator-form.component.html',
  styleUrls: ['./creator-form.component.scss']
})
export class CreatorFormComponent {

  @Input() creator_form!: FormGroup;
  @Output() notice = new EventEmitter();

  fbs = inject(FormBuilderService);

  creator_types = Object.keys(CreatorType);
  creator_roles = Object.keys(CreatorRole);

  get type() {
    return this.creator_form.get('type') as FormControl<ControlType<CreatorType>>;
  }

  type_change(val: string) {
    if (val.localeCompare('ORGANIZATION') === 0) {
      this.creator_form.get('person')?.reset();
    } else {
      this.creator_form.get('organization')?.reset();
    }
  }

  get person() {
    return this.creator_form.get('person') as FormGroup<ControlType<PersonVO>>;
  }

  get organization() {
    return this.creator_form.get('organization') as FormGroup<ControlType<OrganizationVO>>;
  }

  addCreator() {
    this.notice.emit('add');
  }

  removeCreator() {
    this.notice.emit('remove');
  }

}
