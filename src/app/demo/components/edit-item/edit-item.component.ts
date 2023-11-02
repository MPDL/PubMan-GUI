import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, take } from 'rxjs';
import { AlternativeTitleType, CreatorRole, CreatorType, MdsPublicationGenre } from 'src/app/core/model/model';
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
  creatorTypeEnum: string[] = Object.keys(CreatorType);
  alternativeTitleTypeEnum = Object.keys(AlternativeTitleType);
  genreEnum: typeof MdsPublicationGenre = MdsPublicationGenre;


  metadata: FormGroup = this.fb.group({
    title: ['TitleCreate'],
    alternativeTitles: this.fb.array([
      this.fb.group({
        altTitleType: this.fb.control('LATEX'),
        altTitleValue: this.fb.control('ValueCreate1'),
      })
    ]),
    creators: this.fb.array([
      this.fb.group({
        creatorType: this.fb.control(this.creatorTypeEnum[0]),
        creatorRole: this.fb.control(this.creatorRoleEnum.ARTIST),
        person: this.fb.group({
          personFamilyName: this.fb.control('creatorPersonFamilyNameCreate1'),
          personGivenName: this.fb.control('creatorPersonGivenNameCreate1'),
          personOrganization: this.fb.array([
            this.fb.group({
              organizationName: this.fb.control('creatorPersonOrganizationNameCreate1'),
              organizationAddress: this.fb.control('creatorPersonOrganizationAddressCreate1'),
              organizationIdentifier: this.fb.control('creatorPersonOrganizationIdCreate1'),
              organizationIdentifierPath: this.fb.control([
                   'createIdentiferPathIdentifier1',
                   'createIdentiferPathIdentifier2',
              ])
            })
          ])
        })
      })
    ]),
    genre: this.fb.control(this.genreEnum.ARTICLE),
    sources: this.fb.array([
      this.fb.group({
        title: ['SourceTitle'],
        sourceAlternativeTitles: this.fb.array([
          this.fb.group({
            altTitleType: this.fb.control('TypeSource1'),
            altTitleValue: this.fb.control('ValueSource1'),
          })
        ]),
        volume: ['SourceVolume'],
        startPage: [101],
        endPage: [111],
        issue: ['SourceIssue'],
        publishingInfo: this.fb.group({
          place: this.fb.control('place'),
          publisher: this.fb.control('publisher'),
        }),
        identifiers: this.fb.array([
          this.fb.group({
            id: this.fb.control('identifierValue1'),
            type: this.fb.control('identifierType1'),
          })
        ]),
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
    //console.log("this.item.metadata.creators[0]: ", this.item.metadata.creators[0]); // TODO remove!
    console.log("this.item.metadata]: ", this.item.metadata); // TODO remove!
    console.log("this.item.metadata.alternativeTitles[0].type]: ", this.item.metadata.alternativeTitles[0].type); // TODO remove!
    this.metadata.patchValue({
      title: [this.item.metadata.title],
      alternativeTitles: [
        {
          altTitleType: [this.item.metadata.alternativeTitles ? this.item.metadata.alternativeTitles[0].type : 'HTML'],
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
      ],
      genre: [this.item.metadata.genre],
      sources: [
        {
          title: [this.item.metadata.sources[0].title],
          sourceAlternativeTitles: [
            {
              altTitleType: [this.item.metadata.sources[0].alternativeTitles ? this.item.metadata.sources[0].alternativeTitles[0].type : 'n/a'],
              altTitleValue: [this.item.metadata.sources[0].alternativeTitles ? this.item.metadata.sources[0].alternativeTitles[0].value : 'n/a']
            }
          ],
          volume: [this.item.metadata.sources[0].volume],
          startPage: [this.item.metadata.sources[0].startPage],
          endPage: [this.item.metadata.sources[0].endPage],
          issue:  [this.item.metadata.sources[0].issue],
          publishingInfo: {
            place: this.item.metadata.sources[0].publishingInfo.place, 
            publisher: this.item.metadata.sources[0].publishingInfo.publisher, 
          },
          identifiers: [
            {
              id: [this.item.metadata.sources[0].identifiers ? this.item.metadata.sources[0].identifiers[0].id : 'n/a'],
              type: [this.item.metadata.sources[0].identifiers ? this.item.metadata.sources[0].identifiers[0].type : 'n/a'],
            }
          ]
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
    let creator: FormGroup = this.fb.group({
      creatorType: this.fb.control(this.creatorTypeEnum[0]),
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

  updateGenre() {

  }

  get sources() {
    //console.log("get alternativeTitles: " + this.metadata.get('alternativeTitles')?.value)
    return this.metadata.get('sources') as FormArray;
  }

  __getSourcesForm(): FormGroup {
    var source: FormGroup = this.fb.group({
      title: [this.item.metadata.title],
      alternativeTitles: [
        {
          altTitleType: [this.item.metadata.alternativeTitles ? this.item.metadata.alternativeTitles[0].type : 'n/a'],
          altTitleValue: [this.item.metadata.alternativeTitles ? this.item.metadata.alternativeTitles[0].value : 'n/a']
        }
      ]
    })
    return source;
  }

  getEnumValues(myEnum: Object): string[] {
    /*
    (<string[]> Object.keys(myEnum)).forEach( element => {
      console.log("XXX " + element);
    })
    */
    return Object.keys(myEnum);
  }


}
