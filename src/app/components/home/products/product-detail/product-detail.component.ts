import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId : string;
  productSelected : Product;

  constructor(private activatedRoute : ActivatedRoute,
              private productService : ProductService) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['prodId'];
    this.productService.getProduct(this.productId)
      .subscribe(productData => {
        this.productSelected = productData;
        // console.log(this.productSelected);
      })
  }

}
