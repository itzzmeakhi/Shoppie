import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ProductService } from '../../../../shared/product.service';


@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.css']
})
export class AddSellerComponent implements OnInit, OnDestroy {

  addSellerForm : FormGroup;
  sellersAvailable = [];
  isSellersAvailable : boolean;
  getSellersSubs : Subscription;
  addSellerSubs : Subscription;
  getSellersAfterAddSubs : Subscription;


  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.addSellerForm = new FormGroup({
      'sellerName' : new FormControl('', [ Validators.required ])
    })

    this.getSellersSubs = this.productService.getSellers()
      .subscribe(productSellersData => {
        this.isSellersAvailable = productSellersData.length > 0;
        this.sellersAvailable = productSellersData;
        //console.log(productSellersData);
      })

  }

  get brandName() {
    return this.addSellerForm.get('sellerName');
  }

  onFormSubmit() {
    const newBrand = {
      'sellerName' : this.brandName.value,
      'sellerId' : "seller-"+new Date().getTime()
    };

    const updatedSellers = [...this.sellersAvailable, newBrand];

    this.addSellerSubs = this.productService.addSeller(updatedSellers)
      .subscribe(response => {
        this.getSellersAfterAddSubs = this.productService.getSellers()
          .subscribe(productSellersData => {
            this.isSellersAvailable = productSellersData.length > 0;
            this.sellersAvailable = productSellersData;
            this.addSellerForm.reset();
            console.log("Seller Added");
          })
      })
  }

  ngOnDestroy() {
    if(this.getSellersSubs) {
      this.getSellersSubs.unsubscribe();
    }

    if(this.addSellerSubs) {
      this.addSellerSubs.unsubscribe();
    }

    if(this.getSellersAfterAddSubs) {
      this.getSellersAfterAddSubs.unsubscribe();
    }
  }

} 
