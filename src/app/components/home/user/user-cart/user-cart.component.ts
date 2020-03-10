import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserService } from '../../../../shared/user.service';
import { UserCart, NewUser } from '../../../../shared/new-user.model';
import { ProductService } from '../../../../shared/product.service';


@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit, OnDestroy {

  userId : string;
  cartItems : UserCart[];
  cartItemsDetails = [];
  totalPrice : number = 0;
  rowId : string;
  orders : any[] = [];
  userData : NewUser;
  haveItemsInCart : boolean = false;
  selectAddressForm : FormGroup;
  deliverTo : string;
  getUserSubs : Subscription;
  getProductSubs : Subscription;
  placeOrderSubs : Subscription;
  saveProductSubs : Subscription;
  getUserDetailsSubs : Subscription;
  clearCartSubs : Subscription;
  userSubs : Subscription;

  constructor(private activatedRoute : ActivatedRoute,
              private userService : UserService,
              private productService : ProductService,
              private router : Router) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];

    this.selectAddressForm = new FormGroup({
      'addressSelected' : new FormControl('')
    })

    this.getUserSubs = this.userService.getUser(this.userId)
      .subscribe(userData => {
        this.rowId = userData.rowId;
        this.userData = userData;
        this.orders = userData.userOrders;
        this.cartItems = userData.userCartItems;
        this.haveItemsInCart = this.cartItems.length > 0; 
        
        this.cartItems.forEach(cartItem => {
          this.getProductSubs = this.productService.getProduct(cartItem.productId)
            .subscribe(productData => {
              let cartItemDetail = { 'name' : productData.productName, 'imgUrl' : productData.productImageUrl, 'quantity' : cartItem.quantity, 'price' : productData.productPrice, 'discount' : productData.productDiscount, 'eprice' : (productData.productPrice - ((productData.productDiscount * productData.productPrice)/100)) * cartItem.quantity };
              this.cartItemsDetails = [...this.cartItemsDetails, cartItemDetail];
              this.totalPrice = this.totalPrice + (productData.productPrice - ((productData.productDiscount * productData.productPrice)/100)) * cartItem.quantity;
            })
        })
      })
  }
 
  // Triggers when loggedIn user clicks BuyNow Button

  onBuyItems() {
    const newOrder = {
      'ordId' : this.userId.slice(0,9)+new Date().getTime(),
      'items' : this.cartItemsDetails,
      'totalPrice' : this.totalPrice,
      'delivered' : this.deliverTo
    }
    const updatedOrders = [...this.orders, newOrder];
    this.placeOrderSubs = this.userService.placeAnOrder(updatedOrders, this.rowId)
      .subscribe(response => {
        // console.log(response);
        console.log("Order Placed");
        this.saveProductSubs = this.userService.saveProductToCart([], this.rowId)
          .subscribe(response => {
            this.getUserDetailsSubs = this.userService.getUser(this.userId)
              .subscribe(userData => {
                this.haveItemsInCart = false;
                // console.log(userData);
                this.userService.userDetails.next(userData);
                alert("Order Placed"); 
                this.router.navigate(['/home/user', userData.userId, 'orders']);
              })
          })
      })
  }

  // To Clear the items in the cart

  onClearCartItems() {
    this.clearCartSubs = this.userService.saveProductToCart([], this.rowId)
      .subscribe(response => {
        this.userSubs = this.userService.getUser(this.userId)
          .subscribe(userData => {
            this.userService.userDetails.next(userData);
            console.log("Cart Cleared!");
            this.router.navigate(['/home']);
          })
      })
  }

  // To select the addresses to deliver the products

  onSelectAddress() {
    this.deliverTo = this.userData.userSavedAddresses[this.selectAddressForm.get('addressSelected').value].addressSaveAs;
    // console.log(this.deliverTo);
  }

  ngOnDestroy() {
    if(this.getUserSubs) {
      this.getUserSubs.unsubscribe();
    }

    if(this.getProductSubs) {
      this.getProductSubs.unsubscribe();
    }

    if(this.placeOrderSubs) {
      this.placeOrderSubs.unsubscribe();
    }

    if(this.saveProductSubs) {
      this.saveProductSubs.unsubscribe();
    }

    if(this.getUserDetailsSubs) {
      this.getUserDetailsSubs.unsubscribe();
    }

    if(this.clearCartSubs) {
      this.clearCartSubs.unsubscribe();
    }

    if(this.userSubs) {
      this.userSubs.unsubscribe();
    }

  }

}
