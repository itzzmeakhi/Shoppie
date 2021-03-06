import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Product } from 'src/app/shared/product.model';
import { ProductService } from '../../../../shared/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  addProductForm : FormGroup;
  onAddProductSubs : Subscription;
  getBrandsSubs : Subscription;
  getCategoriesSubs : Subscription;
  getSellersSubs : Subscription;
  productAdded : boolean = false;
  brands = [];
  categories = [];
  sellers = [];

  // productCategories = [
  //   { name : 'Mobiles & Accessories', id : 'category01' },
  //   { name : 'Computers & Laptops', id : 'category002' }
  // ];

  // productBrands = [
  //   { name : 'Apple', id : 'brand001' },
  //   { name : 'Redmi', id : 'brand002' }
  // ];

  // productSellers = [
  //   { name : 'SuperComNet', id : 'seller001'},
  //   { name : 'TrueComRetail', id : 'seller002' }
  // ];

  constructor(private productService : ProductService,
              private router : Router) { }

  ngOnInit() {
    this.addProductForm = new FormGroup({
      'productName' : new FormControl('', [ Validators.required ]),
      'productDescription' : new FormControl('', [ Validators.required ]),
      'productImageUrl' : new FormControl('', [ Validators.required ]),
      'productPrice' : new FormControl('', [ Validators.required ]),
      'productDiscount' : new FormControl('', [ Validators.required ]),
      'productSeller' : new FormControl('', [ Validators.required ]),
      'productBrand' : new FormControl('', [ Validators.required ]),
      'productCategory' : new FormControl('', [ Validators.required ]),
      'productHighlights' : new FormArray([new FormControl('', Validators.required )]),
      'productAvailableQuantity' : new FormControl('', [ Validators.required ])
    })

    this.getBrandsSubs = this.productService.getProductBrands()
      .subscribe(brandsData => {
        this.brands = brandsData;
      })

    this.getCategoriesSubs = this.productService.getCategories()
      .subscribe(categoriesData => {
        this.categories = categoriesData;
      })

    this.getSellersSubs = this.productService.getSellers()
      .subscribe(sellersData => {
        this.sellers = sellersData;
      })
  }

  get productName() {
    return this.addProductForm.get('productName');
  }

  get productDescription() {
    return this.addProductForm.get('productDescription');
  }

  get productImageUrl() {
    return this.addProductForm.get('productImageUrl');
  }

  get productPrice() {
    return this.addProductForm.get('productPrice');
  }

  get productDiscount() {
    return this.addProductForm.get('productDiscount');
  }

  get productSeller() {
    return this.addProductForm.get('productSeller');
  }

  get productBrand() {
    return this.addProductForm.get('productBrand');
  }

  get productCategory() {
    return this.addProductForm.get('productCategory');
  }

  get productHighlights() {
    return this.addProductForm.get('productHighlights');
  }

  get productHighlightsControls() {
    return (this.addProductForm.get('productHighlights') as FormArray).controls;
  }

  get productAvailableQuantity() {
    return this.addProductForm.get('productAvailableQuantity');
  }

  // Triggers when addProductForm is submitted.

  onFormSubmit() {
    // console.log(this.addProductForm);
    let brandId : string;
    let categoryId : string;
    let sellerId : string;

    this.brands.forEach(brand => {
      if(brand.brandName === this.productBrand.value) {
        brandId = brand.brandId;
      }
    });

    this.categories.forEach(category => {
      if(category.categoryName === this.productCategory.value) {
        categoryId = category.categoryId;
      }
    })

    this.sellers.forEach(seller => {
      if(seller.sellerName === this.productSeller.value) {
        sellerId = seller.sellerId;
      }
    })

    const newProduct = new Product(
      this.productCategory.value.slice(0, 4)+this.productBrand.value.slice(0, 4)+new Date().getTime(),
      this.productName.value,
      this.productDescription.value,
      this.productImageUrl.value,
      this.productPrice.value,
      this.productDiscount.value,
      this.productSeller.value,
      this.productBrand.value,
      this.productCategory.value,
      brandId as string,
      categoryId as string,
      sellerId as string,
      this.productAvailableQuantity.value,
      this.productHighlights.value,
      [],
      null
    );

    this.onAddProductSubs = this.productService.onAddProduct(newProduct)
      .subscribe(responseData => {
        // console.log(responseData);
        this.productAdded = true;
        this.addProductForm.reset();
        window.scrollTo(0, 0);
        console.log("Product Added!");
      })

  }

  // Triggers when add another product is clicked

  onAddAnotherProduct() {
    this.addProductForm.reset();
    this.productAdded = false;
  }

  // Triggers when goToProducts is clicked

  goToProducts() {
    this.router.navigate(['/home']);
  }

  // Triggers when add row to productHighlights array is clicked

  onAddHighlight() {
    (this.productHighlights as FormArray).push(new FormControl('', Validators.required ));
  }

  // Triggers when remove row from productHighlights array is clicked

  onRemoveHighlight(index : number) {
    (this.productHighlights as FormArray).removeAt(index);
  }

  // Triggers when cancel button is clicked

  onCancel() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    if(this.onAddProductSubs) {
      this.onAddProductSubs.unsubscribe();
    }

    if(this.getBrandsSubs) {
      this.getBrandsSubs.unsubscribe();
    }

    if(this.getCategoriesSubs) {
      this.getCategoriesSubs.unsubscribe();
    }

    if(this.getSellersSubs) {
      this.getSellersSubs.unsubscribe();
    }
  }

}
