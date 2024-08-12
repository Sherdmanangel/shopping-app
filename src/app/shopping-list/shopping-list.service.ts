import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  ingredientAddedEmiiter = new EventEmitter<Ingredient[]>();


  onIngredientsAdded(ingredientsAdd: Ingredient[]) {

      ingredientsAdd.forEach(ingredientAdd => {

        if (this.ingredients.length > 0) {
          let ingredientFound: Ingredient = this.ingredients.find((element: Ingredient) => element.name === ingredientAdd.name)

          if (ingredientFound) {
            ingredientFound.amount += ingredientAdd.amount;

          } else {
            this.ingredients.push(ingredientAdd);
          }
        } else {
          this.ingredients.push(ingredientAdd);
        }
      })

    this.ingredientAddedEmiiter.emit(this.ingredients)
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  constructor() {
  }

  onIngredientsDeleted(value:string) {
    let index = this.ingredients.findIndex((element: Ingredient) => element.name === value)
    this.ingredients=this.ingredients.splice(index-1, 1)

    this.ingredientAddedEmiiter.emit(this.ingredients)
  }
}
