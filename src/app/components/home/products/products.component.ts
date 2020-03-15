import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ProductService } from '../../../shared/product.service';
import { Product } from '../../../shared/product.model';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products : Product[];
  startNumber : number = 1;
  getProductsSubs : Subscription;
  productsInAPage : Product[];
  currentPageNumber : number;
  totalPages : number;
  isProductsLoading : boolean = false;

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.isProductsLoading = true;
    this.getProductsSubs = this.productService.getProducts()
      .subscribe(productsData => {
        this.products = productsData;
        // console.log(productsData);

        if(this.products.length % 8 === 0) {
          this.totalPages = this.products.length / 8;
        } else {
          const rounded = Math.round(this.products.length / 8)
          if(rounded < this.products.length / 8) {
            this.totalPages = rounded + 1;
          } else {
            this.totalPages = rounded;
          }
        }

        this.paginateProducts(this.startNumber, 0);
        this.isProductsLoading = false
      })
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
    
    this.productsInAPage = this.products.slice(startIndex, endIndex)
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    if(this.getProductsSubs) {
      this.getProductsSubs.unsubscribe();
    }
  }

}
