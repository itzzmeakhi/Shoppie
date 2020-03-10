import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Product } from 'src/app/shared/product.model';
import { UserService } from '../../../../shared/user.service';
import { UserCart, NewUser } from 'src/app/shared/new-user.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit, OnDestroy {

  @Input() product : Product;
  @Input() index : number;
  addedItemsToCart : number;
  canAddToCart : boolean = false;
  userLoggedInDetails : NewUser;
  productAlreadyInCart : boolean = false;
  userDetailsSubs : Subscription;
  addCartSubs : Subscription;
  userDetailsEmitSubs : Subscription;

  constructor(private activatedRoute : ActivatedRoute,
              private router : Router,
              private userService : UserService) { }

  ngOnInit() {
    this.userDetailsSubs = this.userService.userDetails
      .subscribe(userData => {
        this.userLoggedInDetails = userData;
        if(this.userLoggedInDetails.userCartItems) {
          this.userLoggedInDetails.userCartItems.forEach(cartItem => {
            if(cartItem.productId === this.product.productId) {
              this.addedItemsToCart = cartItem.quantity;
              this.canAddToCart = true;
            }
          })
        }
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
    let updatedCartItems : UserCart[];
    const newCartItem = new UserCart(this.product.productId, this.addedItemsToCart);
    if(this.userLoggedInDetails.userCartItems.length > 0) {
      this.userLoggedInDetails.userCartItems.forEach(cartItem => {
        // console.log(cartItem.productId);
        if(cartItem.productId === this.product.productId) {
          cartItem.quantity = this.addedItemsToCart;
          this.productAlreadyInCart = true;
        }
      })
    }

    if(this.productAlreadyInCart) {
      updatedCartItems = [...this.userLoggedInDetails.userCartItems];
      this.productAlreadyInCart = false;
    } else {
      updatedCartItems = [...this.userLoggedInDetails.userCartItems, newCartItem];
    }

    this.addCartSubs = this.userService.saveProductToCart(updatedCartItems, this.userLoggedInDetails.rowId)
      .subscribe(addedResponse => {
        // console.log(addedResponse);
        console.log("Added to Cart");
        this.userDetailsEmitSubs = this.userService.getUser(this.userLoggedInDetails.userId)
          .subscribe(userData => {
            this.userService.userDetails.next(userData);
          })
      })
  }

  ngOnDestroy() {
    if(this.userDetailsSubs) {
      this.userDetailsSubs.unsubscribe();
    }

    if(this.addCartSubs) {
      this.addCartSubs.unsubscribe();
    }

    if(this.userDetailsEmitSubs) {
      this.userDetailsEmitSubs.unsubscribe();
    }
  }

}
