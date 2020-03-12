import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Product } from '../../../../../shared/product.model';
import { ProductService } from '../../../../../shared/product.service';

@Component({
  selector: 'app-products-specific',
  templateUrl: './products-specific.component.html',
  styleUrls: ['./products-specific.component.css']
})
export class ProductsSpecificComponent implements OnInit, OnDestroy {

  filterType : string;
  filterId : string;
  filteredName : string;
  filteredProducts : Product[];
  productsInAPage : Product[];
  startNumber : number = 1;
  currentPageNumber : number;
  totalPages : number;
  getProductsByBrandSubs : Subscription;
  getProductsByCategorySubs : Subscription;
  getProductsSubs : Subscription;
  getBrandsSubs : Subscription;

  

  constructor(private activatedRoute : ActivatedRoute,
              private productService : ProductService) { }

  ngOnInit() {
    this.filterId = this.activatedRoute.snapshot.params['filterId'];
    this.filterType = this.activatedRoute.snapshot.params['filterType'];

    if(this.filterId && this.filterType) {
      if(this.filterType === 'brand') {
        console.log("Filtered By Brand");
        // console.log(this.filterId);

        this.getBrandsSubs = this.productService.getBrandName(this.filterId)
          .subscribe(response => {
            this.filteredName = response;
          })

        this.getProductsByBrandSubs = this.productService.getProductsBasedOnBrand(this.filterId)
          .subscribe(productsData => {
            this.filteredProducts = productsData;
            // console.log(productsData);
            this.paginateInitialSetup();
          })
      } else if(this.filterType === 'category') {
        console.log("Filtered By Category");

        this.getProductsSubs = this.productService.getCategoryName(this.filterId)
          .subscribe(response => {
            this.filteredName = response;
          })

        this.getProductsByCategorySubs = this.productService.getProductsBasedOnCategory(this.filterId)
          .subscribe(productsData => {
            this.filteredProducts = productsData;
            // console.log(productsData);
            this.paginateInitialSetup();
          })
      }
    }
  }

  // Paginate Initial Setup

  paginateInitialSetup() {
    if(this.filteredProducts.length % 8 === 0) {
      this.totalPages = this.filteredProducts.length / 8;
    } else {
      const rounded = Math.round(this.filteredProducts.length / 8)
      if(rounded < this.filteredProducts.length / 8) {
        this.totalPages = rounded + 1;
      } else {
        this.totalPages = rounded;
      }
    }
    this.paginateProducts(this.startNumber, 0);
  }

  // Triggers when page button is clicked

  paginateProducts(nextPage : number, prevPage : number, maxProducts = 8) {
    let startIndex : number;
    let endIndex : number;

    if(nextPage > prevPage) { 
      startIndex = prevPage * maxProducts;
      endIndex = nextPage * maxProducts;

      this.currentPageNumber = nextPage;
    } else if(nextPage < prevPage) {
      endIndex = (prevPage-1) * maxProducts;
      startIndex = (nextPage-1) * maxProducts;

      this.currentPageNumber = nextPage;
    }
    
    this.productsInAPage = this.filteredProducts.slice(startIndex, endIndex)
  }

  ngOnDestroy() {
    if(this.getProductsByBrandSubs) {
      this.getProductsByBrandSubs.unsubscribe();
    }

    if(this.getProductsByCategorySubs) {
      this.getProductsByCategorySubs.unsubscribe();
    }

    if(this.getBrandsSubs) {
      this.getBrandsSubs.unsubscribe();
    }

    if(this.getProductsSubs) {
      this.getProductsSubs.unsubscribe();
    }
  }

}
