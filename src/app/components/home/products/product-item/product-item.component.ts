import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product : Product;
  @Input() index : number;
  addedItemsToCart : number;

  constructor(private activatedRoute : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {

  }

  onClicked(event : any) {
    if(event.target.tagName === 'BUTTON') {
      if(event.target.value === 'add') {
        this.onAddItem();
      } else if(event.target.value === 'sub') {
        this.onRemoveItem();
      }
    } else {
      this.router.navigate(['/home/products', this.product.productId]);
    }
  }

  onAddItem() {
    if(this.addedItemsToCart == null) {
      this.addedItemsToCart = 1;
    } else {
      this.addedItemsToCart = this.addedItemsToCart + 1;
    }
  }

  onRemoveItem() {
    if(this.addedItemsToCart == null) {
      return;
    } else {
      this.addedItemsToCart = this.addedItemsToCart - 1;
    }
  }

}
