import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoeCardComponent } from './shoe-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Brand } from 'src/app/enums/Brand';
import { ShoeItem } from 'src/app/ShoeItem';

describe('ShoeCardComponent', () => {
  let component: ShoeCardComponent;
  let fixture: ComponentFixture<ShoeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoeCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const shoeItem: ShoeItem = {id: "asfasdf",
   size: 5,
   dateCreated: new Date("2/01/22"),
   userRating: null, 
   datePurchased: null,
   basicShoe: {
     id: "firstShoe",
     numberOfRates : 0,
     brands: [Brand.ADIDAS, Brand.YEEZY],
     model: "350 beluga",
     price: 202,
     rank: 2}
  }


  it('should create', () => {
    component.shoeItem = shoeItem;
    expect(component).toBeTruthy();
  });
});
