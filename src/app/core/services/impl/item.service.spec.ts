import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { PropertiesService } from '../properties.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ItemService', () => {
  let itemService: ItemService;
  let controller: HttpTestingController;
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
    itemService = TestBed.inject(ItemService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(itemService).toBeTruthy();
  });

  it('getItem request',  () => {
    const itemId = '1';
    const expectedRequestUrl = mockedIngeRestUri + '/items/' + itemId;

    itemService.getItem(itemId).subscribe();

    const request = controller.expectOne(expectedRequestUrl);
    expect(request.request.method).toEqual('GET');
    controller.verify();
  });
});
