import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlternativeTitleType } from 'src/app/core/model/model';

@Component({
  selector: 'pure-alt-title-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './alt-title-form.component.html',
  styleUrls: ['./alt-title-form.component.scss']
})
export class AltTitleFormComponent {

  @Input() alt_title_form!: FormGroup;
  @Output() notice = new EventEmitter();

  alt_title_types = Object.keys(AlternativeTitleType);
  alt_title_langs = ['bay', 'deu', 'eng', 'fra', 'esp'];

  addAT() {
    this.notice.emit('add');
  }

  removeAT() {
    this.notice.emit('remove');
  }
}
