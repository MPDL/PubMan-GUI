import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { PropertiesService } from '../properties.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import * as props from '../../../../assets/properties.json';

const mocked_props = props;

export class PropsFactory {
  public properties: any = mocked_props;
}

describe('ItemService', () => {
  let service: ItemService;
  let props: PropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ItemService,
        {
          provide: PropertiesService,
          useClass: PropsFactory
        }
      ]
    });
    service = TestBed.inject(ItemService);
    props = TestBed.inject(PropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
