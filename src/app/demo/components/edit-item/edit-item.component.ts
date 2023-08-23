import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, take } from 'rxjs';
import { CreatorType } from 'src/app/core/model/model';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'pure-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent {
  item: any;
  creatorTypeEnum: typeof CreatorType = CreatorType;

  metadata: FormGroup = this.fb.group({
    title: ['TitleCreate'],
    alternativeTitles: this.fb.array([
      this.fb.control('test1')
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
    ).subscribe();
    this.initilizeForm(); // is this waiting for subscribe?
  }

  initilizeForm() {
    //console.log("Metadata " + (JSON.stringify(this.metadata))); // TODO remove!
    console.log("Metadata " + (this.metadata.get('title')?.value)); // TODO remove!
    console.log("AlternativeTitles " + (this.metadata.get('alternativeTitles')?.value)); // TODO remove!
    this.metadata.patchValue({
        title: [this.item.metadata.title],
    })
    console.log("Metadata " + (this.metadata.get('title')?.value)); // TODO remove!
    console.log("AlternativeTitles " + (this.metadata.get('alternativeTitles')?.value)); // TODO remove!
  }

  updateForm() {
    this.metadata.patchValue({
      title: 'Nancy'
    })
  }

  get alternativeTitles() : FormArray{
    //console.log("get alternativeTitles - Metadata: " + this.metadata)
    console.log("get alternativeTitles: " + this.metadata.get('alternativeTitles')?.value)
    return this.metadata.get('alternativeTitles') as FormArray;
  }
  /*
  getalternativeTitles() {
    console.log("getalternativeTitles: " + this.itemFormGroup.controls['metadata'].get('alternativeTitles'))
    return (<FormArray>(<FormGroup>this.itemFormGroup.get('metadata')).get('alternativeTitles')).controls;
  }
*/
  addAlternativeTitles() {
    this.alternativeTitles.push(this.fb.control('TestAdd'));
    console.log("AlternativeTitles " + this.metadata.get('alternativeTitles')?.value); // TODO remove!
  }
  

}
