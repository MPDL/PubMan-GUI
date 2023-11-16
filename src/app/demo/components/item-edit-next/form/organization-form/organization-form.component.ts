import { Component, inject ,Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup,  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlType, FormBuilderService } from '../../services/form-builder.service';
import { CreatorType, OrganizationVO } from 'src/app/core/model/model';

@Component({
  selector: 'pure-organization-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent {
  @Input() organization_form!: FormGroup;
  
  fbs = inject(FormBuilderService);

  ngOnInit() {
    this.organization_form.get('name')
  }

  get type() {
    return this.organization_form.get('type') as FormControl<ControlType<OrganizationVO>>;
  }
}
