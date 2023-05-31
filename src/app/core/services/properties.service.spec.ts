import { TestBed } from '@angular/core/testing';

import { PropertiesService } from './properties.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PropertiesService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(PropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
