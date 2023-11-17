import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'pure-label-input-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './label-input-form.component.html',
  styleUrls: ['./label-input-form.component.scss']
})
export class LabelInputFormComponent {
  @Input() inputForm!: FormControl;
  @Input() label!: string;
}
