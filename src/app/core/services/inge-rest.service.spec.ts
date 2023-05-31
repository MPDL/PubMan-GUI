import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IngeRestService } from './inge-rest.service';
import { HttpClient } from '@angular/common/http';
import { PropertiesService } from './properties.service';
import * as props from '../../../assets/properties.json';

const mocked_props = props;

export class PropsFactory {
  public properties: any = mocked_props;
}

describe('IngeRestService', () => {
  let service: IngeRestService;
  let props: PropertiesService;
  let httpClient: HttpClient;
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IngeRestService,
        {
          provide: PropertiesService,
          useClass: PropsFactory
        }
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    props = TestBed.inject(PropertiesService);
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(IngeRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
