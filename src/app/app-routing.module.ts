import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuardService } from './components/auth/auth-guard.service';
import { ProductsComponent } from './components/home/products/products.component';
import { UserComponent } from './components/home/user/user.component';
import { MyAddressesComponent } from './components/home/user/my-addresses/my-addresses.component';
import { AddressViewEditComponent } from './components/home/user/my-addresses/address-view-edit/address-view-edit.component';
import { AddProductComponent } from './components/home/admin/add-product/add-product.component';
import { ProductDetailComponent } from './components/home/products/product-detail/product-detail.component';
import { UserCartComponent } from './components/home/user/user-cart/user-cart.component';
import { UserOrdersComponent } from './components/home/user/user-orders/user-orders.component';
import { ProductsFilterComponent } from './components/home/products/products-filter/products-filter.component';
import { AddCategoryComponent } from './components/home/admin/add-category/add-category.component';
import { AddBrandComponent } from './components/home/admin/add-brand/add-brand.component';
import { ProductsSpecificComponent } from './components/home/products/products-filter/products-specific/products-specific.component';

const appRoutes : Routes = [
    { path : '', redirectTo : '/home', pathMatch : 'full' },
    { path : 'login', component : LoginComponent },
    { path : 'signup', component : SignupComponent },
    { path : 'add/product', component : AddProductComponent },
    { path : 'add/category', component : AddCategoryComponent },
    { path : 'add/brand', component : AddBrandComponent },
    { path : 'home', component : HomeComponent, canActivate : [AuthGuardService], children : [
        { path : '', component : ProductsComponent },
        { path : 'products/filter', component : ProductsFilterComponent },
        { path : 'products/filter/:filterType/:filterId', component : ProductsSpecificComponent },
        { path : 'products/:prodId', component : ProductDetailComponent },
        { path : 'user/:id', component : UserComponent },
        { path : 'user/:id/cart', component : UserCartComponent },
        { path : 'user/:id/orders', component : UserOrdersComponent },
        { path : 'user/:rowid/addresses', component : MyAddressesComponent },
        { path : 'user/:rowid/addresses/:addrId', component : AddressViewEditComponent }
    ] }
];


@NgModule({
    imports : [ RouterModule.forRoot(appRoutes) ],
    exports : [ RouterModule ]
})
export class AppRoutingModule {}