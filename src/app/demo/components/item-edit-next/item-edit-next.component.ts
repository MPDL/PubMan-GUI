import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from './services/form-builder.service';
import { FormBuilder } from '@angular/forms';
import { ItemFormComponent } from './form/item-form/item-form.component';

@Component({
  selector: 'pure-item-edit-next',
  standalone: true,
  imports: [CommonModule, ItemFormComponent],
  templateUrl: './item-edit-next.component.html',
  styleUrls: ['./item-edit-next.component.scss']
})
export class ItemEditNextComponent {
}
