import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { ProductService } from '../../../../shared/product.service';


@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit, OnDestroy {

  brands = [];
  categories = [];
  getBrandsSubs : Subscription;
  getCategoriesSubs : Subscription;
  
  constructor(private productService : ProductService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.getBrandsSubs = this.productService.getProductBrands()
      .subscribe(brandsData => {
        this.brands = brandsData;
      })

    this.getCategoriesSubs = this.productService.getCategories()
      .subscribe(categoriesData => {
        this.categories = categoriesData;
      })
  }

  // Triggers when a specific brand is selected

  onSelectBrand(brandId : string) {
    // console.log(brandId);
    this.router.navigate(['brand', brandId], { relativeTo : this.activatedRoute });
  }

  // Triggers when a specific category is selected

  onSelectCategory(categoryId : string) {
    // console.log(categoryId);
    this.router.navigate(['category', categoryId], { relativeTo : this.activatedRoute });
  }

  ngOnDestroy() {
    if(this.getBrandsSubs) {
      this.getBrandsSubs.unsubscribe();
    }

    if(this.getCategoriesSubs) {
      this.getCategoriesSubs.unsubscribe();
    }
  }

}
