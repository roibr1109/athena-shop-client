import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Brand, brandValues} from '../../enums/Brand';
import {BrandCheckbox} from '../../BrandCheckbox';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.less']
})
export class BrandFilterComponent implements OnInit, OnChanges {

  brands: BrandCheckbox[];
  allComplete = true;
  @Input() brandsFiltered: string[];
  @Output() changingAllBrands = new EventEmitter<string[]>();
  @Output() changingBrandsFilter = new EventEmitter<BrandCheckbox>();

  ngOnInit(): void {
    this.brands = this.initBrandCheckbox();
  }

  ngOnChanges(): void {
    if (this.brands !== undefined) {
      this.brands.forEach(brand => {
        this.brandsFiltered.includes(brand.name) ? brand.completed = true : brand.completed = false;
      });

      this.updateAllComplete();
    }
  }

  initBrandCheckbox(): BrandCheckbox[] {

    return brandValues.map(brand => ({
      name: brand,
      completed: true
    }));
  }

  updateAllComplete(): void {
    this.allComplete = this.brands.every(brand => brand.completed);
  }

  setAll(completed: boolean): void {
    this.allComplete = completed;
    this.brands.forEach(
      brand => {
        brand.completed = completed;
        completed ? this.brandsFiltered = Object.values(Brand) : this.brandsFiltered = [];
      });
    this.changingAllBrands.emit(this.brandsFiltered);
  }

  updateFilter(brandName: string): void {
    this.updateAllComplete();
    const checkBoxToPass = this.brands.find(brand => brand.name === brandName);

    if (checkBoxToPass) {
      this.changingBrandsFilter.emit(checkBoxToPass);
    }
  }

}
