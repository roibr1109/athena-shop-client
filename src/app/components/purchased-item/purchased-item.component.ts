import {Component, Input, OnInit} from '@angular/core';
import {ShoeItem} from '../../ShoeItem';
import moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {ShoeItemRepository} from '../../storeData/shoesStore/shoeItemStore.store';
import {RateItemService} from 'src/app/services/rate-item.service';


@Component({
  selector: 'app-purchased-item',
  templateUrl: './purchased-item.component.html',
  styleUrls: ['./purchased-item.component.less']
})
export class PurchasedItemComponent implements OnInit {

  @Input() shoeItem: ShoeItem = null;
  formatDate: string;
  formatDay: string;

  constructor(public dialog: MatDialog,
              private rateShoeService: RateItemService,
              private shoeItemRepository: ShoeItemRepository) {
  }

  ngOnInit(): void {
    this.formatDate = moment(this.shoeItem.datePurchased).format('L');
    this.formatDay = moment(this.shoeItem.datePurchased).format('dddd');
  }

  openDialog(): void {
    if (!this.shoeItem.userRating) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '175px',
        data: {rating: this.shoeItem.basicShoe.rank}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.rateShoeService.rateShoe(this.shoeItem.id, this.shoeItem.basicShoe.id, result)
          .subscribe(updatedItem => {
            this.shoeItemRepository.upsertItem([updatedItem]);
            this.shoeItem = updatedItem;
            this.shoeItemRepository.loadShoes();
          })
      });
    }
  }

}
