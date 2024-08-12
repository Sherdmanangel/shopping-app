import {Component} from '@angular/core';
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent{

  recipe: Recipe;

  constructor(protected recipeService: RecipeService,protected shoppingListService: ShoppingListService) {
    this.recipeService.seletionEmitter.subscribe((recipePassed: Recipe) => {
      this.recipe = recipePassed;
    })
  }
  onAddToShoppingList() {
    this.shoppingListService.onIngredientsAdded(this.recipe.ingredients)
  }
}
