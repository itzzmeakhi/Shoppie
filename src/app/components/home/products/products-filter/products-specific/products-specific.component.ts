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
  filteredProducts : Product[];
  getProductsByBrandSubs : Subscription;
  getProductsByCategorySubs : Subscription;

  

  constructor(private activatedRoute : ActivatedRoute,
              private productService : ProductService) { }

  ngOnInit() {
    this.filterId = this.activatedRoute.snapshot.params['filterId'];
    this.filterType = this.activatedRoute.snapshot.params['filterType'];

    if(this.filterId && this.filterType) {
      if(this.filterType === 'brand') {
        console.log("Filtered By Brand");
        // console.log(this.filterId);
        this.getProductsByBrandSubs = this.productService.getProductsBasedOnBrand(this.filterId)
          .subscribe(productsData => {
            this.filteredProducts = productsData;
            // console.log(productsData);
          })
      } else if(this.filterType === 'category') {
        console.log("Filtered By Category");
        this.getProductsByCategorySubs = this.productService.getProductsBasedOnCategory(this.filterId)
          .subscribe(productsData => {
            this.filteredProducts = productsData;
            // console.log(productsData);
          })
      }
    }
  }

  ngOnDestroy() {
    if(this.getProductsByBrandSubs) {
      this.getProductsByBrandSubs.unsubscribe();
    }

    if(this.getProductsByCategorySubs) {
      this.getProductsByCategorySubs.unsubscribe();
    }
  }

}
