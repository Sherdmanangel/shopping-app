import {Component, Input} from '@angular/core';
import {Recipe} from "../../../shared/recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input('recipeEl')  recipe: Recipe;

  constructor() {
  }
}
