import {Component} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  providers: [RecipeService]
})
export class RecipesComponent{
  selectedRecipe: Recipe;

  constructor(private recipeService:RecipeService,private shoppingListService: ShoppingListService) {
    this.selectedRecipe = this.recipeService.selectedRecipe;
  }
}
