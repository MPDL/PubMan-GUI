import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { PropertiesService } from '../properties.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ItemVersionVO} from "../../model/model";

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

  it('#createItem should send a correct HTTP-Request',  () => {
    const item = <ItemVersionVO>{
      message : 'testMessage'
    };
    const token = 'token';
    const expectedRequestUrl = mockedIngeRestUri + '/items';

    itemService.createItem(item, token).subscribe();

    const request = controller.expectOne(expectedRequestUrl);
    expect(request.request.method).toEqual('POST');
    expect(request.request.headers.get('Authorization')).toEqual('token');
    expect(request.request.headers.get('Content-Type')).toEqual('application/json');
    expect(request.request.body).toEqual('{"message":"testMessage"}');
    controller.verify();
  });

  it('#getItem should send a correct HTTP-Request',  () => {
    const itemId = '1';
    const expectedRequestUrl = mockedIngeRestUri + '/items/' + itemId;

    itemService.getItem(itemId).subscribe();

    const request = controller.expectOne(expectedRequestUrl);
    expect(request.request.method).toEqual('GET');
    controller.verify();
  });
});
