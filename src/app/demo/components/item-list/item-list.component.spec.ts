import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { ItemService } from 'src/app/core/services/impl/item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PropertiesService } from 'src/app/core/services/properties.service';
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import { of } from 'rxjs';
import {ListItemViewComponent} from "../../../shared/components/list-item-view/list-item-view.component";


describe('ItemListComponent', () => {
  let fixture: ComponentFixture<ItemListComponent>;
  let debugElement: DebugElement;

  let component: ItemListComponent;
  let itemServiceSpy: jasmine.SpyObj<ItemService>;

  beforeEach(async() => {
    window.history.pushState({ page_id: 'somevalue'}, '', '');

    const spy = jasmine.createSpyObj('ItemService', ['listItems']);

    await TestBed.configureTestingModule({
      declarations: [ItemListComponent, ListItemViewComponent],
      imports: [HttpClientTestingModule],
      providers: [
        ItemListComponent,
        { provide: ItemService, useValue: spy },
        {
          provide: PropertiesService,
          useValue: {properties: {'inge_rest_uri': 'mockedURL'}}
        }
      ]
    }).compileComponents();

    itemServiceSpy = TestBed.inject(ItemService) as jasmine.SpyObj<ItemService>;
    itemServiceSpy.listItems.and.returnValue(of({
        numberOfRecords: 5,
        records: [{
          data: {
            objectId : 1,
            metadata : {
              title : 'Title1'
            }
          },
          persistenceId: '1'
        },{
          data: {objectId : 2},
          persistenceId: '2'
        }]
      }));

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('item-list should be displayed correctly', () => {
    expect(itemServiceSpy.listItems.calls.count()).toBe(1);

    const totalItems = debugElement.query(By.css('h4'));
    expect(totalItems.nativeElement.textContent).toBe('5');
    const items = debugElement.queryAll(By.css('.list-group-item'));
    expect(items.length).toBe(2);
    const item1 = debugElement.query(By.css('pure-list-item-view strong'));
    expect(item1.nativeElement.textContent).toBe('Title1');
  });
});
