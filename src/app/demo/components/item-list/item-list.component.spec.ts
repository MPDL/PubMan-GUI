import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { ItemService } from 'src/app/core/services/impl/item.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PropertiesService } from 'src/app/core/services/properties.service';
import * as props from '../../../../assets/properties.json';

const mocked_props = props;

export class PropsFactory {
  public properties: any = mocked_props;
}

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let service: ItemService;
  let props: PropertiesService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListComponent],
      imports: [HttpClientTestingModule],
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
    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
