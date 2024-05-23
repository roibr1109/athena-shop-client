import {Component, OnInit} from '@angular/core';
import {NewItemsService} from '../../new-items.service';
import {ShoeItem} from '../../ShoeItem';
import {InputShoeItem} from 'src/app/InputShoeItem';
import {ShoeItemRepository} from "../../storeData/shoesStore/shoeItemStore.store";

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.less']
})
export class NewItemComponent implements OnInit {

  basicShoesToSell: ShoeItem[];
  sizes: number[];
  selectedShoe: ShoeItem = null;
  imgSrc: string;
  curentSize: number = null;

  constructor(private newItemsService: NewItemsService,
              private shoeItemRepository: ShoeItemRepository) {
  }


  ngOnInit(): void {
    this.newItemsService.getItemsForcCreatingNewItem()
      .subscribe(result => this.basicShoesToSell =
        result.map(shoe => {
          return {id: null, basicShoe: shoe, dateCreated: null, datePurchased: null, size: null, userRating: null}
        }));
    this.initSizes();
  }

  getSelectedShoe(object: { item: ShoeItem, imgSrc: string }): void {
    this.selectedShoe = object.item;
    this.imgSrc = object.imgSrc;
  }

  initSizes(): void {
    this.sizes = [];
    for (let size = 3; size <= 10; size += 0.5) {
      this.sizes.push(size);
    }
  }

  chooseSize(size: number): void {
    this.curentSize = this.curentSize === size ? null : size;
  }

  addItemToSell(): void {


    const itemToAdd: InputShoeItem = {
      dateCreated: new Date(),
      datePurchased: null,
      userRating: null,
      size: this.curentSize,
      basicShoeId: this.selectedShoe.basicShoe.id,
    }

    this.newItemsService.addNewItem(itemToAdd).subscribe(newShoe => {
      this.shoeItemRepository.upsertItem([newShoe]);
    });


    this.curentSize = null;
  }
}
