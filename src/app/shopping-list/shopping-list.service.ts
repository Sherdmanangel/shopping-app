import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  ingredientAddedEmitter = new Subject<Ingredient[]>();
  ingredientEditEmitter = new Subject<number>();

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

    this.ingredientAddedEmitter.next(this.ingredients)
  }

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index:number){
    return this.ingredients[index];
  }
  updateingredient(index:number,name:string,amount:number){
    this.ingredients[index] = {
      name: name,
      amount: amount,
    }
  }

  onIngredientsDeleted(value:string) {
    let index = this.ingredients.findIndex((element: Ingredient) => element.name === value)

      this.ingredients.splice(index, 1)


    this.ingredientAddedEmitter.next(this.ingredients)
  }
}
