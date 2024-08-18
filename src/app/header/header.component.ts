import {Component} from "@angular/core";
import {AppHttpClientService} from "../app-http-client.service";
import {RecipeService} from "../recipes/recipe.service";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  constructor(private htppClientService:AppHttpClientService,private recipeService:RecipeService, private shoppingListService:ShoppingListService ) {}

  onPostData() {
    this.htppClientService.postRecipes(this.recipeService.getRecipes());
    this.htppClientService.postIngredientsAdded(this.shoppingListService.getIngredients());
  }

  onGetData() {
    this.htppClientService.fetchRecipes().subscribe(recipes => {
      this.recipeService.setRecipes(recipes);
    });
    this.htppClientService.fetchIngredients().subscribe(ingredients => {
      this.shoppingListService.setIngredients(ingredients);
    })
  }
}


