import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from '../../../../shared/product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm : FormGroup;
  categoriesAvailable = [];
  isCategoriesAvailable : boolean;

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.addCategoryForm = new FormGroup({
      'categoryName' : new FormControl('', [ Validators.required ])
    })

    this.productService.getCategories()
      .subscribe(categoryData => {
        this.isCategoriesAvailable = categoryData.length > 0;
        this.categoriesAvailable = categoryData;
        // console.log(categoryData);
      })
  }

  get categoryName() {
    return this.addCategoryForm.get('categoryName');
  }

  onFormSubmit() {
    const newCategory = {
      'categoryName' : this.categoryName.value,
      'categoryId' : new Date().getTime()
    };

    const updatedCategories = [...this.categoriesAvailable, newCategory];

    this.productService.addCategory(updatedCategories)
      .subscribe(response => {
        console.log("Category Added");
      })
  }
}
