import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Product, Rating } from './product.model';

@Injectable({ providedIn : 'root' })
export class ProductService {

    product = new BehaviorSubject<Product>(null);

    constructor(private httpClient : HttpClient) {}

    // To Add Product - Access only to Admin

    onAddProduct(newProduct : Product) {
        return this.httpClient.post('https://shoppie-4c4f4.firebaseio.com/products.json', newProduct)
    }

    // To Retrieve all products

    getProducts() {
        return this.httpClient.get<Product[]>('https://shoppie-4c4f4.firebaseio.com/products.json')
        .pipe(
            map(productsData => {
                let products : Product[] = [];
                for(const key in productsData) {
                    if(productsData.hasOwnProperty(key)) {
                        const product = new Product(
                            productsData[key].productId,
                            productsData[key].productName,
                            productsData[key].productDescription,
                            productsData[key].productImageUrl,
                            productsData[key].productPrice,
                            productsData[key].productDiscount,
                            productsData[key].productSeller,
                            productsData[key].productBrand,
                            productsData[key].productCategory,
                            productsData[key].productAvailableQuantity,
                            productsData[key].productHighlights,
                            productsData[key].productUserRatings ? productsData[key].productUserRatings : [],
                            key
                        );
                        products = [...products, product];
                    }

                }

                return products;
            })
        )
    }

    // To Retrieve a particular product

    getProduct(productId : string) {
        return this.httpClient.get<Product>('https://shoppie-4c4f4.firebaseio.com/products.json?orderBy="productId"&equalTo="'+productId+'"')
            .pipe(
                map(productData => {
                    for(const key in productData) {
                        if(productData.hasOwnProperty(key)) {
                            const product = new Product(
                                productData[key].productId,
                                productData[key].productName,
                                productData[key].productDescription,
                                productData[key].productImageUrl,
                                productData[key].productPrice,
                                productData[key].productDiscount,
                                productData[key].productSeller,
                                productData[key].productBrand,
                                productData[key].productCategory,
                                productData[key].productAvailableQuantity,
                                productData[key].productHighlights,
                                productData[key].productUserRatings ? productData[key].productUserRatings : [],
                                key
                            )

                            return product;
                        }
                    }
                })
            )
    }

    // To save user product rating

    saveProductRating(ratings : Rating[], rowId : string) {
        return this.httpClient.put('https://shoppie-4c4f4.firebaseio.com/products/'+rowId+'/productUserRatings.json', ratings)
    }
    
}