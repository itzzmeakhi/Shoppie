import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ProductService } from '../../../../shared/product.service';


@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit, OnDestroy {

  addBrandForm : FormGroup;
  brandsAvailable = [];
  isBrandsAvailable : boolean;
  getProductBrandsSubs : Subscription;
  addBrandSubs : Subscription;
  getBrandsAfterAddSubs : Subscription;


  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.addBrandForm = new FormGroup({
      'brandName' : new FormControl('', [ Validators.required ])
    })

    this.getProductBrandsSubs = this.productService.getProductBrands()
      .subscribe(productBrandsData => {
        this.isBrandsAvailable = productBrandsData.length > 0;
        this.brandsAvailable = productBrandsData;
        //console.log(productBrandsData);
      })

  }

  get brandName() {
    return this.addBrandForm.get('brandName');
  }

  // Triggers when addBrandForm is submitted

  onFormSubmit() {
    const newBrand = {
      'brandName' : this.brandName.value,
      'brandId' : "brand-"+new Date().getTime()
    };

    const updatedBrands = [...this.brandsAvailable, newBrand];

    this.addBrandSubs = this.productService.addProductBrand(updatedBrands)
      .subscribe(response => {
        this.getBrandsAfterAddSubs = this.productService.getProductBrands()
          .subscribe(productBrandsData => {
            this.isBrandsAvailable = productBrandsData.length > 0;
            this.brandsAvailable = productBrandsData;
            this.addBrandForm.reset();
            console.log("Brand Added");
          })
      })
  }

  ngOnDestroy() {
    if(this.getProductBrandsSubs) {
      this.getProductBrandsSubs.unsubscribe();
    }

    if(this.addBrandSubs) {
      this.addBrandSubs.unsubscribe();
    }

    if(this.getBrandsAfterAddSubs) {
      this.getBrandsAfterAddSubs.unsubscribe();
    }
  }

} 
