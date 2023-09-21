import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, take } from 'rxjs';
import { AlternativeTitleType, CreatorRole, CreatorType } from 'src/app/core/model/model';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, AbstractControl, Form, UntypedFormArray } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'pure-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent {
  item: any;
  creatorRoleEnum: typeof CreatorRole = CreatorRole;
  creatorTypeEnum: typeof CreatorType = CreatorType;
  alternativeTitleTypeEnum: typeof AlternativeTitleType = AlternativeTitleType;


  metadata: FormGroup = this.fb.group({
    title: ['TitleCreate'],
    alternativeTitles: this.fb.array([
      this.fb.group({
        altTitleType: this.fb.control('TypeCreate1'),
        altTitleValue: this.fb.control('ValueCreate1'),
      })
    ]),
    creators: this.fb.array([
      this.fb.group({
        creatorType: this.fb.control(this.creatorTypeEnum.PERSON),
        creatorRole: this.fb.control(this.creatorRoleEnum.ARTIST),
        person: this.fb.group({
          personFamilyName: this.fb.control('creatorPersonFamilyNameCreate1'),
          personGivenName: this.fb.control('creatorPersonGivenNameCreate1'),
          personOrganization: this.fb.array([
            this.fb.group({
              organizationName: this.fb.control('creatorPersonOrganizationNameCreate1'),
              organizationAddress: this.fb.control('creatorPersonOrganizationAddressCreate1'),
              organizationIdentifier: this.fb.control('creatorPersonOrganizationIdCreate1'),
              organizationIdentifierPath: this.fb.array([
                   'createIdentiferPathIdentifier1',
                   'createIdentiferPathIdentifier2',
              ])
            })
          ])
        })
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
    console.log("this.item.metadata.creators[0]: ", this.item.metadata.creators[0]); // TODO remove!
    this.metadata.patchValue({
      title: [this.item.metadata.title],
      alternativeTitles: [
        {
          altTitleType: [this.item.metadata.alternativeTitles ? this.item.metadata.alternativeTitles[0].type : 'n/a'],
          altTitleValue: [this.item.metadata.alternativeTitles ? this.item.metadata.alternativeTitles[0].value : 'n/a']
        }
      ],
      creators: [
        {
          creatorType: [this.item.metadata.creators[0].type],
          creatorRole: [this.item.metadata.creators[0].role],
          person: {
            personFamilyName: [this.item.metadata.creators[0].person.familyName],
            personGivenName: [this.item.metadata.creators[0].person.givenName],
            personOrganization: [
              {
                organizationName: [this.item.metadata.creators[0].person.organizations[0].name],
                organizationAddress: [this.item.metadata.creators[0].person.organizations[0].address],
                organizationIdentifier: [this.item.metadata.creators[0].person.organizations[0].identifier],
                organizationIdentifierPath: [
                  this.item.metadata.creators[0].person.organizations[0].identifierPath
                ],
              }
            ]
          }
        }
      ]
    })
    console.log("this.alternativeTitles['controls'][0]: ", this.metadata?.get('creators')?.get('controls')); // TODO remove!
  console.log("OrgID: ", this.metadata?.get('creators')?.get('0')?.get('person')?.get('personOrganization')?.get('0')?.get('organizationIdentifierPath')); // TODO remove!
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

  handleNotification(event: string, index: number) {
    if (event === 'add') {
      this.addCreator(index);
    } else if (event === 'remove') {
      this.removeCreator(index);
    }
  }

  get alternativeTitles() {
    //console.log("get alternativeTitles: " + this.metadata.get('alternativeTitles')?.value)
    return this.metadata.get('alternativeTitles') as FormArray;
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

  get creators() {
    //console.log("get alternativeTitles: " + this.metadata.get('alternativeTitles')?.value)
    return this.metadata.get('creators') as FormArray;
  }

  addCreator(index: number) {
    this.creators.insert(index + 1, this.getCreatorForm());
    /*
    this.alternativeTitles['controls'].forEach( element => {
      console.log("XXX " + element.get('altTitleType')?.value); // TODO remove!
    });
    */
  }

  removeCreator(index: number) {
    this.creators.removeAt(index);
  }

  updateCreatorType() {

  }

  getCreatorForm(): FormGroup {
    var creator: FormGroup = this.fb.group({
      creatorType: this.fb.control(this.creatorTypeEnum.PERSON),
      creatorRole: this.fb.control(this.creatorRoleEnum.ARTIST),
      person: this.fb.group({
        personFamilyName: this.fb.control(''),
        personGivenName: this.fb.control(''),
        personOrganisation: this.fb.array([
          this.fb.group({
            organizationName: this.fb.control(''),
            organizationAddress: this.fb.control(''),
            organizationIdentifier: this.fb.control(''),
            organizationIdentifierPath: this.fb.array([
              '',
            ])
          })
        ])
      })
    })
    return creator;
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
