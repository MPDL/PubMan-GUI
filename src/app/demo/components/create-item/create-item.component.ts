import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, AbstractControl, Form, UntypedFormArray } from '@angular/forms';
import { 
  AlternativeTitleType, 
  CreatorRole, 
  CreatorType,
  MdsPublicationGenre } from 'src/app/core/model/model';

@Component({
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {
  private fb = inject(FormBuilder);

  public fields: any[] = [];

  public description = '';
  item: any;

  form: Object = { name: 'genre' };

  genreEnum: typeof MdsPublicationGenre = MdsPublicationGenre;
  titleTypeEnum: typeof AlternativeTitleType = AlternativeTitleType;
  creatorRoleEnum: typeof CreatorRole = CreatorRole;
  creatorTypeEnum: typeof CreatorType = CreatorType;
  keys = Object.keys;

  metadata: FormGroup = this.fb.group({
    genre: [''],
    title: [''],
    alternativeTitles: this.fb.array([]),
    creators: this.fb.array([])
  });

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.addCreator();
  }

  createItem() {}

  toFormGroup = (form: AbstractControl) => form as FormGroup;

  getDescription():string {
    return 'a description'
  }

  get alternativeTitles() {
    return this.metadata.controls['alternativeTitles'] as FormArray;
  }

  addAlternativeTitle() {
    const alternativeTitle = this.fb.group({
      altTitleType: ['', Validators.required],
      altTitleValue: ['', Validators.required]
    });
    this.alternativeTitles.push(alternativeTitle);
  }

  deleteAlternativeTitle(alternativeTitleIndex: number) {
    this.alternativeTitles.removeAt(alternativeTitleIndex);
  }

  get creators() {
    //console.log("get alternativeTitles: " + this.metadata.get('alternativeTitles')?.value)
    return this.metadata.controls['creators'] as FormArray;
  }

  addCreator() {
    this.creators.push(this.fb.group({
      creatorType: ['', Validators.required],
      creatorRole: ['', Validators.required],
      person: ['', Validators.required]
    }));
  }

  deleteCreator(creatorIndex: number) {
    this.creators.removeAt(creatorIndex);
  }

}
