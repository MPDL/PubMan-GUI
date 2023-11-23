import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ControlType, FormBuilderService } from '../../services/form-builder.service';
import { AlternativeTitleVO, CreatorVO, EventVO, LegalCaseVO, MdsPublicationGenre} from 'src/app/core/model/model';
import { AltTitleFormComponent } from '../alt-title-form/alt-title-form.component';
import { CreatorFormComponent } from '../creator-form/creator-form.component';
import { EventFormComponent } from '../event-form/event-form.component';
import { LegalCaseFormComponent } from '../legal-case-form/legal-case-form.component';

@Component({
  selector: 'pure-metadata-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AltTitleFormComponent, CreatorFormComponent, EventFormComponent, LegalCaseFormComponent],
  templateUrl: './metadata-form.component.html',
  styleUrls: ['./metadata-form.component.scss']
})
export class MetadataFormComponent {

  @Input() meta_form!: FormGroup;
  @Output() notice = new EventEmitter();

  fbs = inject(FormBuilderService);

  genre_options = Object.keys(MdsPublicationGenre);

  get alternativeTitles() {
    return this.meta_form.get('alternativeTitles') as FormArray<FormGroup<ControlType<AlternativeTitleVO>>>;
  }

  get creators() {
    return this.meta_form.get('creators') as FormArray<FormGroup<ControlType<CreatorVO>>>;
  }

  get event() {
    return this.meta_form.get('event') as FormGroup<ControlType<EventVO>>;
  }

  get legalCase() {
    return this.meta_form.get('legalCase') as FormGroup<ControlType<LegalCaseVO>>;
  }

  handleAltTitleNotification(event: string, index: number) {
    if (event === 'add') {
      this.addAltTitle();
    } else if (event === 'remove') {
      this.removeAltTitle(index);
    }
  }

  addAltTitle() {
    this.alternativeTitles.push(this.fbs.alt_title_FG(null));
  }

  removeAltTitle(index: number) {
    this.alternativeTitles.removeAt(index);
  }

  handleCreatorNotification(event: string, index: number) {
    if (event === 'add') {
      this.addCreator(index);
    } else if (event === 'remove') {
      this.removeCreator(index);
    }
  }

  addCreator(index: number) {
    this.creators.insert( index + 1, this.fbs.creator_FG(null));
  }

  removeCreator(index: number) {
    this.creators.removeAt(index);
  }
}
