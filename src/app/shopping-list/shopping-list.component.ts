import { Component } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  ingredients :Ingredient[] = []

  constructor(protected shoppingListService: ShoppingListService) {
    this.ingredients = shoppingListService.getIngredients();

    shoppingListService.ingredientAddedEmiiter.subscribe(ingredientsRecieved => {
      this.ingredients = ingredientsRecieved;
    })
  }
}
