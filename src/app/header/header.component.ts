import {Component, OnDestroy, OnInit} from "@angular/core";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {AuthService} from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuCollapsed: boolean = true;
  isAuthenticated: boolean = false;
  userSubscription: Subscription;

  constructor(private shoppingListService:ShoppingListService,
              private auth:AuthService
              ) {}

  ngOnInit(): void {
    this.userSubscription = this.auth.user.subscribe(user => {
      if (user) {
        this.isAuthenticated = (user.jwt != null)
      }
    })
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onPostData() {
    //this.htppClientService.postRecipes(this.recipeService.getRecipes());
    //this.htppClientService.postIngredientsAdded(this.shoppingListService.getIngredients());
  }

  onGetData() {
    // this.htppClientService.fetchRecipes().subscribe(recipes => {
    //   this.recipeService.setRecipes(recipes);
    // });
    // this.htppClientService.fetchIngredients().subscribe(ingredients => {
    //   this.shoppingListService.setIngredients(ingredients);
    // })
  }
}


