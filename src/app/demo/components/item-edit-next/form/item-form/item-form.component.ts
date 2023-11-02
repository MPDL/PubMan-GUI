import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlType, FormBuilderService } from '../../services/form-builder.service';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MetadataFormComponent } from '../metadata-form/metadata-form.component';
import { MdsPublicationVO } from 'src/app/core/model/model';

@Component({
  selector: 'pure-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MetadataFormComponent],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  fbs = inject(FormBuilderService);
  route = inject(ActivatedRoute);
  form!: FormGroup;

  ngOnInit(): void {
    this.route.data.pipe(
      switchMap(data => {
        return of(this.fbs.item_FG(data['item']));
      })
    ).subscribe(f => {
      this.form = f;
    })
  }

  get localTags() {
    return this.form.get('localTags') as FormArray<FormControl<ControlType<string>>>
  }

  get metadata_form() {
    return this.form.get('metadata') as FormGroup<ControlType<MdsPublicationVO>>
  }

  addTag() {
    this.localTags.push(new FormControl());
  }

  removeTag(index: number) {
    this.localTags.removeAt(index);
  }

  handleNotification(event: any) {
    alert(event);
  }
}
