import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { ItemService } from 'src/app/core/services/impl/item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PropertiesService } from 'src/app/core/services/properties.service';
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import { of } from 'rxjs';
import {ListItemViewComponent} from "../../../shared/components/list-item-view/list-item-view.component";
import {SearchResult} from "../../../core/services/inge-crud.service";

describe('ItemListComponent', () => {
  let fixture: ComponentFixture<ItemListComponent>;
  let component: ItemListComponent;
  let debugElement: DebugElement;
  let itemServiceSpy: jasmine.SpyObj<ItemService>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ItemListComponent, ListItemViewComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ItemService,
          useValue: jasmine.createSpyObj('ItemService', ['listItems'])
        }
      ]
    }).compileComponents();

    itemServiceSpy = TestBed.inject(ItemService) as jasmine.SpyObj<ItemService>;
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('item-list should be displayed correctly', () => {
    //Given
    window.history.pushState('', '', '');
    let searchResult : SearchResult = {
      numberOfRecords: 5,
      records: [{
        data: {
          objectId : 1,
          metadata : {
            title : 'Title1'
          }
        },
        persistenceId: '1'
      },
      {
        data: {},
        persistenceId: '2'
      }]
    };
    itemServiceSpy.listItems.and.returnValue(of(searchResult));
    let firstItemTitle = searchResult.records[0].data.metadata.title;
    let numberOfRecords = String(searchResult.numberOfRecords);
    let itemListSize = searchResult.records.length;

    //When (ngOnInit() is called during instantiation of ItemListComponent)
    fixture = TestBed.createComponent(ItemListComponent);
    fixture.detectChanges();

    //Then
    debugElement = fixture.debugElement;
    expect(itemServiceSpy.listItems.calls.count()).toBe(1);
    const totalItems = debugElement.query(By.css('h4'));
    expect(totalItems.nativeElement.textContent).toBe(numberOfRecords);
    const items = debugElement.queryAll(By.css('.list-group-item'));
    expect(items.length).toBe(itemListSize);
    const item1 = debugElement.query(By.css('pure-list-item-view strong'));
    expect(item1.nativeElement.textContent).toBe(firstItemTitle);
  });
});
