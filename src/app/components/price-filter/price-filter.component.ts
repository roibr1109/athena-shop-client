import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.less']
})
export class FilterComponent {

  @Input() priceValue: number;
  @Output() changingPriceFilter = new EventEmitter<number>();

  updatePrice(selectedPrice: number): void {
    this.priceValue = selectedPrice;
    this.changingPriceFilter.emit(selectedPrice);
  }
}
