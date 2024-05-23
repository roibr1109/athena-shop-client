import { Component, OnInit } from '@angular/core';
import { Brand } from '../../enums/Brand';
import { BrandCheckbox } from '../../BrandCheckbox';


@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.less']
})
export class ShopPageComponent implements OnInit {

  priceValue: number = 1000;
  sizeFilter: number = null;
  brandArrayFilter: string[];
  searchedText: number = null;

  ngOnInit(): void {
    this.initBrands();
  }

  fetchingPriceFilter(newPrice: number): void {
    this.priceValue = newPrice;
  }

  initBrands(): void {
   this.brandArrayFilter = Object.values(Brand);
  }

  changeBrandsFilter(brand: BrandCheckbox,): void {
    if (brand.completed) {
      this.brandArrayFilter.push(brand.name);
    } else {
      const index = this.brandArrayFilter.indexOf(brand.name);
      this.brandArrayFilter.splice(index, 1);
    }

    this.brandArrayFilter = [...this.brandArrayFilter];
  }
  
  updateBrands(brands: string[]): void {
    this.brandArrayFilter = brands;
  }

  changingSizeFilter(size: number): void {
    this.sizeFilter = size;
  }
}
