import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlType, FormBuilderService } from '../../services/form-builder.service';
import { IdentifierFormComponent } from '../identifier-form/identifier-form.component';
import { CreatorRole, CreatorType, IdentifierVO } from 'src/app/core/model/model';

@Component({
  selector: 'pure-creator-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IdentifierFormComponent],
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

  get organizations() {
    return this.creator_form.get('person.organizations') as FormArray;
  }

  get identifier() {
    return this.creator_form.get('person.identifier') as FormGroup<ControlType<IdentifierVO>>;
  }

  addPersonOU() {
    this.organizations.push(this.fbs.organization_FG(null));
  }

  removePersonOU(i: number) {
    this.organizations.removeAt(i);
  }

  handleIdentifierNotification(event: any) {
    console.log(event)
  }

  addCreator() {
    this.notice.emit('add');
  }

  removeCreator() {
    this.notice.emit('remove');
  }

}
