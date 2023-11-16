import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlType, FormBuilderService } from '../../services/form-builder.service';
import { CreatorType, IdentifierVO } from 'src/app/core/model/model';
import { FormArray, FormControl, FormGroup,  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentifierFormComponent } from '../identifier-form/identifier-form.component';

@Component({
  selector: 'pure-person-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IdentifierFormComponent],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent {
  @Input() person_form!: FormGroup;
  @Output() notice = new EventEmitter();

  fbs = inject(FormBuilderService);

  get organizations() {
    return this.person_form.get('person.organizations') as FormArray;
  }

  get identifier() {
    return this.person_form.get('person.identifier') as FormGroup<ControlType<IdentifierVO>>;
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
}
