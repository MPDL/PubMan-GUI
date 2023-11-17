import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ControlType, FormBuilderService } from '../../services/form-builder.service';
import { AlternativeTitleVO, CreatorVO } from 'src/app/core/model/model';
import { AltTitleFormComponent } from '../alt-title-form/alt-title-form.component';
import { CreatorFormComponent } from '../creator-form/creator-form.component';
import { LabelInputFormComponent } from '../label-input-form/label-input-form.component';

@Component({
  selector: 'pure-metadata-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AltTitleFormComponent, CreatorFormComponent, LabelInputFormComponent],
  templateUrl: './metadata-form.component.html',
  styleUrls: ['./metadata-form.component.scss']
})
export class MetadataFormComponent {

  @Input() meta_form!: FormGroup;
  @Output() notice = new EventEmitter();

  fbs = inject(FormBuilderService);

  get alternativeTitles() {
    return this.meta_form.get('alternativeTitles') as FormArray<FormGroup<ControlType<AlternativeTitleVO>>>;
  }

  get creators() {
    return this.meta_form.get('creators') as FormArray<FormGroup<ControlType<CreatorVO>>>;
  }

  get dateAccepted() {
    return this.meta_form.get('dateAccepted') as FormControl<ControlType<string>>;
  
  }
  get dateCreated() {
    return this.meta_form.get('dateCreated') as FormControl<ControlType<string>>;
  }

  get dateModified() {
    return this.meta_form.get('dateModified') as FormControl<ControlType<string>>;
  }

  get datePublishedInPrint() {
    console.log("Metadata.datePublishedInPrint: " + this.meta_form.get('datePublishedInPrint'));
    return this.meta_form.get('datePublishedInPrint') as FormControl<ControlType<string>>;
  }

  get datePublishedOnline() {
    return this.meta_form.get('datePublishedOnline') as FormControl<ControlType<string>>;
  }

  get dateSubmitted() {
    return this.meta_form.get('dateSubmitted') as FormControl<ControlType<string>>;
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
