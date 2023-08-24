import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, take } from 'rxjs';
import { AlternativeTitleType, CreatorType } from 'src/app/core/model/model';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, AbstractControl, Form, UntypedFormArray } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'pure-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent {
  item: any;
  creatorTypeEnum: typeof CreatorType = CreatorType;
  alternativeTitleTypeEnum: typeof AlternativeTitleType = AlternativeTitleType;

  metadata: UntypedFormGroup = this.fb.group({
    title: ['TitleCreate'],
    alternativeTitles: this.fb.array([
      this.fb.group({
        altTitleType: this.fb.control('TypeCreate1'),
        altTitleValue: this.fb.control('ValueCreate1'),
      })
    ])
  });


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => {
        this.item = data['item'];
      }),
      take(1)
    ).subscribe(() => this.initilizeForm());
     // is this waiting for subscribe?
  }

  initilizeForm() {
    // console.log("this.alternativeTitles['controls'][0]: " + this.alternativeTitles['controls'][0].get('altTitleValue')?.value); // TODO remove!
    this.metadata.patchValue({
        title: [this.item.metadata.title],
        alternativeTitles: [{
          altTitleType: [this.item.metadata.alternativeTitles ? this.item.metadata.alternativeTitles[0].type : 'n/a'],
          altTitleValue: [this.item.metadata.alternativeTitles ? this.item.metadata.alternativeTitles[0].value : 'n/a']
        }]
    })
    console.log("this.alternativeTitles['controls'][0]: " + this.alternativeTitles['controls'][0].get('altTitleValue')?.value); // TODO remove!
  }

  updateForm() {
    this.metadata.patchValue({
      title: 'Nancy',
      alternativeTitles: [{
        altTitleType: ['NanyType'],
        altTitleValue: [this.alternativeTitles['controls'][0].get('altTitleValue')]
      }]
    })
  }

  get alternativeTitles() {
    //console.log("get alternativeTitles: " + this.metadata.get('alternativeTitles')?.value)
    return this.metadata.controls['alternativeTitles'] as UntypedFormArray;
  }

  getaltTitlesFormGroup (i: number) : FormGroup{
    console.log("FormGroup: ", (<FormArray> this.metadata.get('alternativeTitles'))?.['controls'][i] as UntypedFormGroup)
    return (<FormArray> this.metadata.get('alternativeTitles'))?.['controls'][i] as UntypedFormGroup;
  }

  addAlternativeTitles() {
    this.alternativeTitles.push(this.fb.group({
      altTitleType: this.fb.control('TEST'),
      altTitleValue: this.fb.control('Value1'),
    }));
    /*
    this.alternativeTitles['controls'].forEach( element => {
      console.log("XXX " + element.get('altTitleType')?.value); // TODO remove!
    });
    */
  }

  updateAlternativeTitleType() {
  }

  getEnumValues(myEnum: Object) : string[] {
    /*
    (<string[]> Object.keys(myEnum)).forEach( element => {
      console.log("XXX " + element);
    })
    */
    return <string[]> Object.keys(myEnum);
  }
  

}
