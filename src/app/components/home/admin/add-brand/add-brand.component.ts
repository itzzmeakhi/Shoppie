import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from '../../../../shared/product.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  addBrandForm : FormGroup;
  brandsAvailable = [];
  isBrandsAvailable : boolean;


  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.addBrandForm = new FormGroup({
      'brandName' : new FormControl('', [ Validators.required ])
    })

    this.productService.getProductBrands()
      .subscribe(productBrandsData => {
        this.isBrandsAvailable = productBrandsData.length > 0;
        this.brandsAvailable = productBrandsData;
        //console.log(productBrandsData);
      })

  }

  get brandName() {
    return this.addBrandForm.get('brandName');
  }

  onFormSubmit() {
    const newBrand = {
      'brandName' : this.brandName.value,
      'brandId' : new Date().getTime()
    };

    const updatedBrands = [...this.brandsAvailable, newBrand];

    this.productService.addProductBrand(updatedBrands)
      .subscribe(response => {
        console.log("Brand Added");
      })
  }

} 
