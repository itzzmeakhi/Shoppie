import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../../shared/product.service';
import { Product } from '../../../shared/product.model';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[];

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(productsData => {
        this.products = productsData;
        // console.log(productsData);
      })
  }

}
