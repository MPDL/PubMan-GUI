import { TestBed } from '@angular/core/testing';

import { AffiliationService } from './affiliation.service';
import { PropertiesService } from '../properties.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import * as props from '../../../../assets/properties.json';

const mocked_props = props;

export class PropsFactory {
  public properties: any = mocked_props;
}
describe('AffiliationService', () => {
  let service: AffiliationService;
  let props: PropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AffiliationService,
        {
          provide: PropertiesService,
          useClass: PropsFactory
        }
      ]
    });
    service = TestBed.inject(AffiliationService);
    props = TestBed.inject(PropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
