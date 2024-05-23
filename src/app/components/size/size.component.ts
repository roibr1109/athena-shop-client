import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { sizesFromInit} from "../../mocks/sizesInit"
@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.less']
})
export class SizeComponent implements OnChanges {
  
  sizes: number[] = [...sizesFromInit];
  @Input() curentSize: number = null;
  @Input() searchedText: number = null;
  @Output() OutputSize = new EventEmitter<number>();


  ngOnChanges(): void { 
    if (this.searchedText !== 0 && this.searchedText !== null) {
      this.sizes = this.sizes.filter(size => Math.floor(size) === this.searchedText)
    } else {
      this.sizes = [...sizesFromInit];
    }
  }

  filterSize(size: number): void {
    this.curentSize = this.curentSize === size ? null : size;
    this.OutputSize.emit(this.curentSize);
  }
}
