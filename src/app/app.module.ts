import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './shared/error/error.component';
import { SideNavComponent } from './components/home/side-nav/side-nav.component';
import { ProductsComponent } from './components/home/products/products.component';
import { UserComponent } from './components/home/user/user.component';
import { MyAddressesComponent } from './components/home/user/my-addresses/my-addresses.component';
import { NoAddressesComponent } from './components/home/user/my-addresses/no-addresses/no-addresses.component';
import { AddressItemComponent } from './components/home/user/my-addresses/address-item/address-item.component';
import { AddressViewEditComponent } from './components/home/user/my-addresses/address-view-edit/address-view-edit.component';
import { ProductDetailComponent } from './components/home/products/product-detail/product-detail.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { AddProductComponent } from './components/home/admin/add-product/add-product.component';
import { ProductItemComponent } from './components/home/products/product-item/product-item.component';

import { IsAuthenticatedInterceptorService } from './components/auth/is-authenticated-interceptor.service';

import { MaxLengthPipe } from './shared/max-length.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    ErrorComponent,
    SideNavComponent,
    ProductsComponent,
    UserComponent,
    MyAddressesComponent,
    NoAddressesComponent,
    AddressItemComponent,
    AddressViewEditComponent,
    ProductDetailComponent,
    AdminComponent,
    AddProductComponent,
    ProductItemComponent,
    MaxLengthPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : IsAuthenticatedInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
