import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ProductService } from '../../../../shared/product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  addCategoryForm : FormGroup;
  categoriesAvailable = [];
  isCategoriesAvailable : boolean;
  getCategoriesSubs : Subscription;
  addCategorySubs : Subscription;
  getCategoriesAfterAddSubs : Subscription;

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.addCategoryForm = new FormGroup({
      'categoryName' : new FormControl('', [ Validators.required ])
    })

    this.getCategoriesSubs = this.productService.getCategories()
      .subscribe(categoryData => {
        this.isCategoriesAvailable = categoryData.length > 0;
        this.categoriesAvailable = categoryData;
        // console.log(categoryData);
      })
  }

  get categoryName() {
    return this.addCategoryForm.get('categoryName');
  }

  // Triggers when addCategoryForm is submitted

  onFormSubmit() {
    const newCategory = {
      'categoryName' : this.categoryName.value,
      'categoryId' : "category-"+new Date().getTime()
    };

    const updatedCategories = [...this.categoriesAvailable, newCategory];

    this.addCategorySubs = this.productService.addCategory(updatedCategories)
      .subscribe(response => {
        this.getCategoriesAfterAddSubs = this.productService.getCategories()
          .subscribe(categoriesData => {
            this.isCategoriesAvailable = categoriesData.length > 0;
            this.categoriesAvailable = categoriesData;
            this.addCategoryForm.reset();
            console.log("Category Added");
          })
      })
  }

  ngOnDestroy() {
    if(this.getCategoriesSubs) {
      this.getCategoriesSubs.unsubscribe();
    }

    if(this.addCategorySubs) {
      this.addCategorySubs.unsubscribe();
    }

    if(this.getCategoriesAfterAddSubs) {
      this.getCategoriesAfterAddSubs.unsubscribe();
    }
  }
}
