import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {sortBy} from "lodash";
import {ShoeItem} from '../../ShoeItem';
import {Sort} from 'src/app/Sort';
import {ShoeItemRepository} from "../../storeData/shoesStore/shoeItemStore.store";

@Component({
  selector: 'app-shop-container',
  templateUrl: './shop-container.component.html',
  styleUrls: ['./shop-container.component.less']
})
export class ShopContainerComponent implements OnInit, OnChanges {

  @Output() removeBrand = new EventEmitter<string[]>();
  @Output() removeSizeFilter = new EventEmitter<number>();
  @Input() priceValue: number;
  @Input() filteredBrands: string[] = [];
  @Input() sizeFilter: number = null;
  items: ShoeItem[] = [];
  selectedSort = 'popular';
  filteredItems: ShoeItem[] = [];

  sorts: Sort[] = [
    {value: 'popular', viewValue: 'popularity'},
    {value: 'highToLow', viewValue: 'price high to low'},
    {value: 'lowToHigh', viewValue: 'price low to high'},
  ];

  constructor(private shoeItemRepository: ShoeItemRepository) { }

  ngOnInit(): void {
    this.getItems();
  }

  ngOnChanges(): void {
    this.filterItems();
  }

  getItems(): void {
    this.shoeItemRepository.shoes$.subscribe(items =>{
      this.items = items;
      this.filterItems();});
  }

  filterItems(): void {
    for(let itemIndex = 0; itemIndex < this.items.length; itemIndex++) {
      this.filteredItems = this.items.filter(item => {
          return this.filterItemsBaseOnBrands(item)
          && this.filterItemsBaseOnPrice(item)
          && this.filterItemsBaseOnSize(item)})
    }

    this.sortItems();
  }

  sortItems(): void {
    if (this.selectedSort === this.sorts[0].value) {
       this.filteredItems = sortBy(this.filteredItems, shoe => shoe.basicShoe.rank).reverse();
    } else if (this.selectedSort === this.sorts[1].value) {
      this.filteredItems = this.filteredItems = sortBy(this.filteredItems, shoe => shoe.basicShoe.price).reverse();
    } else {
      this.filteredItems = this.filteredItems = sortBy(this.filteredItems, shoe => shoe.basicShoe.price);
    }
  }

  filterItemsBaseOnPrice(item: ShoeItem): boolean {
    return item.basicShoe.price <= this.priceValue;
  }

  filterItemsBaseOnBrands(item: ShoeItem): boolean {
    return item.basicShoe.brands.some(r => this.filteredBrands.includes(r));
  }

  removeFilter(filter: string): void {
    this.filteredBrands = this.filteredBrands.filter(existsFilter => existsFilter!==filter);
    this.removeBrand.emit(this.filteredBrands);
  }

  filterItemsBaseOnSize(item: ShoeItem): boolean {
    return this.sizeFilter === null || item.size === this.sizeFilter
  }

  removeSize(): void {
    this.sizeFilter = null;
    this.removeSizeFilter.emit(this.sizeFilter );
  }

  changeSort(event: MatSelectChange): void {
    this.selectedSort = event.value;
    this.sortItems();
  }

  clearFilter(): void {
    this.filteredBrands.forEach(brand => this.removeFilter(brand));
    this.removeSize();
  }


 }
