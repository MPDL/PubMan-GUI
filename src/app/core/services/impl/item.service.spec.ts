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

  it('#listItems with no params should send a correct HTTP-Request',  () => {
    const expectedRequestUrl = mockedIngeRestUri + '/items';

    itemService.listItems().subscribe();

    const request = controller.expectOne(expectedRequestUrl);
    expect(request.request.method).toEqual('GET');
    controller.verify();
  });

  it('#listItems should send a correct HTTP-Request',  () => {
    const token = 'token';
    const query = 'query';
    const size = 1;
    const from = 2;
    const expectedRequestUrl = mockedIngeRestUri + '/items' + '?q=' + query + '&size=' + size + '&from=' + from;

    itemService.listItems(token, query, size, from).subscribe();

    const request = controller.expectOne(expectedRequestUrl);
    expect(request.request.method).toEqual('GET');
    expect(request.request.headers.get('Authorization')).toEqual(token);
    controller.verify();
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
    expect(request.request.headers.get('Authorization')).toEqual(token);
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

  it('#getItem should throw an error, if the HTTP Request returns an error response',  () => {
    const itemId = '1';
    const expectedRequestUrl = mockedIngeRestUri + '/items/' + itemId;
    const mockedErrorResponse = { status: 500, statusText: 'Internal Server Error' };
    let actualError: Error | undefined;

    itemService.getItem(itemId).subscribe({
      next: () => fail('next must not be called'),
      error: (error) => actualError = error,
      complete: () => fail('complete must not be called')
    });

    const request = controller.expectOne(expectedRequestUrl);
    expect(request.request.method).toEqual('GET');
    request.flush('', { status: mockedErrorResponse.status, statusText: mockedErrorResponse.statusText})
    if (!actualError) {
      throw new Error('Error needs to be defined');
    }
    expect(actualError.name).toBe('Error');
    const actualErrorMessage = JSON.parse(actualError.message);
    expect(actualErrorMessage.status).toBe(mockedErrorResponse.status);
    expect(actualErrorMessage.statusText).toBe(mockedErrorResponse.statusText);
    controller.verify();
  });
});
