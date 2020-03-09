import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../../../../shared/user.service';
import { UserCart, NewUser } from '../../../../shared/new-user.model';
import { ProductService } from '../../../../shared/product.service';


@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

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

  constructor(private activatedRoute : ActivatedRoute,
              private userService : UserService,
              private productService : ProductService,
              private router : Router) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];

    this.selectAddressForm = new FormGroup({
      'addressSelected' : new FormControl('')
    })

    this.userService.getUser(this.userId)
      .subscribe(userData => {
        this.rowId = userData.rowId;
        this.userData = userData;
        this.orders = userData.userOrders;
        this.cartItems = userData.userCartItems;
        this.haveItemsInCart = this.cartItems.length > 0; 
        

        this.cartItems.forEach(cartItem => {
          this.productService.getProduct(cartItem.productId)
            .subscribe(productData => {
              let cartItemDetail = { 'name' : productData.productName, 'imgUrl' : productData.productImageUrl, 'quantity' : cartItem.quantity, 'price' : productData.productPrice, 'discount' : productData.productDiscount, 'eprice' : (productData.productPrice - ((productData.productDiscount * productData.productPrice)/100)) * cartItem.quantity };
              this.cartItemsDetails = [...this.cartItemsDetails, cartItemDetail];
              this.totalPrice = this.totalPrice + (productData.productPrice - ((productData.productDiscount * productData.productPrice)/100)) * cartItem.quantity;
            })
        })
      })
  }

  onBuyItems() {
    const newOrder = {
      'ordId' : this.userId.slice(0,9)+new Date().getTime(),
      'items' : this.cartItemsDetails,
      'totalPrice' : this.totalPrice,
      'delivered' : this.deliverTo
    }
    const updatedOrders = [...this.orders, newOrder];
    this.userService.placeAnOrder(updatedOrders, this.rowId)
      .subscribe(response => {
        // console.log(response);
        console.log("Order Placed");
        this.userService.saveProductToCart([], this.rowId)
          .subscribe(response => {})
        this.haveItemsInCart = false;
        this.userService.getUser(this.userId)
          .subscribe(userData => {
            this.userService.userDetails.next(userData);
            alert("Order Placed");
            this.router.navigate(['/home/user', userData.userId, 'orders']);
          })
      })
  }

  onClearCartItems() {
    this.userService.saveProductToCart([], this.rowId)
      .subscribe(response => {
        this.userService.getUser(this.userId)
          .subscribe(userData => {
            this.userService.userDetails.next(userData);
            console.log("Cart Cleared!");
            this.router.navigate(['/home']);
          })
      })
  }

  onSelectAddress() {
    this.deliverTo = this.userData.userSavedAddresses[this.selectAddressForm.get('addressSelected').value].addressSaveAs;
    console.log(this.deliverTo);
  }


}
