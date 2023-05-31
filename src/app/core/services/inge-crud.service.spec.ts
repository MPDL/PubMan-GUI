import { TestBed } from '@angular/core/testing';

import { IngeCrudService } from './inge-crud.service';
import * as props from '../../../assets/properties.json';
import { PropertiesService } from './properties.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mocked_props = props;

export class PropsFactory {
  public properties: any = mocked_props;
}

describe('IngeCrudService', () => {
  let service: IngeCrudService;
  let props: PropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IngeCrudService,
        {
          provide: PropertiesService,
          useClass: PropsFactory
        }
      ]
    });
    service = TestBed.inject(IngeCrudService);
    props = TestBed.inject(PropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
