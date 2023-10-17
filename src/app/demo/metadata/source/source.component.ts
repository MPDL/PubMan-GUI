import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AlternativeTitleType, IdType } from 'src/app/core/model/model';

@Component({
  selector: 'pure-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent {
  @Input() sourceForm!: FormGroup;
  @Output() sourceNotice = new EventEmitter();

  alternativeTitleTypeEnum: typeof AlternativeTitleType = AlternativeTitleType;
  idTypeEnum: typeof IdType = IdType;

  addSource() {
    this.sourceNotice.emit('add');
  }

  removeSource() {
    this.sourceNotice.emit('remove');
  }

  updateSourceAlternativeTitleType() {

  }

  updateSourceIdType() {

  }

  get sourceAlternativeTitles() {
    return this.sourceForm.get('sourceAlternativeTitles') as FormArray;
  }

  get sourceIdentifiers() {
    return this.sourceForm.get('identifiers') as FormArray;
  }

  getEnumValues(myEnum: Object): string[] {
    /* 
    (<string[]> Object.keys(myEnum)).forEach( element => {
      console.log("XXX " + element);
    })
    */
    return <string[]>Object.keys(myEnum);
  }

}
