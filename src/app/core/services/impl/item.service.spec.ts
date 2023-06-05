import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { PropertiesService } from '../properties.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItemService', () => {
  let service: ItemService;
  const mockedIngeRestUri = "testURL";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ItemService,
        {
          provide: PropertiesService,
          useValue: {properties: {"inge_rest_uri": mockedIngeRestUri}}
        }
      ]
    });
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
