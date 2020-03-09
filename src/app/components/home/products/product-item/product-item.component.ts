import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/shared/product.model';
import { UserService } from '../../../../shared/user.service';
import { UserCart, NewUser } from 'src/app/shared/new-user.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product : Product;
  @Input() index : number;
  addedItemsToCart : number;
  canAddToCart : boolean = false;
  userLoggedInDetails : NewUser;

  constructor(private activatedRoute : ActivatedRoute,
              private router : Router,
              private userService : UserService) { }

  ngOnInit() {
    this.userService.userDetails
      .subscribe(userData => {
        this.userLoggedInDetails = userData;
      })
  }

  // Triggers when a click event occurred on any product card

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

  // Triggers when add button clicked (cart)

  onAddItem() {
    if(this.addedItemsToCart == null) {
      this.addedItemsToCart = 1;
      this.canAddToCart = true;
    } else {
      this.addedItemsToCart = this.addedItemsToCart + 1;
    }
  }

  // Triggers when remove button clicked (cart)

  onRemoveItem() {
    if(this.addedItemsToCart == null) {
      return;
    } else {
      if(this.addedItemsToCart == 1) {
        this.addedItemsToCart = null;
        this.canAddToCart = false;
      } else {
        this.addedItemsToCart = this.addedItemsToCart - 1;
      }
    }
  }

  // Triggers when addToCart button is clicked

  onAddToCart() {
    const newCartItem = new UserCart(this.product.productId, this.addedItemsToCart);
    const updatedCartItems = [...this.userLoggedInDetails.userCartItems, newCartItem];
    console.log(updatedCartItems);
    this.userService.saveProductToCart(updatedCartItems, this.userLoggedInDetails.rowId)
      .subscribe(addedResponse => {
        // console.log(addedResponse);
        console.log("Added to Cart");
        this.userService.getUser(this.userLoggedInDetails.userId)
          .subscribe(userData => {
            this.userService.userDetails.next(userData);
          })
      })
  }

}
