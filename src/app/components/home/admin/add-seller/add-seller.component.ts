import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from '../../../../shared/product.service';

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.css']
})
export class AddSellerComponent implements OnInit {

  addSellerForm : FormGroup;
  sellersAvailable = [];
  isSellersAvailable : boolean;


  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.addSellerForm = new FormGroup({
      'sellerName' : new FormControl('', [ Validators.required ])
    })

    this.productService.getSellers()
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

    this.productService.addSeller(updatedSellers)
      .subscribe(response => {
        console.log("Seller Added");
      })
  }

} 
