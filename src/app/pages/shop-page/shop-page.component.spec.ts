import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { ShopPageComponent } from './shop-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SizeComponent } from 'src/app/components/size/size.component';
import { BrandFilterComponent } from 'src/app/components/brand-filter/brand-filter.component';
import { ShopContainerComponent } from 'src/app/components/shop-container/shop-container.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { FilterComponent } from 'src/app/components/price-filter/price-filter.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShopPageComponent', () => {
  let component: ShopPageComponent;
  let fixture: ComponentFixture<ShopPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPageComponent, 
        MockComponent(SizeComponent),
        MockComponent(BrandFilterComponent),
        MockComponent(ShopContainerComponent),
        MockComponent(FilterComponent)], 
        
      imports: [
        MatExpansionModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
