import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent} from "./header/header.component";


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import { NotFoundComponent } from './not-found/not-found.component';
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import {authInterceptor} from "./auth/auth-interceptor.service";
import {RecipesModule} from "./recipes/recipes.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    RecipesModule
  ],
  providers: [AppRoutingModule,ShoppingListService, provideHttpClient(withFetch(),withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
