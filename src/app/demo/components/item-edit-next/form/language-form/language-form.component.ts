import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'pure-language-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './language-form.component.html',
  styleUrl: './language-form.component.scss'
})
export class LanguageFormComponent {
  @Input() language_form!: FormControl;
  @Input() multi!: boolean;
  @Input() languageIndex!: number;
  @Output() notice = new EventEmitter();

  addLanguage() {
    this.notice.emit('add');
  }

  removeLanguage() {
    this.notice.emit('remove');
  }
}

