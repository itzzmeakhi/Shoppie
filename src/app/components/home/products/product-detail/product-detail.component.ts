import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';
import { UserService } from './../../../../shared/user.service';
import { NewUser, UserCart } from './../../../../shared/new-user.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productId : string;
  productSelected : Product;
  productRating1 : boolean = false;
  productRating2 : boolean = false;
  productRating3 : boolean = false;
  productRating4 : boolean = false;
  productRating5 : boolean = false;
  isAlreadyInCart : boolean = false;
  userRatingForProduct : number;
  productOverallRating : number;
  productNumberOfRatings : number;
  userDetails : NewUser;
  isRated : boolean;

  getProductSubs : Subscription;
  userDetailsSubs : Subscription;
  saveProductRatingSubs : Subscription;
  addToCartSubs : Subscription;
  updateUserDetailsSubs : Subscription;

  constructor(private activatedRoute : ActivatedRoute,
              private productService : ProductService,
              private userService : UserService,
              private router : Router) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['prodId'];
    this.getProductSubs = this.productService.getProduct(this.productId)
      .subscribe(productData => {
        this.productSelected = productData;

        this.userDetailsSubs = this.userService.userDetails
          .subscribe(userData => {
            //console.log(userData);
            this.userDetails = userData;

            if(this.userDetails.userCartItems.length > 0) {
              this.userDetails.userCartItems.forEach(cartItem => {
                if(cartItem.productId === this.productSelected.productId) {
                  this.isAlreadyInCart = true;
                }
              })
            }

            for(const key in this.productSelected.productUserRatings) {
              this.isRated = this.productSelected.productUserRatings[key].user === this.userDetails.userId;
              if(this.isRated) {
                this.userRatingForProduct = this.productSelected.productUserRatings[key].rating;
              }
            } 
            this.productNumberOfRatings = this.productSelected.productUserRatings.length;
            if(this.productNumberOfRatings > 0) {
              this.onCalculateOverallRating();
            }
          })
      })
  }

  // Triggers when a ratingStar is clicked loggedIn user

  onGiveRating(ratingScale : string) {

    if(ratingScale === "one") {
      this.productRating1 = true;
    } else if(ratingScale === "two" && this.productRating1) {
      this.productRating2 = true;
    } else if(ratingScale === "three" && this.productRating2) {
      this.productRating3 = true;
    } else if(ratingScale === "four" && this.productRating3) {
      this.productRating4 = true;
    } else if(ratingScale === 'five' && this.productRating4) {
      this.productRating5 = true;
    }

  }

  // Triggers when ratedStar is clicked again to remove the rating

  onRemoveRating(ratingScale : string) {

    if(ratingScale === "one") {
      this.productRating1 = false;
      this.productRating2 = false;
      this.productRating3 = false;
      this.productRating4 = false;
      this.productRating5 = false;
    } else if(ratingScale === "two") {
      this.productRating2 = false;
      this.productRating3 = false;
      this.productRating4 = false;
      this.productRating5 = false;
    } else if(ratingScale === "three") {
      this.productRating3 = false;
      this.productRating4 = false;
      this.productRating5 = false;
    } else if(ratingScale === "four") {
      this.productRating4 = false;
      this.productRating5 = false;
    } else if(ratingScale === "five") {
      this.productRating5 = false;
    }

  }

  // Triggers when loggedInUser submits the raing

  onSubmitRating() {
    let productRating : number = 0;

    productRating = this.productRating1 ? productRating + 1 : productRating;
    productRating = this.productRating2 ? productRating + 1 : productRating;
    productRating = this.productRating3 ? productRating + 1 : productRating;
    productRating = this.productRating4 ? productRating + 1 : productRating;
    productRating = this.productRating5 ? productRating + 1 : productRating;
    //console.log(productRating);

    const productUserRating =  { 'user' : this.userDetails.userId, 'rating' : productRating };

    const productRatings = [...this.productSelected.productUserRatings, productUserRating];

    this.saveProductRatingSubs = this.productService.saveProductRating(productRatings, this.productSelected.rowId)
      .subscribe(productsData => {
        // console.log(productsData);
        this.isRated = true;
        this.userRatingForProduct = productRating;
        if(this.productNumberOfRatings > 0) {
          this.productOverallRating = (this.productOverallRating + this.userRatingForProduct) / (this.productNumberOfRatings + 1);
        } else {
          this.productOverallRating = this.userRatingForProduct;
          this.productNumberOfRatings = 1;
        }
        // console.log(this.productOverallRating);
      })
  }

  // To calculate the overall rating of products received from all users

  onCalculateOverallRating() {
    let index = -1;
    for(const key in this.productSelected.productUserRatings) {
      index = index + 1;
      if(index == 0) {
        this.productOverallRating = this.productSelected.productUserRatings[key].rating;
      } else {
        this.productOverallRating = this.productOverallRating + this.productSelected.productUserRatings[key].rating;
      }      
    }
    this.productOverallRating = this.productOverallRating / this.productNumberOfRatings;
  }

  // On Navigate to products of specific brand

  onNavigateToBrand(brandId : string) {
    this.router.navigate(['/home/products/filter', 'brand', brandId]);
  }

  // On Navigate to products of specific category

  onNavigateToCategory(categoryId : string) {
    this.router.navigate(['/home/products/filter', 'category', categoryId]);
  }

  // Triggers when AddToCart Button is clicked

  onAddToCart() {
    let updatedCartItems : UserCart[] = [];
    const newCartItem = new UserCart(this.productSelected.productId, 1);

    updatedCartItems = [...this.userDetails.userCartItems, newCartItem];

    this.addToCartSubs = this.userService.saveProductToCart(updatedCartItems, this.userDetails.rowId)
      .subscribe(response => {
        this.updateUserDetailsSubs = this.userService.getUser(this.userDetails.userId)
          .subscribe(userData => {
            this.userService.userDetails.next(userData);
          })
        console.log("Added to cart");
      })
  }

  ngOnDestroy() {
    if(this.getProductSubs) {
      this.getProductSubs.unsubscribe();
    }

    if(this.userDetailsSubs) {
      this.userDetailsSubs.unsubscribe();
    }

    if(this.saveProductRatingSubs) {
      this.saveProductRatingSubs.unsubscribe();
    }

    if(this.addToCartSubs) {
      this.addToCartSubs.unsubscribe();
    }

    if(this.updateUserDetailsSubs) {
      this.updateUserDetailsSubs.unsubscribe();
    }

  }

}
