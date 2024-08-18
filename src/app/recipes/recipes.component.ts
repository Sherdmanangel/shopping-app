import {Component} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent{
  selectedRecipe: Recipe;

  constructor(private recipeService:RecipeService) {
    this.selectedRecipe = this.recipeService.selectedRecipe;
  }
}
