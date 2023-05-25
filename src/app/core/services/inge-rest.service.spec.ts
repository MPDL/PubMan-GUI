import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IngeRestService } from './inge-rest.service';
import { HttpClient } from '@angular/common/http';

describe('IngeRestService', () => {
  let service: IngeRestService;
  let httpClient: HttpClient;
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IngeRestService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(IngeRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
